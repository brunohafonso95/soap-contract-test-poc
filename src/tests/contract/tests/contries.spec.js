const { countriesAvaliableModel } = require('../models/countriesModel');

describe('Countries Service', function () {
    it(`GetCountriesAvailable: deve retornar uma objeto que contém a lista dos países cadastrados no webservice.`, function (done) {
        addContext(this,
            `Este teste tem como objetivo validar se o retorno da transação "GetCountriesAvailable" segue o modelo estabelecido que garante o pleno funcionamento dos demais serviços.`
        );

        addContext(this, 'http://www.url.com/pathname');

        request
            .get('/getcountriesavailable')
            .end((error, res) => {
                joiAssert(res.body, countriesAvaliableModel);
                done(error);
            });
    });
});