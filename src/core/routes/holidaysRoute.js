const holidaysController = require('../controllers/holidaysController');

module.exports = (app) => {
    app.get('/getholidaysavailable', (req, res) => {
        holidaysController.GetHolidaysAvailable()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => res.status(400).json(error));
    });

    app.get('/getholidaysformonth', (req, res) => {
        holidaysController.GetHolidaysForMonth()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => res.status(400).json(error));
    });

    app.get('/getholidaysforyear', (req, res) => {
        holidaysController.GetHolidaysForYear()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => res.status(400).json(error));
    });

    app.get('/getholidaysfordaterange', (req, res) => {
        holidaysController.GetHolidaysForDateRange()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => res.status(400).json(error));
    });

    app.get('/getholidaydate', (req, res) => {
        holidaysController.GetHolidayDate()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => res.status(400).json(error));
    });
}