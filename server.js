var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var portName = process.argv[2];


/*var myport = new SerialPort('portName', {
    baudRate: 9600,
    parser: serialport.parsers.Readline("\r\n")
});

myport.on('open', onOpen);
myport.on('data', onData);

function onOpen() {
    console.log("Open Con");
};

function onData(data) {
    console.log("On data" + data);
}
*/
var app = express();

var db;

MongoClient.connect('mongodb://Josue:1234@ds117250.mlab.com:17250/iotestacionamiento', function(err, client) {
    if (err) return console.log(err);
    app.listen(process.env.PORT || 3000, () => {
        console.log('listening on 3000')
    })
});

fs.readFile('../iot/ejemplo.txt', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
})
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function(req, res) {
    res.render('index.ejs');
});