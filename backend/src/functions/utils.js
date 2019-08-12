const fs = require('fs');

module.exports = {
    getAi(pathToAi) {
        ai = JSON.parse(fs.readFileSync(pathToAi));
        ai.id++;
        fs.writeFile(pathToAi, JSON.stringify(ai, null, 2), (err) => {
            if(!!err) res.status(500).send({"msg":"Erro no servidor ao salvar auto incremento!"});
        });
        return ai.id;
    },

    readFile(pathToFile) {
        return JSON.parse(fs.readFileSync(pathToFile));
    },

    readFileFilter(pathToFile, element, value) {
        var objects = JSON.parse(fs.readFileSync(pathToFile));

        let objectFiltered = objects.filter((object) => {
            return object[element] == value;
        })

        return objectFiltered;
    },

    verifyAttributes(data, options) {
        var error = '';
        options.forEach(element => {
            if(!data.hasOwnProperty(element)){
                error = {"msg":`Objeto sem o elemento '${element}'`}; return;
            } 
        }); 
        if(error) return error;
        else return true;
    },
}