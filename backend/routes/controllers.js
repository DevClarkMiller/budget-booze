const sqlDB = require('./database');
const db = new sqlDB().createDB();
let sql;
//

const calcStandard = (drink) =>{
    return (((drink.total_volume * drink.pieces_per) * drink.alcohol_percent) / 17.05) / 100
}

const calcStandardPrice = (drink) =>{
    calcStandard(drink)
} 


const getAll = (req, res) =>{
    let drinks;

    console.log('Test request');
    sql = `SELECT 
    d.id,
    d.drink_name,
    d.total_volume,
    d.alcohol_percent,
    d.price,
    dc.Category_Name,
    d.pieces_per
    FROM Drinks d
    INNER JOIN Drink_Categories dc ON d.category_ID = dc.category_ID
    WHERE d.pieces_per > 0
    ORDER BY d.price/d.pieces_per ASC;`
    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
            res.send(rows);
        } 
    });
}

module.exports = { getAll };    //Add controller references to this!