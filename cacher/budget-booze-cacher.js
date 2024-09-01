const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

class BudgetBoozeCache {
    constructor(){
        this.URL = 'https://budgetbooze.ca/drinks/0'
    }

    cacheBooze = async() =>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: false,
            devtools: true,
            // executablePath: (process.env.CHROME_EXE ? process.env.CHROME_EXE: ""),
            args: ["--no-sandbox", "--disable-setuid-sandbox", '--disable-notifications', '--disable-infobars', '--mute-audio', '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        setTimeout(async() =>{
            const exitMessage = await page.evaluate(() => {
                console.log('Starting evaluation');
        
                const rawExpandCatBtn = document.querySelectorAll('p');
        
                const expandCategoriesBtn = Array.from(rawExpandCatBtn).find(el => el.textContent === 'Categories');
        
                if (!expandCategoriesBtn) return "No expandCategoriesBtn found";
        
                expandCategoriesBtn.click();
        
                return new Promise((resolve) => {
                    setTimeout(() => {
                        // Gets the list of categories
                        const categoriesList = document.querySelector('ul.flex.flex-col.gap-1');
        
                        if (!categoriesList) {
                            resolve("No categories list found");
                            return;
                        }
        
                        // Gets each category
                        const categories = categoriesList.querySelectorAll('li');
        
                        if (!categories || categories.length === 0) {
                            resolve("No categories found");
                            return;
                        }
        
                        // Clicks each category
                        categories.forEach((category) => {
                            category.click();
                        });
        
                        resolve("All operations successful");
                    }, 250);
                });
            });
            console.log(`Exit message: ${exitMessage}`);
        }, 1000);


        await page.goto(this.URL, {waitUntil: 'networkidle0'});

        // await browser.close();
    }
}

let budgetBoozeCache = new BudgetBoozeCache();
budgetBoozeCache.cacheBooze();