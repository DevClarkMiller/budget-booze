const parse = require('node-html-parser');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const process = require('process');
const url = 'https://www.lcbo.com/en/products#t=clp-products&sort=relevancy&layout=card';
const fs = require('fs');
let requestCount = 0;
let stringBuffer = '';
let inputSwitch;
let outputSwitch;

console.log(process.argv);
if(process.argv.includes('--output')){
    outputSwitch = true;
    inputSwitch = false;
}

if(process.argv.includes('--input')){
    inputSwitch = true;
    outputSwitch = false;
}

const getBevs = async() => {
    let allBevs = [];

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    });

    const page = await browser.newPage();

    page.on('response', async (response) =>{
        const request = response.request();
        requestCount++;
        
        
        if(request.url().includes('https://platform.cloud.coveo.com/rest/search/v2?organization')){
            console.log('Target found');
            console.log(request.url());
            try{
                const drinks = await response.json();
                const bevs = drinks.results;
                allBevs.push(bevs);
                
                //Whenever it finds a good request, it hits uses the loadMore function to load more pages
                const result = await page.evaluate(async () => {
                    //Checks if there are still any pages left to load in
                    if(document.getElementById('loadMore')){
                        loadMore();
                    }else{  //Stops if there are none left
                        await browser.close();
                    }
                    
                });
            }catch(error){
                console.error('Failed to parse json');
            }
            
        }else{
            //console.log(`Request count: ${requestCount}`);
        }
    });

    await page.goto(url);

    await new Promise(resolve => {
        const keepAlive = setInterval(() => {
            // This keeps the promise unresolved, hence keeping the browser open
            console.log('Keeping browser open...');
        }, 10000); // Logs every 10 seconds to keep the process alive

        // Handle manual closure
        browser.on('disconnected', () => {
            clearInterval(keepAlive);
            resolve();
        });
    });

    // Returning bevs after browser is closed manually
    return allBevs;
}

const start = async () =>{
    if(inputSwitch){
        let allBevs = [];
        const bevsArr = await getBevs();
        
        bevsArr.forEach((bevs) =>{
            bevs.forEach((bev)=>{
                try{
                    const bevObj = {
                        title: bev.Title,
                        url: bev.uri,
                        volume: bev.raw.lcbo_unit_volume || bev.raw.lcbo_total_volume,
                        percent: bev.raw.lcbo_alcohol_percent,
                        price: bev.raw.ec_price,
                        thumbnail: bev.raw.ec_thumbnails
                    }
                    if (bevObj.volume > 0 && bevObj.percent > 0){
                        allBevs.push(bevObj);
                    }
                }catch(error){
                    console.error(error);
                }
                
            });
        });
    
        console.log(`Drink count: ${allBevs.length}`);

        //Sort the bevs by price descending
        allBevs.sort((bevA, bevB) =>{
            return parseFloat(bevA.price) - parseFloat(bevB.price);
        });

        fs.writeFile('bevs.json', JSON.stringify(allBevs), err => {
            if (err) {
                console.error(err);
            } else {
                console.log('File finished!');
            }
        });
    }else if (outputSwitch){
        let allBevs;
        try{
            allBevs = JSON.parse(fs.readFileSync('bevs.json', 'utf8'));
        }catch(error){
            console.log(error);
        }
    }
}

start();


//getProductsJSON();