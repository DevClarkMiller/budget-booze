require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const Scraper = require('./Scraper');   //Super class for the LcboScraper

module.exports = class LcboScraper extends Scraper{
    constructor(){
        super();
        this.URL = 'https://www.lcbo.com/en/products#t=clp-products&sort=relevancy&layout=card';
        this.TARGET_URL = 'https://platform.cloud.coveo.com/rest/search/v2?organization';
        this.STORE = "LCBO";

        //Enums
        this.categoriesStringENUM = Object.freeze({
            Spirit: "Spirits",
            BeerCider: "Beer & Cider",
            Wine: "Wine",
            Sake: "Sake",
            Cooler: "Coolers"
        });
        
        this.categoriesENUM = Object.freeze({
            Spirit: 1,
            BeerCider: 2,
            Wine: 3,
            Sake: 4,
            Cooler: 5
        });
    }

    getBevs = async() => {
        return new Promise(async (resolve, reject) =>{
            let waitCount = 0;        
            let requestCount = 0;

            const browser = await puppeteer.launch({
                headless: process.env.HEADLESS === "true",
                defaultViewport: false,
                executablePath: (process.env.CHROME_EXE ? process.env.CHROME_EXE: ""),
                args: ["--no-sandbox", "--disable-setuid-sandbox", '--disable-notifications', '--disable-infobars', '--mute-audio', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
                // permissions: ['geolocation'] // Disable geolocation permission dialog
            });
            
            const page = await browser.newPage();

            page.on('dialog', async dialog => {
                //get alert message
                console.log(dialog.message());
                //accept alert
                await dialog.accept();
            });

            await page.evaluateOnNewDocument((coords) => {
                navigator.geolocation.getCurrentPosition = (cb) => {
                setTimeout(() => { cb(coords) }, 1000)}
            }, this.COORDS);
        
            await page.setViewport({ width: 1280, height: 800 });
        
            await page.setUserAgent(this.randomUserAgent);
        
            const currentUserAgent = await page.evaluate(() => navigator.userAgent);
            console.log('Current User-Agent:', currentUserAgent);
        
            page.on('response', async (response) =>{
                const request = response.request();
                requestCount++;
                if(request.url().includes(this.TARGET_URL)){
                    console.log(`Target found - ${request.url()}`);
        
                    //Resets the wait count
                    waitCount = 0;
                    try{
                        const rawDrinks = await response.json();    //Very unformatted data
                        this.rawBevs.push(rawDrinks.results);
                        setTimeout(async () =>{
                            const result = await page.evaluate(async () => {
                                //Checks if there are still any pages left to load in
                                const btn = await document.getElementById('loadMore');
                                if(window.getComputedStyle(btn).display == 'none'){
                                    return true;
                                }
                                loadMore();
                                console.log('Found the load more button!');
                                return false;
                            });
        
                            if(result){
                                console.log('NOW GOING TO CLOSE BROWSER! FOUND ALL THE DATA!!!');
                                await browser.close();
                                return;
                            }
                        }, 150);
                        //Whenever it finds a good request, it hits uses the loadMore function to load more pages
                    }catch(error){
                        console.error('Failed to parse json');
                    }   
                }
            });
        
            await page.goto(this.URL);
            //await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        
            await new Promise(resolve => {
                const keepAlive = setInterval(async () => {
                    // This keeps the promise unresolved, hence keeping the browser open
                    console.log(`Browser Wait Count: ${waitCount++}, over ${this.WAIT_COUNT_LIMIT} browser will end...`);
                    if (waitCount > this.WAIT_COUNT_LIMIT) {
                        console.log(`Wait count exceeded ${this.WAIT_COUNT_LIMIT}, closing browser...`);
                        this.rawBevs = [];   //Resets the rawBevs if the browser failed/exceeded wait count
                        await browser.close();
                        clearInterval(keepAlive);
                        resolve();
                    }
                }, this.WAIT_TIMEOUT); // Logs every 10 seconds to keep the process alive
        
                // Handle manual closure
                browser.on('disconnected', () => {
                    clearInterval(keepAlive);
                    resolve();
                });
            });
            resolve();
        });
    }

    getCategory = (categories) =>{
        const categoryArr = categories[categories.length - 1];  //Gets the last index of the categories array
        const category = categoryArr.split("|")[1];
    
        //Returns the category id for the 
    
        let categoryID;
        switch(category){
            case this.categoriesStringENUM.Spirit: categoryID = this.categoriesENUM.Spirit; break;
            case this.categoriesStringENUM.BeerCider: categoryID = this.categoriesENUM.BeerCider; break;
            case this.categoriesStringENUM.Wine: categoryID = this.categoriesENUM.Wine; break;
            case this.categoriesStringENUM.Sake: categoryID = this.categoriesENUM.Sake; break;
            case this.categoriesStringENUM.Cooler: categoryID = this.categoriesENUM.Cooler; break;
            default: categoryID = 0; break; //Returns 0 if there wasn't a valid drink detected
        }
        return categoryID;
    }

    getBevVolume(bev){
        const parseVolume = (volume) => {
            const volumeSplit = volume.split("x");
            return parseFloat(volumeSplit[volumeSplit.length - 1].trim());
        };

        if (bev.raw.lcbo_unit_volume) {
            return parseVolume(bev.raw.lcbo_unit_volume);
        } else if (bev.raw.lcbo_total_volume) {
            return parseFloat(bev.raw.lcbo_total_volume);
        }
        return 0;   //Basecase if something went really wrong
    }

    parseBevs(){
        return new Promise((resolve, reject) =>{
            for(const bevs of this.rawBevs){
                for(const bev of bevs){
                    try{
                        const bevObj = {
                            drink_name: bev.Title,
                            total_volume: this.getBevVolume(bev),
                            alcohol_percent: parseFloat(bev.raw.lcbo_alcohol_percent),
                            category_ID: this.getCategory(bev.raw.ec_category),
                            pieces_per: parseInt(bev.raw.lcbo_bottles_per_pack),
                            price: parseFloat(bev.raw.ec_price),
                            image_url: bev.raw.ec_thumbnails,
                            link: bev.uri
                        }
                        if(bevObj.volume <= 0 || bevObj.percent <= 0 || bevObj.category <= 0) continue;   //Continues if it's not a drink
                        this.bevs.push(bevObj);
                    }catch(error){
                        console.error(error);
                    }
                }     
            }
            resolve();
        });
    }

    insertBevsInDB = () => {
        //1. Create promise 
        return new Promise(async (resolve, reject) => {
            try{
                //2. Open database connection with promise
                const db = await this.createDB();
                
                console.log('Now going to insert all drinks into the database');
                const dateISO = new Date().toLocaleDateString('en-ca'); //Outputs it in locale time in format of yyyy-mm-dd

                //3. Open transaction
                db.serialize(() => {
                    db.run("BEGIN TRANSACTION");
        
                    //4. Insert each of the bevs into the transaction
                    const sql = 'INSERT INTO Drinks (drink_name, total_volume, alcohol_percent, category_ID, pieces_per, price, image_url, date_ISO, link, store) VALUES (?,?,?,?,?,?,?,?,?,?)';
                    let insertionPromises = this.bevs.map((bev) => {
                        return new Promise((resolve, reject) => {
                            db.run(sql, [bev.drink_name, bev.total_volume, bev.alcohol_percent, bev.category_ID, bev.pieces_per, bev.price, bev.image_url, dateISO, bev.link, this.STORE], (err) => {
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
    };

    start(){
        return new Promise(async (resolve, reject) =>{
            //1. Command it to get you the beers 😈
            console.log('Step 1. Get the raw drink data');

                //Loops until the browser sucessfully returns all the bevs
            do{ await this.getBevs(); } while(this.rawBevs.length === 0);

            await this.parseBevs();

            await this.insertBevsInDB();

            console.log(`DRINK COUNT: ${this.getNumBevs()}`);
            resolve();
        });
    }
}