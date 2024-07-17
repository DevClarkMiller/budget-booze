require('dotenv').config();
const LcboScraper = require('./Scrapers/LcboScraper');
const BeerScraper = require('./Scrapers/BeerScraper');

const start = async () =>{
    //1. First get drinks from the beer store
    await new BeerScraper().start();

    //2. Then the lcbo and the script is complete!
    await new LcboScraper().start();
}

start();