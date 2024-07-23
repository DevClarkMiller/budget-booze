const sqlDB = require('./database');
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
    d.store
    FROM RankedDrinks d INNER JOIN 
	Drink_Categories dc ON d.category_ID = dc.category_ID
    WHERE rn = 1 
    AND total_volume > 0
	AND alcohol_percent > 0
	AND pieces_per > 0
	AND price > 0
    ${CATEGORY_CONDITION}
    ORDER BY drink_name;
    `;
}

const getAll = (req, res) =>{
    console.log('All request');
    sql = getSql();

    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
            console.log(`Bev count: ${rows.length}`);
            res.send(rows);
        } 
    });
}

const getSpirit = (req, res) =>{
    console.log('Spirit request');

    sql = getSql(1);

    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
            res.send(rows);
        } 
    });
}

const getBeerCider = (req, res) =>{
    console.log('BeerCider request');

    sql = getSql(2);

    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
            res.send(rows);
        } 
    });
}

const getWine = (req, res) =>{
    console.log('Wine request');
    sql = getSql(3);

    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
            res.send(rows);
        } 
    });
}

const getCooler = (req, res) =>{
    console.log('Cooler request');
    sql = getSql(5);

    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
            res.send(rows);
        } 
    });
}

module.exports = { getAll, getSpirit, getBeerCider, getWine, getCooler };    //Add controller references to this!