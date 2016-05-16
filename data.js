var dotenv = require('dotenv');
var pg = require('pg');
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;

var parkTable="cogs121_16_raw.sandag_parks_cntyandcity_prj";
var populationTable="cogs121_16_raw.hhsa_san_diego_demographics_county_population_2012";
var policaTable="cogs121_16_raw.sandag_lawenforcementfacilities_prj";

var getData = module.exports.getData = function (req, res) {

	var inputlocation=req.params.inputlocation;
	var parkList=getParks(inputlocation);
	var popuList=getPopulation(inputlocation);
	var policeList=getPolice(inputlocation);

	if(parkList||policeList||popuList){

	var lists={
		"parks":parkList,
		"police":policeList,
		"population":popuList
	};

	res.json(lists);
	}else{
  		return { delphidata: "No data present." }
	}
}


function getParks(inputlocation){
	var parkResults=[];
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        //Query Park data
        var selectParkQuery=
        	"select DISTINCT ON (common_nam) common_nam , community_ "
        	+" from "+parkTable
        	+" where address_lo is not null AND  designated='COMMUNITY PARK'";
        var queryPark = client.query(selectParkQuery);

        queryPark.on('row', function(row) {
            parkResults.push(row);
        });
        console.log(parkResults[0]);
        queryPark.on('end', function() {
            done();
            return res.json(parkResults);
        });
}

function getPopulation(inputlocation){
	var popuResults=[];
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        //Query population data
        var getPopuQuery="select \"Area\" ,\"Total 2012 Population\" from "+populationTable; 
        var queryPark = client.query(selectParkQuery);

        queryPark.on('row', function(row) {
            popuResults.push(row);
        });
        console.log(popuResults[0]);
        queryPark.on('end', function() {
            done();
            return res.json(parkResults);
        });

}

function getPolice(inputlocation){
	var policeResults=[];
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        //Query police data
        var getPopuQuery="select \"FACILITY\",\"ADDRESS\",\"CITY\",\"ZIP\" from  "+policeTable; 
        var queryPark = client.query(selectParkQuery);

        queryPark.on('row', function(row) {
            policeResults.push(row);
        });
        console.log(policeResults[0]);
        queryPark.on('end', function() {
            done();
            return res.json(policeResults);
        });

}
