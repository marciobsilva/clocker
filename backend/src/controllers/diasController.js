const fs = require('fs');
const utils = require('../functions/utils');

const dayModel = [
    'description'
];

module.exports = {
    list(req, res){
        const days = utils.readFile(req.PATH_DAYS);
        res.send(days);
    },

    store(req, res){
        const days = utils.readFile(req.PATH_DAYS);
        day = req.body;

        const verifyDay = utils.verifyAttributes(day, dayModel);

        if(verifyDay !== true) {
            res.status(400).send(verifyDay);
            return;
        }

        day.id = utils.getAi(req.PATH_AI_DAYS);
        days.push(day);
        fs.writeFile(req.PATH_DAYS, JSON.stringify(days, null, 2), (err) => {
            if(!!err)   res.status(500).send({"msg":"Erro no servidor ao salvar dia!"});
                else    res.send({"msg":"Dia cadastrado com sucesso!"});
        });
    }
}