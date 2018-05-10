var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('./modules/mongo');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    //CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.json({name: 'Sensor API', version: 'v1'});
});

app.get('/sensors/', async function(req, res) {
    try {
        const response = await mongo.find('Sensor', {}, {});
        res.json({ response: true , message: 'Obtnener sensores exitoso', data: response});
    } catch (e) {
        res.json({ response: false , message: 'Error ocurrio al obtener sensores'});
    }
});

app.post('/sensors/', async function(req, res) {
    try {
        const sensor = {
            name: req.body.name,
            serial: +req.body.serial,
            created_at: new Date(),
        };
        const response = await mongo.insertOne('Sensor', sensor);
        res.json({ response: true, message: 'Inserción de sensor exitoso'});
    } catch (e) {
        res.json({ response: false , message: 'Error Ocurrio al insertar'});
    }
});

app.get('/sensors/registros/', async function(req, res) {
    try {
        const response = await mongo.find('Registros', {}, {});
        res.json({ response: true , message: 'Obtnener registros de sensores exitoso', data: response});
    } catch (e) {
        res.json({ response: false , message: 'Error ocurrio al obtener sensores'});
    }
});

app.get('/sensors/:id', async function(req, res) {
    try {
        const id = +req.params.id || 0;
        const response = await mongo.findOne('Sensor', {serial: +id}, {});
        res.json({ response: true , message: 'Obtnener sensors exitoso', data: response});
    } catch (e) {
        res.json({ response: false , message: 'Error ocurrio al obtener sensores'});
    }
});

app.get('/sensors/:id/registros', async function(req, res) {
    try {
        const id = +req.params.id || 0;
        const response = await mongo.find('Registros', {serial: +id}, {});
        res.json({ response: true, message: 'Obtener registro de sensores exitoso', data: response});
    } catch (e) {
        res.json({ response: false , message: 'Error ocurrio al obtener los registros de un sensor'});
    }
});

app.post('/sensors/:id/registros', async function(req, res) {
    try {
        const registro = {
            serial: +req.params.id,
            valor: +req.body.valor,
            created_at: new Date(),
        };
        const response = await mongo.insertOne('Registros', registro);
        res.json({ response: true, message: 'Inserción de registro de sensor exitoso'});
    } catch (e) {
        res.json({ response: false , message: 'Error ocurrio al insertar registro de un sensor'});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
});