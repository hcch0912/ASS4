var dotenv = require('dotenv');
var pg = require('pg');
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;

var parkTable="cogs121_16_raw.sandag_parks_cntyandcity_prj";
var populationTable="cogs121_16_raw.hhsa_san_diego_demographics_county_population_2012";
var policeTable="cogs121_16_raw.sandag_lawenforcementfacilities_prj";


module.exports.getParkData = function (req,res) {

	var inputlocation=req.params.inputlocation;


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
	        		
	        		return res.json(res1.rows);
	        		console.log("one result");
	        		
	        	}else{
			  		return res.json( { delphidata: "No data present." });
				}
	        	 
	        });
	       
		});
		
}


module.exports.getPopulationData = function (req,res) {

	var inputlocation=req.params.inputlocation;
	

	pg.connect(conString, function(err, client, done) {
	        // Handle connection errors
	       if(err) {
	          done();
	          console.log(err);
	          return { success: false, data: err};
	        }
	        //Query Park data
	        var selecPopulationQuery=
	        	"select DISTINCT ON (common_nam) common_nam , community_ "
	        	+" from "+parkTable
	        	+" where address_lo is not null AND  designated='COMMUNITY PARK'";
	        var queryPopulation = client.query(selecPopulationQuery,function(err,res1){
	          	
	        	if(res1){
	        		
	        		return res.json(res1.rows);
	        		console.log("one result");
	        		
	        	}else{
			  		return res.json( { delphidata: "No data present." });
				}
	        	 
	        });
	       
		});
		
}

module.exports.getPoliceData = function (req,res) {

	var inputlocation=req.params.inputlocation;
	


	pg.connect(conString, function(err, client, done) {
	        // Handle connection errors
	       if(err) {
	          done();
	          console.log(err);
	          return { success: false, data: err};
	        }
	        //Query Park data
	        var selectPoliceQuery=
	        	"select DISTINCT ON (common_nam) common_nam , community_ "
	        	+" from "+parkTable
	        	+" where address_lo is not null AND  designated='COMMUNITY PARK'";
	        var queryPolice = client.query(selectPoliceQuery,function(err,res1){
	        	
	         	
	        	if(res1){
	        		
	        		return res.json(res1.rows);
	        		console.log("one result");
	        		
	        	}else{
			  		return res.json( { delphidata: "No data present." });
				}
	        	 
	        });
	       
		});
		
}
