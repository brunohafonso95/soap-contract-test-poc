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