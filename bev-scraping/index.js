const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const UserAgent = require('user-agents');

const url = 'https://www.lcbo.com/en/products#t=clp-products&sort=relevancy&layout=card';
let requestCount = 0;

const categoriesStringENUM = {
    Spirit: "Spirits",
    BeerCider: "Beer & Cider",
    Wine: "Wine",
    Sake: "Sake",
    Cooler: "Coolers"
}

const categoriesENUM = {
    Spirit: 1,
    BeerCider: 2,
    Wine: 3,
    Sake: 4,
    Cooler: 5
}

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = "/var/bev-scraping/bevs.db"
let sql;

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) =>{
    if(err) {
        return console.error(err);
    }else{
        console.log('Database opened up successfully!');
    }
});


const getBevs = async() => {
    let allBevs = [];
    let waitCount = 0;

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: false,
        executablePath: '/usr/bin/google-chrome-stable',
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

    // page.on('requestfailed', request => {
    //     console.error('Request failed:', request.url(), request.failure().errorText);
    // });

    page.on('response', async (response) =>{
        const request = response.request();
        requestCount++;
        if(request.url().includes('https://platform.cloud.coveo.com/rest/search/v2?organization')){
            console.log('Target found');
            console.log(request.url());

            //Resets the wait count
            waitCount = 0;
            try{
                const drinks = await response.json();
                const bevs = drinks.results;
                allBevs.push(bevs);
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
            
        }else{
            // console.log(`Request count: ${requestCount}`);
        }
    });

    await page.goto(url);

    await new Promise(resolve => {
        const keepAlive = setInterval(async () => {
            // This keeps the promise unresolved, hence keeping the browser open
            console.log('Keeping browser open...');
            waitCount++;
            if (waitCount > 5) {
                console.log('Wait count exceeded 5, closing browser...');
                allBevs = [];
                await browser.close();
                clearInterval(keepAlive);
                resolve();
            }
        }, 10000); // Logs every 10 seconds to keep the process alive

        // Handle manual closure
        browser.on('disconnected', () => {
            clearInterval(keepAlive);
            resolve();
        });
    });

    return allBevs;
}

const insertBevsToDB = (bevs) => {
    return new Promise((resolve, reject) => {
        console.log('Now going to insert all drinks into the database');
        const dateISO = new Date().toISOString();

        db.serialize(() => {
            db.run("BEGIN TRANSACTION");

            const sql = 'INSERT INTO Drinks (drink_name, total_volume, alcohol_percent, category_ID, pieces_per, price, image_url, date_ISO, link) VALUES (?,?,?,?,?,?,?,?,?)';
            let insertionPromises = bevs.map((bev) => {
                return new Promise((resolve, reject) => {
                    db.run(sql, [bev.title, bev.volume, bev.percent, bev.category, bev.piecesPer, bev.price, bev.thumbnail, dateISO, bev.link], (err) => {
                        if (err) {
                            console.error(err.message);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

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
    });
};

const getCategory = (categories) =>{
    let length = categories.length;
    const categoryArr = categories[length - 1];  //Gets the last index of the categories array
    const typesArr = categoryArr.split("|");
    const category = typesArr[1];

    //Returns the category id for the 

    let categoryID;
    switch(category){
        case categoriesStringENUM.Spirit: categoryID = categoriesENUM.Spirit; break;
        case categoriesStringENUM.BeerCider: categoryID = categoriesENUM.BeerCider; break;
        case categoriesStringENUM.Wine: categoryID = categoriesENUM.Wine; break;
        case categoriesStringENUM.Sake: categoryID = categoriesENUM.Sake; break;
        case categoriesStringENUM.Cooler: categoryID = categoriesENUM.Cooler; break;
        default: categoryID = 0; break; //Returns 0 if there wasn't a valid drink detected
    }
    return categoryID;
}

const start = async () =>{
    let allBevs = [];
    let bevsArr = [];

    //Loops until the browser sucessfully returns all the bevs
    do{
        bevsArr = await getBevs();
       
    } while(bevsArr.length === 0);
    
    bevsArr.forEach((bevs) =>{
        bevs.forEach((bev)=>{
            try{
                let bevVolume = 0;
                if(bev.raw.lcbo_unit_volume && bev.raw.lcbo_total_volume){
                    const volumeSplit = bev.raw.lcbo_unit_volume.split("x");
                    if(volumeSplit.length > 1){
                        bevVolume = parseFloat(volumeSplit[1].trim());
                    }else{
                        bevVolume = parseFloat(volumeSplit[0]);
                    }
                }else if(bev.raw.lcbo_unit_volume){
                    const volumeSplit = bev.raw.lcbo_unit_volume.split("x");
                    if(volumeSplit.length > 1){
                        bevVolume = parseFloat(volumeSplit[1].trim());
                    }else{
                        bevVolume = parseFloat(volumeSplit[0]);
                    }
                }else{
                    bevVolume = parseFloat(bev.raw.lcbo_total_volume);
                }

                const bevObj = {
                    title: bev.Title,
                    url: bev.uri,
                    volume: bevVolume,
                    percent: parseFloat(bev.raw.lcbo_alcohol_percent),
                    price: parseFloat(bev.raw.ec_price),
                    category: getCategory(bev.raw.ec_category),
                    thumbnail: bev.raw.ec_thumbnails,
                    piecesPer: parseInt(bev.raw.lcbo_bottles_per_pack),
                    link: bev.uri
                }
                if (bevObj.volume > 0 && bevObj.percent > 0 && bevObj.category > 0){
                    allBevs.push(bevObj);
                }
            }catch(error){
                console.error(error);
            }
        });
    });

    console.log(`Drink count: ${allBevs.length}`);

    await insertBevsToDB(allBevs);

    //Closes db connection

    console.log('Now going to close db!')
    db.close((err) => {
        if (err) { 
            console.error(err.message); 
        }
        console.log('Closed the database connection.');
    });
}

start();