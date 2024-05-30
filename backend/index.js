const express = require('express');
const app = express();
require('./routes/routes')(app);
const cors = require('cors');
const PORT = 3500;
const VERSION = '0.0.1 - ALPHA EDITION'

app.use(cors);

app.use(express.json());

app.listen(PORT, () =>{
    console.log('App is now listening on port 3500');
    console.log(`Version: ${VERSION}`);
});