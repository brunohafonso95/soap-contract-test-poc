const countriesAvaliableModel = joi.object().keys({
    GetCountriesAvailableResult: joi.object().keys({
        CountryCode: joi.array().items(joi.object().keys({
            Code: joi.string(),
            Description: joi.string()    
        }))
    })
});

module.exports = {
    countriesAvaliableModel
}