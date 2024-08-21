require('dotenv').config();
const UserAgent = require('user-agents');
const sqlite3 = require('sqlite3').verbose();

module.exports = class Scraper{
    constructor(){
        this.WAIT_COUNT_LIMIT = 5;
        this.WAIT_TIMEOUT = 10000;
        this.DB_PATH = process.env.DB_PATH;
        this.STORE = "GENERIC";
        this.bevs = [];
        this.rawBevs = [];

        //Gives the browser a random user agent
        const userAgent = new UserAgent({ deviceCategory: 'desktop' });
        this.randomUserAgent = userAgent.toString();

        this.COORDS = {
            coords: {
                accuracy: 21,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                latitude: 42.999075,
                longitude: -81.236807,
                speed: null
            },
            timestamp: Date.now() // Simulated timestamp
        }
    }

    getNumBevs() { return this.bevs.length; }

    createDB(){
        let scraper = this;
        return new Promise((resolve, reject) =>{
            const db = new sqlite3.Database(scraper.DB_PATH, sqlite3.OPEN_READWRITE, (err) =>{
                if(err) return reject(err);
                resolve(db);
            });
        });
    }

    getBevs = async() => {}

    parseBevs() {}

    insertBevsInDB() {
        //1. Create promise 
        return new Promise(async (resolve, reject) =>{
            try{
                //2. Open database connection with promise
                const db = await this.createDB();

                console.log('Now going to insert all beverages into the database');
                const dateISO = new Date().toLocaleDateString('en-ca'); //Outputs it in locale time in format of yyyy-mm-dd

                //3. Open transaction
                db.serialize(() => {
                    db.run("BEGIN TRANSACTION");
        
                    //4. Insert each of the beers into the transaction
                    const sql = 
                    `INSERT INTO 
                    Drinks (drink_name, total_volume, alcohol_percent, category_ID, pieces_per, price, image_url, date_ISO, link, store, origin_country, container, description) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                    let insertionPromises = this.bevs.map((bev) => {
                        return new Promise((resolve, reject) => {
                            const params = [bev.drink_name, bev.total_volume, bev.alcohol_percent, bev.category_ID, bev.pieces_per, 
                                bev.price, bev.image_url, dateISO, bev.link, this.STORE, bev.origin_country, bev.container, bev.description];
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

    start() {}
}