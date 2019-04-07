const {
    holidaysAvailableModel,
    holidaysForMonthModel,
    holidaysForYearModel,
    HolidaysForDateRangeModel,
    holidayDateResultModel
} = require('../models/holidaysModel');

describe('Holidays Service', function () {
    it('GetHolidaysAvailable: deve retornar uma objeto que contém a lista dos feriados de um determinado país.', function (done) {
        addContext(this,
            `Este teste tem como objetivo validar se o retorno da transação "GetHolidaysAvailable" segue o modelo estabelecido que garante o pleno funcionamento dos demais serviços.`
        );

        addContext(this, 'http://www.url.com/pathname');

        request
            .get('/getholidaysavailable')
            .end((error, res) => {
                joiAssert(res.body, holidaysAvailableModel);
                done(error);
            });
    });

    it('GetHolidaysForMonth: deve retornar um objeto que contém a lista de feriados por mês de um determinado país a partir do mês e ano especificos.', function (done) {
        addContext(this,
            `Este teste tem como objetivo validar se o retorno da transação "GetHolidaysForMonth" segue o modelo estabelecido que garante o pleno funcionamento dos demais serviços.`
        );

        addContext(this, 'http://www.url.com/pathname');

        request
            .get('/getholidaysformonth')
            .end((error, res) => {
                joiAssert(res.body, holidaysForMonthModel);
                done(error);
            });
    });

    it('GetHolidaysForYear: deve retornar uma objeto que contém uma lista dos feriados de um determinado país e de um terminado ano.', function (done) {
        addContext(this,
            `Este teste tem como objetivo validar se o retorno da transação "GetHolidaysForYear" segue o modelo estabelecido que garante o pleno funcionamento dos demais serviços.`
        );

        addContext(this, 'http://www.url.com/pathname');

        request
            .get('/getholidaysforyear')
            .end((error, res) => {
                joiAssert(res.body, holidaysForYearModel);
                done(error);
            });
    });

    it('GetHolidaysForDateRange: deve retornar um objeto que contém uma lista dos feriados cadastrados de um determinado país a partir de uma data de unicio/fim.', function (done) {
        addContext(this,
            `Este teste tem como objetivo validar se o retorno da transação "GetHolidaysForDateRange" segue o modelo estabelecido que garante o pleno funcionamento dos demais serviços.`
        );

        addContext(this, 'http://www.url.com/pathname');

        request
            .get('/getholidaysfordaterange')
            .end((error, res) => {
                joiAssert(res.body, HolidaysForDateRangeModel);
                done(error);
            });
    });

    it('GetHolidayDate: deve retonar uma objeto que contém a data de um feriado a partir do país, código do feriado e ano inseridos.', function (done) {
        addContext(this,
            `Este teste tem como objetivo validar se o retorno da transação "GetHolidayDate" segue o modelo estabelecido que garante o pleno funcionamento dos demais serviços.`
        );

        addContext(this, 'http://www.url.com/pathname');

        request
            .get('/getholidaydate')
            .end((error, res) => {
                joiAssert(res.body, holidayDateResultModel);
                done(error);
            });
    });
});