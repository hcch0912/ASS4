//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');

var dotenv = require('dotenv');
var pg = require('pg');
var app = express();

//client id and client secret here, taken from .env (which you need to create)

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;
var dataEndpoint=require('./data');
//Configures the Template engine
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
                  saveUninitialized: true,
                  resave: true}));

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

//routes
app.get('/', function(req, res){
  
  res.render('index');
});
//render map page with parks location info --default setting
app.get('/map', function(req,res){
  	res.render('map');
});

app.use('/favicon.ico', express.static('/favicon.ico'));

app.get('/getParks', function(req,res){
	var locationData = require('./parks.json');
  	res.send(locationData.parks);
});
app.get('/delphi/getCemetry',dataEndpoint.getCemetry);
//app.get('/delphi/getCanyons',dataEndpoint.getCanyonsData);


app.post('/getParkInfo',dataEndpoint.getParkData);
app.post('/getCemeteryInfo',dataEndpoint.getCemetryData);
app.post('/delphidata/hospital',dataEndpoint.getNearestHospitalData);
app.post('/delphidata/police',dataEndpoint.getNearestPoliceData);

app.post('/delphi/food',dataEndpoint.getAroundFood);
app.post('/delphi/beverage',dataEndpoint.getAroundBeverage);
app.post('/delphi/grocery',dataEndpoint.getAroundGrocery);


http.createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('Express server listening on port ' + app.get('port'));
});
