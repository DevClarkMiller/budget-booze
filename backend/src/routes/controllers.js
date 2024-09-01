const sqlDB = require('../database');
const db = new sqlDB().createDB();
let sql;

const getSql = (categoryID) =>{
    const CATEGORY_CONDITION = categoryID ? `AND d.category_ID = ${categoryID}` : "";

    return `
    WITH RankedDrinks AS (
        SELECT *,
        ROW_NUMBER() OVER (PARTITION BY link  ORDER BY id DESC) as rn
        FROM Drinks
        WHERE date_ISO = date('now', 'localtime')  
        AND total_volume > 0
        AND alcohol_percent > 0
        AND pieces_per > 0
        AND price > 0
    )

    SELECT
        d.id,
        d.drink_name,
        d.total_volume,
        d.alcohol_percent,
        d.price,
        dc.Category_Name,
        d.pieces_per,
        d.image_url,
        d.date_ISO,
        d.link,
        d.store,
        d.origin_country,
		d.container,
		d.description
        FROM RankedDrinks d INNER JOIN 
        Drink_Categories dc ON d.category_ID = dc.category_ID
        WHERE d.rn = 1 
        ${CATEGORY_CONDITION}
        ORDER BY d.drink_name;
    `;
}

const findMaxStats = (categoryID) =>{
    return new Promise((resolve, reject) =>{
        const CATEGORY_CONDITION = categoryID ? `AND d.category_ID = ${categoryID}` : "";

        let sql = 
        `
        WITH RankedDrinks AS (
            SELECT *,
            ROW_NUMBER() OVER (PARTITION BY link  ORDER BY id DESC) as rn
            FROM Drinks
            WHERE date_ISO = date('now', 'localtime')  
            AND total_volume > 0
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
            console.log(row);
            resolve(row);
        });
    });
}

const getAll = (req, res) =>{
    console.log('All request');
    sql = getSql();

    db.all(sql, [], async (err, rows)=>{
        if(err){
            console.error(err.message);
            return res.status(500).send("Couldn't get everything");
        }else{
            console.log(`Bev count: ${rows.length}`);
            const maxStats = await findMaxStats();
            res.send({maxStats: maxStats, drinks: rows});
        } 
    });
}

const getSpirit = (req, res) =>{
    console.log('Spirit request');
    const categoryID = 1;

    sql = getSql(categoryID);

    db.all(sql, [], async (err, rows)=>{
        if(err){
            console.error(err.message);
            return res.status(500).send("Couldn't get spirits");
        }else{
            const maxStats = await findMaxStats(categoryID);
            res.send({maxStats: maxStats, drinks: rows});
        } 
    });
}

const getBeerCider = (req, res) =>{
    console.log('BeerCider request');
    const categoryID = 2;
    
    sql = getSql(categoryID);

    db.all(sql, [], async (err, rows)=>{
        if(err){
            console.error(err.message);
            return res.status(500).send("Couldn't get beer/cider");
        }else{
            const maxStats = await findMaxStats(categoryID);
            res.send({maxStats: maxStats, drinks: rows});
        } 
    });
}

const getWine = (req, res) =>{
    console.log('Wine request');
    const categoryID = 3;

    sql = getSql(categoryID);

    db.all(sql, [], async (err, rows)=>{
        if(err){
            console.error(err.message);
            return res.status(500).send("Couldn't get wine");
        }else{
            const maxStats = await findMaxStats(categoryID);
            res.send({maxStats: maxStats, drinks: rows});
        } 
    });
}

const getCooler = async (req, res) =>{
    console.log('Cooler request');
    const categoryID = 5;

    sql = getSql(categoryID);

    db.all(sql, [], async (err, rows)=>{
        if(err){
            console.error(err.message);
            return res.status(500).send("Couldn't get coolers");
        }else{
            const maxStats = await findMaxStats(categoryID);
            res.send({maxStats: maxStats, drinks: rows});
        } 
    });
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