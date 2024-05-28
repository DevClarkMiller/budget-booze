const parse = require('node-html-parser');
const axios = require('axios');
const puppeteer = require('puppeteer');

const monitorNetwork = async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    // Listen for all network requests
    page.on('request', request => {
        console.log('Request URL:', request.url());
        console.log('Request method:', request.method());
        console.log('Request headers:', request.headers());
        request.continue();
    });

    await page.goto('https://www.lcbo.com/en/products#t=clp-products&sort=relevancy&layout=card');
    await browser.close();
}

const getProductsJSON = async () =>{
    const response = await axios.get('https://www.lcbo.com/en/products#t=clp-products&sort=relevancy&layout=card');
    console.log(response.data);
}


monitorNetwork();
//getProductsJSON();