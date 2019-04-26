const soap = require('soap');
const { SOAP_API_URL } = require('../../config/config');

const countriesController = {};

countriesController.GetCountriesAvailable = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await soap.createClientAsync(SOAP_API_URL);
            const result = await client.GetCountriesAvailableAsync();
            resolve(result[0]);
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = countriesController;