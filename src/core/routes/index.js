const countriesRoutes = require('./core/routes/countriesRoute');
const holidaysRoutes = require('./core/routes/holidaysRoute');

module.exports = function(app) {
    countriesRoutes(app);
    holidaysRoutes(app);
}