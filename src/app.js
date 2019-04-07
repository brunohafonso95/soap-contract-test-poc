const express = require('express');
const app = express();
const countriesRoutes = require('./core/routes/countriesRoute');
const holidaysRoutes = require('./core/routes/holidaysRoute');

app.use(express.json());


// process.env.http_proxy = 'http://proxylatam.indra.es:8080';

// injetando as rotas
countriesRoutes(app);
holidaysRoutes(app);

module.exports = app;