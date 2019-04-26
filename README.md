# Testes de contrato de um webservice SOAP com node.js

Neste exemplo realizaremos os testes de contrato em um webservice soap mais especificamente um serviço para busca de feriados que pode ser encontrado no seguinte link [Version 2.0.1](http://holidaywebservice.com/HolidayService_v2/HolidayService2.asmx) e basicamente é um Web service que calcula datas de feriados.

Os dados são retornados no formato XML, mas navegar através dos nós XML é algo bem trabalhoso, pensando nisso nesse exemplo eu realizei a criação de uma API REST que faz as requisições nos barramentos do web serviço e devolve no formato JSON facilitando assim a manipulação/validação dos dados.

## Criando nossa API

vamos começar criando a estrutura básica do nosso projeto, então criamos uma nova pasta acessamos essa pasta no CMD ou Bash e digitamos o seguinte comando:

```javascript
npm init -y
```

logo em seguida vamos instalar as nossas depêndencias que são as seguintes:

- @hapi/joi: v15.0.0
- apiconnect-wsdl: v1.6.43
- chai: v4.2.0
- express: v4.16.4
- http-status: v1.3.2
- joi: v14.3.1
- joi-assert: v0.0.3,
- js-yaml: v3.13.1,
- mocha: v6.0.2,
- mocha-junit-reporter: v1.21.0,
- mocha-multi-reporters: v1.1.7",
- mochawesome: v3.1.1,
- soap: v0.26.0,
- supertest: v4.0.2,
- swagger-markdown: v1.1.6

E para realizar a instalação rodamos o seguinte comando na raiz do projeto:

```javascript
npm install express http-status joi @hapi/joi joi-assert mocha supertest soap swagger-markdown mochawesome mocha-multi-reporters js-yaml apiconnect-wsdl chai mocha-junit-reporter
```

Agora vamos criar a seguinte estrutura de pastas/arquivos:

- src
    - app.js
    - index.js
    - generateSwagger.js
    - config
      - config.js 
    - core
      - controllers
        - holidaysController.js
        - countriesController.js
      - routes
        - countriesRoute.js
        - holidaysRoute.js  
    - tests
      -  contract
      -  helpers.js
      -  config.json
      -  mocha.opts
         - data
            - massaDeDados.json
         - models
           - countriesModel.js
           - holidaysModel.js
         - reports
         - tests 
           - countries.spec.js
           - holidays.spec.js

Após a criação da estrutura de pastas vamos iniciar o processo desenvolvimento da nossa API.

## app.js

Esse arquivo pe responsável por comportar a classe principal da nossa API.

```javascript 
const express = require('express'); // import do modulo que ajudará na criação da estrutura da api
const app = express(); // instanciando o modulo
const routes = require('./core/routes/index'); // importando modulo das rotas

app.use(express.json()); // definindo que o modelo de dados a ser trafegado na api será JSON

// injetando as rotas
routes(app);

module.exports = app; // exportando modulo
```

## index.js

Esse arquivo é o ponto de entrada da nossa API, quando formos executar a API executaremos este arquivo

```javascript
const app = require('./app'); // importando o app

// iniciando o nosso servidor
app.listen(3000, function() {
    console.log('server listening on port 3000');
});
```

## generateSwagger.js

Esse arquivo contém um script que irá extrair a descrição do arquivo WDSL (arquivo de descrição de web service SOAP) e gerar um arquivo yaml no formato de OpenApi (formato padrão de documentação para swagger) esse arquivo pode ser utilizado para hospedar uma documentação viva, o arquivo tem o seguinte conteúdo:

```javascript
const apiconnWsdl = require("apiconnect-wsdl");
const yaml = require("js-yaml");
const fs = require('fs');
const { SOAP_API_URL } = require('./config/config');

// chamando usar do serviço soap para conversão
apiconnWsdl.getJsonForWSDL(SOAP_API_URL)
    .then((wsdls) => {
        // capturando serviços
        const serviceData = apiconnWsdl.getWSDLServices(wsdls);

        // loop em todos os serviços para gerar o yaml
        for (var item in serviceData.services) {
            var serviceName = serviceData.services[item].service;
            var wsdlId = serviceData.services[item].filename;
            var wsdlEntry = apiconnWsdl.findWSDLForServiceName(wsdls, serviceName);
            var swagger = apiconnWsdl.getSwaggerForService(wsdlEntry, serviceName, wsdlId);
            fs.writeFileSync(`./src/tests/contract/reports/${serviceName}-swaggerDoc.yaml`, yaml.safeDump(swagger));
            console.log(`${serviceName}-swaggerDoc.yaml successfully generated.`);
        }
    })
    .catch(error => console.error(`error generating swagger docs: ${error.message}`));
```

PS: esse arquivo será executado fora dos testes.

## countriesController.js

Esse arquivo tem como objetivo comportar todos os métodos para a manipulação dos dados dos serviços referentes aos countries.

#### versão com async e await

```javascript
const soap = require('soap'); // importando modulo do soap
const { SOAP_API_URL } = require('../../config/config'); // importando arquivo de configuração

const countriesController = {}; // criando um objeto literal

// criando o metodo GetCountriesAvailable 
countriesController.GetCountriesAvailable = function() {
    // retornando uma promise para facilitar o trabalho com assicronismo
    return new Promise(async (resolve, reject) => {
        // capturando exceções
        try {
            // criando um cliente de forma assincrona e passando a url do serviço como parâmetro
            const client = await soap.createClientAsync(SOAP_API_URL);
            // acessando o barramento GetCountriesAvailable de forma assincrona
            const result = await client.GetCountriesAvailableAsync();
            // devolvendo o resultado limpo
            resolve(result[0]);
        } catch (error) {
            // devolvendo a exception capturada, caso o algoritmo lance alguma
            reject(error);
        }
    });
}



module.exports = countriesController;
```

#### versão com callback

```javascript
const soap = require('soap'); // importando modulo do soap
const { SOAP_API_URL } = require('../../config/config'); // importando arquivo de configuração

const countriesController = {}; // criando um objeto literal

// criando o metodo GetCountriesAvailable 
countriesController.GetCountriesAvailable = function() {
    // retornando uma promise para facilitar o trabalho com assicronismo
    return new Promise((resolve, reject) => {
        // capturando exceções
        try {
            // criando um cliente de forma sincrona e passando a url do serviço como parâmetro
            soap.createClient(SOAP_API_URL, function(client) {
                // acessando o barramento GetCountriesAvailable de forma sincrona
                client.GetCountriesAvailable(function(result) {
                    // devolvendo o resultado limpo
                    resolve(result[0]);
                });
            });
        } catch (error) {
            // devolvendo a exception capturada, caso o algoritmo lance alguma
            reject(error);
        }
    });
}


module.exports = countriesController;
```

## holidaysController.js

Esse arquivo tem como objetivo comportar todos os métodos para a manipulação dos dados dos serviços referentes aos holidays.

#### versão com async e await

```javascript
const soap = require('soap'); // importando modulo do soap
const { SOAP_API_URL } = require('../../config/config'); // importando configuração
// importando massa de dados que será utilizada e guardando em variaveis.
const { 
    GetHolidaysAvailable,
    GetHolidaysForMonth,
    GetHolidaysForYear,
    GetHolidaysForDateRange,
    GetHolidayDate
} = require('../../tests/contract/data/massaDeDados');

const holidaysController = {}; // criando um objeto literal

// criando um método para o modulo
holidaysController.GetHolidaysAvailable = () => {
    // retornando uma promise para facilitar o trabalho com assicronismo
    return new Promise(async (resolve, reject) => {
        // capturando possiveis exceptions
        try {
            // criando um cliente de forma assincrona e passando a url do serviço como parâmetro
            const client = await soap.createClientAsync(SOAP_API_URL, soap_client_options);
            // acessando o barramento GetCountriesAvailable de forma assincrona e passando 
            // como parametros os dados que precisam ser enviados para o barramento conforme a documentação
            const result = await client.GetHolidaysAvailableAsync({
                countryCode: GetHolidaysAvailable.params.countryCode
            });
            // devolvendo o resultado limpo
            resolve(result[0]);
        } catch (error) {
            // devolvendo a exception capturada, caso o algoritmo lance alguma
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
```

#### versão com callback

```javascript
const soap = require('soap'); // importando modulo do soap
const { SOAP_API_URL } = require('../../config/config'); // importando configuração
// importando massa de dados que será utilizada e guardando em variaveis.
const { 
    GetHolidaysAvailable,
    GetHolidaysForMonth,
    GetHolidaysForYear,
    GetHolidaysForDateRange,
    GetHolidayDate
} = require('../../tests/contract/data/massaDeDados');

const holidaysController = {}; // criando um objeto literal

// criando um método para o modulo
holidaysController.GetHolidaysAvailable = () => {
    // retornando uma promise para facilitar o trabalho com assicronismo
    return new Promise((resolve, reject) => {
        // capturando possiveis exceptions
        try {
            // criando um cliente de forma assincrona e passando a url do serviço como parâmetro
            soap.createClient(SOAP_API_URL, function(client) {
                // acessando o barramento GetCountriesAvailable de forma assincrona e passando 
                // como parametros os dados que precisam ser enviados para o barramento conforme a documentação
                client.GetHolidaysAvailable({
                    countryCode: GetHolidaysAvailable.params.countryCode
                }, function(result) {
                    // devolvendo o resultado limpo
                    resolve(result[0]);
                });
            });
        } catch (error) {
            // devolvendo a exception capturada, caso o algoritmo lance alguma
            reject(error);
        }
    });
};

holidaysController.GetHolidaysForMonth = () => {
    return new Promise((resolve, reject) => {
        try {
            soap.createClient(SOAP_API_URL, function(client) {
                client.GetHolidaysForMonth({
                    countryCode: GetHolidaysForMonth.params.countryCode,
                    year: GetHolidaysForMonth.params.year,
                    month: GetHolidaysForMonth.params.month
                }, function(result) {
                    resolve(result[0]);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

holidaysController.GetHolidaysForYear = () => {
    return new Promise((resolve, reject) => {
        try {
            soap.createClient(SOAP_API_URL, function(client) {
                const result = await client.GetHolidaysForYear({
                    countryCode: GetHolidaysForYear.params.countryCode,
                    year: GetHolidaysForYear.params.year
                }, function(result) {
                    resolve(result[0]);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}

holidaysController.GetHolidaysForDateRange = () => {
    return new Promise((resolve, reject) => {
        try {
            soap.createClient(SOAP_API_URL, function(client) {
                client.GetHolidaysForDateRange({
                    countryCode: GetHolidaysForDateRange.params.countryCode,
                    startDate: GetHolidaysForDateRange.params.startDate,
                    endDate: GetHolidaysForDateRange.params.endDate
                }, function(result) {
                    resolve(result[0]);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

holidaysController.GetHolidayDate = () => {
    return new Promise((resolve, reject) => {
        try {
            soap.createClient(SOAP_API_URL, function(client) {
                client.GetHolidayDate({
                    countryCode: GetHolidayDate.params.countryCode,
                    holidayCode: GetHolidayDate.params.holidayCode,
                    year: GetHolidayDate.params.year
                }, function(result) {
                    resolve(result[0]);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = holidaysController;
```