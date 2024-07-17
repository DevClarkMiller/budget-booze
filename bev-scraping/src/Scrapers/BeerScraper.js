require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const Scraper = require('./Scraper');

module.exports = class BeerScraper extends Scraper {
    constructor(){
        super();
        this.WAIT_COUNT_LIMIT = 2;
        this.WAIT_TIMEOUT = 1500;
        this.CATEORY_NUMBER = 2;
        this.INITIAL_URL = 'https://www.thebeerstore.ca/beers';
        this.BASE_URL = 'https://www.thebeerstore.ca/beers?page=';
        this.TARGET_URL = 'https://qaht1ly72o-dsn.algolia.net/1/indexes/*/queries';
        this.STORE = "TBS";
        this.pageIndex = 1;
    }

    getPageURL(){
        let url = "";
        //First page has different url so check for that
        if(this.pageIndex === 1) url = this.INITIAL_URL;
        else url = this.BASE_URL + this.pageIndex;
        
        this.pageIndex++;
        return url;
    }

    getBevs = async() =>{
        return new Promise(async (resolve, reject) =>{
            let waitCount = 0;
    
            const browser = await puppeteer.launch({
                headless: process.env.HEADLESS === "true",
                defaultViewport: false,
                //executablePath: process.env.CHROME_EXE,
                args: ["--no-sandbox", "--disable-setuid-sandbox", '--disable-notifications', '--disable-infobars', '--mute-audio']
            });
            
            const page = await browser.newPage();
        
            await page.setViewport({ width: 1280, height: 800 });
        
            await page.setUserAgent(this.randomUserAgent);
        
            const currentUserAgent = await page.evaluate(() => navigator.userAgent);
            console.log('Current User-Agent:', currentUserAgent);
        
            await page.evaluateOnNewDocument((coords) => {
                navigator.geolocation.getCurrentPosition = (cb) => {
                setTimeout(() => { cb(coords) }, 1000)}
            }, this.COORDS);
        
            page.on('response', async (response) =>{
                const request = response.request();
                if(request.url().includes(this.TARGET_URL)){
                    console.log('Target found');

                    //Resets the wait count
                    waitCount = 0;
                    try{
                        const rawBeers = await response?.json();
                        const beers = rawBeers?.results[0]?.hits;
                        
                        if(beers.length === 0) throw new Error("No beers found on this page!"); //If the length is 0, that means all the beers in the beer store have been parsed!
                        this.rawBevs.push(beers);
                        console.log(`RAW BEERS LENGTH: ${this.rawBevs.length}`);
                        console.log(`NEW PAGE URL: ${this.getPageURL()}`);
                        await page.goto(this.getPageURL()); //Progresses to the next page
                    }catch(err){
                        console.error('Failed to parse json');
                    }
                }
            });
        
            await page.goto(this.getPageURL());
        
            await new Promise(resolve => {
                const keepAlive = setInterval(async () => {
                    // This keeps the promise unresolved, hence keeping the browser open
                    console.log(`Browser Wait Count: ${waitCount++}, over ${this.WAIT_COUNT_LIMIT} browser will end...`);
                    if (waitCount > this.WAIT_COUNT_LIMIT) {
                        console.log(`Wait count exceeded ${this.WAIT_COUNT_LIMIT}, closing browser...`);
                        await browser.close();
                        clearInterval(keepAlive);
                        resolve();
                    }
                }, this.WAIT_TIMEOUT); // Logs every 1.5 seconds to keep the browser alive
        
                // Handle manual closure
                browser.on('disconnected', () => {
                    clearInterval(keepAlive);
                    resolve();
                });
            });
        
            resolve();
        }
    )};

    //Splits the beers up from their seperate arrays into something more managable, then gets only the important information
    parseBevs(){
        return new Promise((resolve, reject) =>{
            for(const rawBeer of this.rawBevs){    //First loop
                for(const beer of rawBeer){ //Second loop for the actual beers

                    const beerVolumeSplit = beer.volume.split(' ');
                    let beerVolume = beerVolumeSplit[0];
                    const beerVolumeUnit = beerVolumeSplit[1];
                    if(beerVolumeUnit === 'L') beerVolume *= 1000;   //Convers to ML if the volumes in litres 

                    const beerLabel = beer.label.replaceAll(' ', '-');  //Formats the label apporpriately
                    const beerURL = `${this.INITIAL_URL}/${beer.pageSlug}_${beerLabel}`;

                    const beerObj = {
                        drink_name: beer.displayName,
                        total_volume: beerVolume,
                        alcohol_percent: beer.abv,
                        category_ID: this.CATEORY_NUMBER,
                        pieces_per: beer.size,
                        price: beer.salePrice,
                        image_url: beer.images[0],  //Gets the first img from the array of drink images
                        link: beerURL
                    };

                    this.bevs.push(beerObj);
                }
            }
            resolve();
        });
    }

    insertBevsInDB(){
        //1. Create promise 
        return new Promise(async (resolve, reject) =>{
            try{
                //2. Open database connection with promise
                const db = await this.createDB();

                console.log('Now going to insert all beers into the database');
                const dateISO = new Date().toLocaleDateString('en-ca'); //Outputs it in locale time in format of yyyy-mm-dd

                //3. Open transaction
                db.serialize(() => {
                    db.run("BEGIN TRANSACTION");
        
                    //4. Insert each of the beers into the transaction
                    const sql = 'INSERT INTO Drinks (drink_name, total_volume, alcohol_percent, category_ID, pieces_per, price, image_url, date_ISO, link, store) VALUES (?,?,?,?,?,?,?,?,?,?)';
                    let insertionPromises = this.bevs.map((bev) => {
                        return new Promise((resolve, reject) => {
                            const params = [bev.drink_name, bev.total_volume, bev.alcohol_percent, bev.category_ID, bev.pieces_per, bev.price, bev.image_url, dateISO, bev.link, this.STORE];
                            db.run(sql, params, (err) => {
                                if (err) {
                                    console.error(err.message);
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });

                    //5. If all is well, commit transaction, if not then roll it back
                    Promise.all(insertionPromises)
                        .then(() => {
                            db.run("COMMIT", (err) => {
                                if (err) {
                                    console.error('Commit failed:', err.message);
                                    return reject(err);
                                }
                                console.log('Inserted all bevs into the database');
        
                                db.close((err) => {
                                    if (err) {
                                        console.error('Error closing the database:', err.message);
                                        return reject(err);
                                    }
                                    console.log('Closed the database connection.');
                                    resolve(true);
                                });
                            });
                        })
                        .catch((err) => {
                            db.run("ROLLBACK");
                            reject(err);
                        });
                });
            }catch(err){
                console.error(err);
            }
        });
    }

    start(){
        return new Promise(async (resolve, reject) =>{
            //1. Command it to get you the beers 😈
            console.log('Step 1. Get the raw beer data');
            
            //Loops until the browser sucessfully returns all the beers
            do{ await this.getBevs(); }while(this.rawBevs.length === 0);
            
            //2. Parse those beers
            console.log('Step 2. Parse the raw beer data');
            await this.parseBevs();

            //3. Push those beers to the database
            console.log('Step 3. Insert parsed beer data into the database');
            //await this.insertBevsInDB();

            console.log(`BEER COUNT: ${this.getNumBevs()}`);
            resolve();
        });
    }
};