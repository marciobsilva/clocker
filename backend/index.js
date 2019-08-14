const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');

var socketsId = [];

io.on('connection', socket => {
    socketsId.push(socket.id);
});

const PATH_SPEECHES = './data/speeches.json';
const PATH_AI_SPEECHES = './data/ai/speeches.json';
const PATH_DAYS = './data/days.json';
const PATH_AI_DAYS = './data/ai/days.json';
const LAST_COMMAND = './data/lastCommand.json';

// Espaço de verificação da existência dos arquivos
if(!fs.existsSync(PATH_AI_SPEECHES)){
    fs.mkdirSync('./data/ai', { recursive: true }, (err) => console.log(err) );
    fs.writeFile(PATH_AI_SPEECHES, '{"id":"0"}', (err) => { console.log(err) });
}

if(!fs.existsSync(PATH_SPEECHES)){
    fs.mkdirSync('./data', { recursive: true }, (err) => console.log(err) );
    fs.writeFile(PATH_SPEECHES, '[]', (err) => { console.log(err) });
}

if(!fs.existsSync(PATH_AI_DAYS)){
    fs.mkdirSync('./data/ai', { recursive: true }, (err) => console.log(err) );
    fs.writeFile(PATH_AI_DAYS, '{"id":"0"}', (err) => { console.log(err) });
}

if(!fs.existsSync(PATH_DAYS)){
    fs.mkdirSync('./data', { recursive: true }, (err) => console.log(err) );
    fs.writeFile(PATH_DAYS, '[]', (err) => { console.log(err) });
}

if(!fs.existsSync(LAST_COMMAND)){
    fs.mkdirSync('./data', { recursive: true }, (err) => console.log(err) );
    fs.writeFile(LAST_COMMAND, '{ "method":"stop", "speech":null }', (err) => { console.log(err) });
}

app.use((req, res, next) => {
    req.PATH_SPEECHES = PATH_SPEECHES;
    req.PATH_AI_SPEECHES = PATH_AI_SPEECHES;
    req.PATH_DIAS = PATH_DAYS;
    req.PATH_AI_DIAS = PATH_AI_DAYS;
    req.LAST_COMMAND = LAST_COMMAND;
    req.io = io;
    req.socketsId = socketsId;

    next();
});

app.use(express.json());
app.use(cors());
app.use(require('./src/routes'));

server.listen(3001);