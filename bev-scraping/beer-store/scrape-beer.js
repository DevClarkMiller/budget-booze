require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const UserAgent = require('user-agents');
const sqlite3 = require('sqlite3').verbose();

// const url = 'https://qaht1ly72o-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.24.0)%3B%20Browser%3B%20instantsearch.js%20(4.73.1)%3B%20react%20(18.3.0-canary-60a927d04-20240113)%3B%20react-instantsearch%20(7.12.1)%3B%20react-instantsearch-core%20(7.12.1)%3B%20next.js%20(14.1.1)%3B%20JS%20Helper%20(3.22.2)';


class BeerScraper {
    constructor(){
        this.WAIT_COUNT_LIMIT = 2;
        this.CATEORY_NUMBER = 2;
        this.INITIAL_URL = 'https://www.thebeerstore.ca/beers';
        this.BASE_URL = 'https://www.thebeerstore.ca/beers?page=';
        this.TARGET_URL = 'https://qaht1ly72o-dsn.algolia.net/1/indexes/*/queries';
        this.DB_PATH = process.env.DB_PATH;
        this.beers = [];
        this.rawBeers = [];
        this.pageIndex = 1;
    }

    getPageURL(){
        let url = "";
        if(this.pageIndex === 1){
            url = this.INITIAL_URL;
        }else{
            url = this.BASE_URL + this.pageIndex;
        }

        this.pageIndex++;
        return url;
    }

    getBeers = async() =>{
        let scraper = this; //Gets a ref to this so that members can be accessed
        return new Promise(async (resolve, reject) =>{
            let waitCount = 0;
    
            const browser = await puppeteer.launch({
                headless: true,
                defaultViewport: false,
                //executablePath: process.env.CHROME_EXE,
                args: ["--no-sandbox", "--disable-setuid-sandbox", '--disable-notifications', '--disable-infobars', '--mute-audio']
            });
            
            const page = await browser.newPage();
        
            await page.setViewport({ width: 1280, height: 800 });
        
            //Gives the browser a random user agent
            const userAgent = new UserAgent({ deviceCategory: 'desktop' });
            const randomUserAgent = userAgent.toString();
        
            await page.setUserAgent(randomUserAgent);
        
            const currentUserAgent = await page.evaluate(() => navigator.userAgent);
            console.log('Current User-Agent:', currentUserAgent);
        
            await page.evaluateOnNewDocument(() => {
                navigator.geolocation.getCurrentPosition = (cb) => {
                setTimeout(() => {
                    cb({
                    'coords': {
                        accuracy: 21,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading: null,
                        latitude: 42.999075,
                        longitude: -81.236807,
                        speed: null
                    }
                    })
                }, 1000)
                }
            });
        
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
                        scraper.rawBeers.push(beers);
                        console.log(`RAW BEERS LENGTH: ${scraper.rawBeers.length}`);

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
                    console.log(`Browser Wait Count: ${waitCount}, over 2 browser will end...`);
                    waitCount++;
                    if (waitCount > scraper.WAIT_COUNT_LIMIT) {
                        console.log(`Wait count exceeded ${scraper.WAIT_COUNT_LIMIT}, closing browser...`);
                        await browser.close();
                        clearInterval(keepAlive);
                        resolve();
                    }
                }, 1500); // Logs every 1.5 seconds to keep the browser alive
        
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
    parseBeers(){
        let scraper = this; 
        return new Promise((resolve, reject) =>{
            const dateISO = new Date().toLocaleDateString('en-ca'); //Outputs it in locale time in format of yyyy-mm-dd
            for(const rawBeer of this.rawBeers){    //First loop
                for(const beer of rawBeer){ //Second loop for the actual beers

                    const beerVolumeSplit = beer.volume.split(' ');
                    let beerVolume = beerVolumeSplit[0];
                    const beerVolumeUnit = beerVolumeSplit[1];
                    if(beerVolumeUnit === 'L') beerVolume *= 1000;   //Convers to ML if the volumes in litres 

                    const beerLabel = beer.label.replaceAll(' ', '-');  //Formats the label apporpriately
                    const beerURL = `${scraper.INITIAL_URL}/${beer.pageSlug}_${beerLabel}`;

                    const beerObj = {
                        drink_name: beer.displayName,
                        total_volume: beerVolume,
                        alcohol_percent: beer.abv,
                        category_ID: this.CATEORY_NUMBER,
                        pieces_per: beer.size,
                        price: beer.salePrice,
                        image_url: beer.images[0],  //Gets the first img from the array of drink images
                        date_ISO: dateISO,
                        link: beerURL,
                        store: "TBS"
                    }

                    scraper.beers.push(beerObj);
                }
            }
            resolve();
        });
    }

    getNumBeers() {return this.beers.length}

    createDB(){
        let scraper = this;
        return new Promise((resolve, reject) =>{
            const db = new sqlite3.Database(scraper.DB_PATH, sqlite3.OPEN_READWRITE, (err) =>{
                if(err) return reject(err);
                resolve(db);
            });
        });
    }

    insertBeersInDB(){
        //1. Get ref to this to access members
        let scraper = this;

        //2. Create promise 
        return new Promise(async (resolve, reject) =>{
            try{
                //3. Open database connection with promise
                const db = await scraper.createDB();

                console.log('Now going to insert all beers into the database');

                //4. Open transaction
                db.serialize(() => {
                    db.run("BEGIN TRANSACTION");
        
                    //5. Insert each of the beers into the transaction
                    const sql = 'INSERT INTO Drinks (drink_name, total_volume, alcohol_percent, category_ID, pieces_per, price, image_url, date_ISO, link, store) VALUES (?,?,?,?,?,?,?,?,?,?)';
                    let insertionPromises = scraper.beers.map((beer) => {
                        return new Promise((resolve, reject) => {
                            const params = [beer.drink_name, beer.total_volume, beer.alcohol_percent, beer.category_ID, beer.pieces_per, beer.price, beer.image_url, beer.date_ISO, beer.link, beer.store];
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

                    //6. If all is well, commit transaction, if not then roll it back
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
};

const start = async () =>{
    //1. Create a BeerScraper object

    let scraper = new BeerScraper();

    //2. Command it to get you the beers 😈
    console.log('Step 2. Get the raw beer data');
    await scraper.getBeers();
    
    //3. Parse those beers
    console.log('Step 3. Parse the raw beer data');
    await scraper.parseBeers();

    //4. Push those beers to the database
    console.log('Step 4. Insert parsed beer data into the database');
    await scraper.insertBeersInDB();

    console.log(`ALL BEERS LENGTH: ${scraper.getNumBeers()}`);
}

start();
