const countriesController = require('../controllers/countriesController');

module.exports = (app) => {
    app.get('/getcountriesavailable', (req, res) => {
        countriesController.GetCountriesAvailable()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => res.status(400).json(error));
    });
}
