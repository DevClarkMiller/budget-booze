const express = require('express');
const { getAll } = require('./controllers');
const cors = require('cors')


module.exports = (app) =>{
    app.use(express.json());
    app.use(cors());

    app.get('/getAll', getAll);
}