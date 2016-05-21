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
  var locationData = require('./locations.json');
  res.render('index', locationData);
});
app.get('/map', function(req,res){
  res.render('map');
});

app.get('/delphidata/park/:inputlocation([A-Za-z0-9]*)',dataEndpoint.getParkData);
  
app.get('/delphidata/population/:inputlocation([A-Za-z0-9]*)',dataEndpoint.getPopulationData);
app.get('/delphidata/police/:inputlocation([A-Za-z0-9]*)',dataEndpoint.getPoliceData);


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
