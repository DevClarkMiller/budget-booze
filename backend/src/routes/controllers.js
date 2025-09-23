const sqlDB = require('../database');
const db = new sqlDB().createDB();

const findDrinks = (categoryID, fromToday = false) =>{
    return new Promise((resolve, reject) =>{
        const CATEGORY_CONDITION = categoryID ? `AND d.category_ID = ${categoryID}` : "";
        const sql = 
        `
        WITH LatestDrinks AS (
            SELECT link, MAX(id) as max_id
            FROM Drinks
            WHERE total_volume > 0
            AND alcohol_percent > 0
            AND pieces_per > 0
            AND price > 0
            ${fromToday ? "AND date_ISO = date('now', 'localtime')  " : ""}
            GROUP BY link
        )
        SELECT d.id, d.drink_name, d.total_volume, d.alcohol_percent, d.price,
            dc.Category_Name, d.pieces_per, d.image_url, d.date_ISO,
            d.link, d.store, d.origin_country, d.container, d.description
        FROM Drinks d
        INNER JOIN LatestDrinks ld ON d.link = ld.link AND d.id = ld.max_id
        INNER JOIN Drink_Categories dc ON d.category_ID = dc.category_ID
        ${CATEGORY_CONDITION ? `WHERE ${CATEGORY_CONDITION}` : ""}
        ORDER BY d.drink_name;
        `

        db.all(sql, [], (err, row)=>{
            if(err) resolve(err);
            resolve(row);
        });
    });
}

const findMaxStats = (categoryID, fromToday = false) =>{
    return new Promise((resolve, reject) =>{
        const CATEGORY_CONDITION = categoryID ? `AND d.category_ID = ${categoryID}` : "";

        const sql = 
        `
        WITH RankedDrinks AS (
            SELECT *,
            ROW_NUMBER() OVER (PARTITION BY link  ORDER BY id DESC) as rn
            FROM Drinks
            WHERE total_volume > 0
            ${fromToday ? "AND date_ISO = date('now', 'localtime')  " : ""}
            AND alcohol_percent > 0
            AND pieces_per > 0
            AND price > 0
        )

        SELECT
            MAX(d.alcohol_percent) AS "max_BAV",
            MAX(d.total_volume) AS "max_ML",
            MAX(d.pieces_per) AS "max_QTY"
            FROM RankedDrinks d INNER JOIN 
            Drink_Categories dc ON d.category_ID = dc.category_ID
            WHERE d.rn = 1 
            ${CATEGORY_CONDITION}
            ORDER BY d.drink_name;
        `

        db.get(sql, [], (err, row)=>{
            if(err) resolve(err);
            resolve(row);
        });
    });
}

const get = async (categoryID) =>{
    let maxStats = await findMaxStats(categoryID, true);
    let fromToday = true;
    if (maxStats.max_ML == null){ // Means there's no drinks today
        maxStats = await findMaxStats(categoryID); //  Must refetch but not for today
        fromToday = false;
    }

    const drinks = await findDrinks(categoryID, fromToday);
    return {maxStats: maxStats, drinks: drinks}
}

const getAll = async (req, res) =>{
    console.log('All request');

    try{
        const data = await get();
        res.send(data);
    }catch(err){
        res.status(500).send("Couldn't get everything");
    }
}

const getSpirit = async (req, res) =>{
    console.log('Spirit request');
    const categoryID = 1;

    try{
        const data = await get(categoryID);
        res.send(data);
    }catch(err){
        res.status(500).send("Couldn't get spirits");
    }
}

const getBeerCider = async (req, res) =>{
    console.log('BeerCider request');
    const categoryID = 2;
    
    try{
        const data = await get(categoryID);
        res.send(data);
    }catch(err){
        res.status(500).send("Couldn't get beer/cider");
    }
}

const getWine = async (req, res) =>{
    console.log('Wine request');
    const categoryID = 3;

    try{
        const data = await get(categoryID);
        res.send(data);
    }catch(err){
        res.status(500).send("Couldn't get wine");
    }
}

const getCooler = async (req, res) =>{
    console.log('Cooler request');
    const categoryID = 5;

    try{
        const data = await get(categoryID);
        res.send(data);
    }catch(err){
        res.status(500).send("Couldn't get coolers");
    }
}

const incrementQrCount = (req, res) =>{
    const fs = require('fs');
    const path = '/srv/budget-booze/src/qr-count.txt';

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    try{
        const text = fs.readFileSync(path, 'utf-8');
        let qrCount = parseInt(text);
        qrCount++;

        console.log(`QR ACCESS COUNT: ${qrCount}`);
        fs.writeFileSync(path, qrCount.toString());
        res.status(200).send(`QR ACCESS COUNT: ${qrCount}`);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
} 

module.exports = { getAll, getSpirit, getBeerCider, getWine, getCooler, incrementQrCount };