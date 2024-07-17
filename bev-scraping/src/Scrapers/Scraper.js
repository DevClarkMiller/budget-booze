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

    insertBevsInDB() {}

    start() {}
}