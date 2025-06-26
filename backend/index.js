require('dotenv').config();
const express = require('express');
const app = express();
require('./src/routes/routes')(app);
const cors = require('cors');
const PORT = 5000;
const VERSION = '0.0.1 - ALPHA EDITION'

app.use(cors());

app.use(express.json());

app.listen(PORT, () =>{
    console.log('App is now listening on port 5000');
    console.log(`Version: ${VERSION}`);
});