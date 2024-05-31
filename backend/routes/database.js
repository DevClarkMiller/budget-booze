const sqlite3 = require('sqlite3').verbose();
const DB_PATH = "C:\\Users\\squas\\Desktop\\sqlite-tools-win-x64-3460000\\bevs.db"
let sql;

//connect to DB

class sqlDB{
    constructor(){
        this.DB = null;
    }

    createDB(){
        this.DB = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) =>{
            if(err) {
                return console.error(err);
            }else{
                console.log('Database opened up successfully!');
            }
        });

        return this.DB;
    }
}

module.exports = sqlDB;