require('dotenv').config();
const LcboScraper = require('./Scrapers/LcboScraper');
const BeerScraper = require('./Scrapers/BeerScraper');

const start = async () =>{
    const devmode = process.argv.includes('--devmode');
    const providedRawData = process.argv.includes('--provided');
    const providedParsedData = process.argv.includes('--providedParsed');

    //1. First get drinks from the beer store
    await new BeerScraper().start(devmode, providedRawData, providedParsedData);

    //2. Then the lcbo and the script is complete!
    await new LcboScraper().start(devmode, providedRawData, providedParsedData);
}

start();