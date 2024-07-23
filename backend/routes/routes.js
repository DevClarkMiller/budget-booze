const express = require('express');
const { getAll, getSpirit, getBeerCider, getWine, getCooler, getMaxStats } = require('./controllers');
const cors = require('cors')


module.exports = (app) =>{
    app.use(express.json());
    
    app.use(cors());

    app.get('/get/all', getAll);

    app.get('/get/spirit', getSpirit);

    app.get('/get/beerCider', getBeerCider);

    app.get('/get/wine', getWine);

    app.get('/get/cooler', getCooler);
}    