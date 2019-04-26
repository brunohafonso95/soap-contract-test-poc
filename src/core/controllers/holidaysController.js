const soap = require('soap');
const { SOAP_API_URL } = require('../../config/config');
const { 
    GetHolidaysAvailable, 
    GetHolidaysForMonth,
    GetHolidaysForYear,
    GetHolidaysForDateRange,
    GetHolidayDate
} = require('../../tests/contract/data/massaDeDados');

const holidaysController = {};

holidaysController.GetHolidaysAvailable = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await soap.createClientAsync(SOAP_API_URL, soap_client_options);
            const result = await client.GetHolidaysAvailableAsync({
                countryCode: GetHolidaysAvailable.params.countryCode
            });
            resolve(result[0]);
        } catch (error) {
            reject(error);
        }
    });
};

holidaysController.GetHolidaysForMonth = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await soap.createClientAsync(SOAP_API_URL, soap_client_options);
            const result = await client.GetHolidaysForMonthAsync({
                countryCode: GetHolidaysForMonth.params.countryCode,
                year: GetHolidaysForMonth.params.year,
                month: GetHolidaysForMonth.params.month
            });
            resolve(result[0]);
        } catch (error) {
            reject(error);
        }
    });
};

holidaysController.GetHolidaysForYear = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await soap.createClientAsync(SOAP_API_URL, soap_client_options);
            const result = await client.GetHolidaysForYearAsync({
                countryCode: GetHolidaysForYear.params.countryCode,
                year: GetHolidaysForYear.params.year
            });
            resolve(result[0]);       
        } catch (error) {
            reject(error);
        }
    });
}

holidaysController.GetHolidaysForDateRange = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await soap.createClientAsync(SOAP_API_URL, soap_client_options);
            const result = await client.GetHolidaysForDateRangeAsync({
                countryCode: GetHolidaysForDateRange.params.countryCode,
                startDate: GetHolidaysForDateRange.params.startDate,
                endDate: GetHolidaysForDateRange.params.endDate
            });
            resolve(result[0]);
        } catch (error) {
            reject(error);
        }
    });
};

holidaysController.GetHolidayDate = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await soap.createClientAsync(SOAP_API_URL, soap_client_options);
            const result = await client.GetHolidayDateAsync({
                countryCode: GetHolidayDate.params.countryCode,
                holidayCode: GetHolidayDate.params.holidayCode,
                year: GetHolidayDate.params.year
            });
            resolve(result[0]);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = holidaysController;