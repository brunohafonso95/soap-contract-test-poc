const express = require('express');
const app = express();
const routes = require('./core/routes/index');

app.use(express.json());

// injetando as rotas
routes(app);

module.exports = app;