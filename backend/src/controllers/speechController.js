const fs = require('fs');
const utils = require('../functions/utils');

const speechModel = [
    'title', 'time', 'day_id'
];

const startSpeech = (pathToSpeech, pathToLastCommand, idSpeech) => {
    var response = null;

    var lastCommand = utils.readFile(pathToLastCommand);
    if(lastCommand.method != 'stop') response = { "msg":"Já foi iniciado um discurso!" };
    else {
        speeches = utils.readFile(pathToSpeech);
        speeches.map( speech => {
            if(speech.id == idSpeech) {
                delete speech.stoppedAt;
                speech.startedAt = new Date();
                response = speech;
            }
        });
        fs.writeFile(pathToSpeech, JSON.stringify(speeches, null, 2), err => {
            if(!!err) response = {"msg":"Erro no servidor ao salvar discurso iniciado!"};
            else {
                lastCommand.method = "start";
                lastCommand.speech = response;
                fs.writeFile(pathToLastCommand, JSON.stringify(lastCommand, null, 2), errLastCommand => {
                    if(!!errLastCommand) response = {"msg":"Erro grave ao salvar último comando!"};
                })
            }
        });
    }

    return response;
};

const stopSpeech = (pathToSpeech, pathToLastCommand) => {
    var response = null;

    var lastCommand = utils.readFile(pathToLastCommand);
    if(lastCommand.method != 'start') response = { "msg":"Não foi iniciado nenhum discurso!" };
    else {
        speeches = utils.readFile(pathToSpeech);
        speeches.map( speech => {
            if(speech.id == lastCommand.speech.id) {
                speech.stoppedAt = new Date();
                response = speech;
            }
        });
        fs.writeFile(pathToSpeech, JSON.stringify(speeches, null, 2), err => {
            if(!!err) response = {"msg":"Erro no servidor ao salvar discurso finalizado!"};
            else {
                lastCommand.method = "stop";
                lastCommand.speech = response;
                fs.writeFile(pathToLastCommand, JSON.stringify(lastCommand, null, 2), errLastCommand => {
                    if(!!errLastCommand) response = {"msg":"Erro grave ao salvar último comando!"};
                })
            }
        });
    }

    return response;
};

module.exports = {
    list(req, res){
        const { day } = req.query;

        if(day === undefined) speeches = utils.readFile(req.PATH_SPEECHES);
        else speeches = utils.readFileFilter(req.PATH_SPEECHES, 'day_id', day);

        const lastCommand = utils.readFile(req.LAST_COMMAND);

        res.send({speeches, lastCommand});
    },

    store(req, res){
        const speeches = utils.readFile(req.PATH_SPEECHES);
        speech = req.body;
        
        const verifySpeech = utils.verifyAttributes(speech, speechModel);

        if(verifySpeech !== true) {
            res.status(400).send(verifySpeech);
            return;
        }

        speech.id = utils.getAi(req.PATH_AI_SPEECHES);
        speeches.push(speech);

        fs.writeFile(req.PATH_SPEECHES, JSON.stringify(speeches, null, 2), (err) => {
            if(!!err)   res.status(500).send({"msg":"Erro no servidor ao salvar discurso!"});
                else    res.send({"msg":"Discurso cadastrado com sucesso!"});
        });
    },

    start(req, res){
        const { id } = req.query;

        const response = startSpeech(req.PATH_SPEECHES, req.LAST_COMMAND, id);

        res.send(response);
    },

    stop(req, res){
        const response = stopSpeech(req.PATH_SPEECHES, req.LAST_COMMAND);

        res.send(response);
    },

    lastCommand(req, res){
        const lastCommand = utils.readFile(req.LAST_COMMAND);
        res.send(lastCommand);
    }
};