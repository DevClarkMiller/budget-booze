const sqlDB = require('./database');
const db = new sqlDB().createDB();
let sql;

const getSql = (categoryID) =>{
    return (categoryID) ? 
    `
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
        d.link
        FROM Drinks d
        INNER JOIN Drink_Categories dc ON d.category_ID = dc.category_ID
        WHERE d.pieces_per > 0 AND dc.category_ID = ${categoryID} AND substr(d.date_ISO, 1, 10) = date('now')
        ORDER BY d.price/d.pieces_per ASC;
    ` :
    `
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
        d.link
        FROM Drinks d
        INNER JOIN Drink_Categories dc ON d.category_ID = dc.category_ID
        WHERE d.pieces_per > 0 AND substr(d.date_ISO, 1, 10) = date('now')
        ORDER BY d.price/d.pieces_per ASC;`
}


const getAll = (req, res) =>{
    console.log('All request');
    sql = getSql();

    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
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