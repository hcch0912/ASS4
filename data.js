var dotenv = require('dotenv');
var pg = require('pg');
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;

var parkTable="cogs121_16_raw.sandag_parks_cntyandcity_prj";
var populationTable="cogs121_16_raw.hhsa_san_diego_demographics_county_population_2012";
var policeTable="cogs121_16_raw.sandag_lawenforcementfacilities_prj";


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



	function getParks(inputlocation){
		
		
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
	        var queryPark = client.query(selectParkQuery,function(err,res1){
	        	if(res1){
	        		//console.log(res1.rows);
	        		return res1.rows;
	        	}
	        });
		});
	}

	function getPopulation(inputlocation){
		
	    pg.connect(conString, function(err, client, done) {
	        // Handle connection errors
	        if(err) {
	          done();
	          console.log(err);
	          return res.status(500).json({ success: false, data: err});
	        }
	        //Query population data
	        var getPopuQuery="select \"Area\" ,\"Total 2012 Population\" from "+populationTable; 
	        var queryPopu = client.query(getPopuQuery);

	        var queryPopu = client.query(getPopuQuery,function(err,res1){
	        	if(res1){
	        		console.log(res1.rows);
	        		return res1.rows;
	        	}
	        });
	    });
	}

	function getPolice(inputlocation){
		
	    pg.connect(conString, function(err, client, done) {
	        // Handle connection errors
	        if(err) {
	          done();
	          console.log(err);
	          return res.status(500).json({ success: false, data: err});
	        }
	        //Query police data
	        var getPopuQuery="select \"FACILITY\",\"ADDRESS\",\"CITY\",\"ZIP\" from  "+policeTable; 
	        var queryPolice = client.query(getPopuQuery);

	        var queryPolice = client.query(getPopuQuery,function(err,res1){
	        	if(res1){
	        		console.log(res1.rows);
	        		return res1.rows;
	        	}
	        });
	    });
	}
}
