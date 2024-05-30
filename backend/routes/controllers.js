const sqlDB = require('./database');
const db = new sqlDB().DB;
let sql;
//


const getAll = () =>{
    console.log('Test request');
    sql = "SELECT * FROM Drinks;"
    db.all(sql, [], (err, rows)=>{
        if(err){
            return console.error(err.message);
        }else{
            rows.forEach(row => {
                console.log(row);
            });
        }
            
    });
}


module.exports = { getAll };    //Add controller references to this!