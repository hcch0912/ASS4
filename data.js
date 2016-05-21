var dotenv = require('dotenv');
var pg = require('pg');
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;

var parkTable="cogs121_16_raw.sandag_parks_cntyandcity_prj";
var populationTable="cogs121_16_raw.hhsa_san_diego_demographics_county_population_2012";
var policeTable="cogs121_16_raw.sandag_lawenforcementfacilities_prj";
var hospitalTable="cogs121_16_raw.sandag_hospitals_point_prj";


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
	        	"select DISTINCT ON (common_nam) common_nam ,community_  , address_lo "
	        	+" from "+parkTable
	        	+" where address_lo is not null AND  designated='COMMUNITY PARK'";
	        var queryPark = client.query(selectParkQuery,function(err,res1){
	        	
	        	if(res1){	
	        		console.log("herein parks");
	        		console.log("one result"+res1.rows);	
	        		return res.json(res1.rows);
	        		
	        	}else{

			  		return res.json( { delphidata: "No data present." });
				}
	        	 
	        });
	       
		});
		
}


module.exports.getHospitalData=function(req,res){
	var inputlocation=req.params.inputlocation;

	pd.connect(conString,function(err,client,done){
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		var selectHosQuery=
			"select \"OWNNAM1\" , \"X_COORD\" , \"Y_COORD\" from "+hospitalTable
			+" where ";
		var queryHospital=client.query(selectHosQuery,function(err,res1){
			if(res1){
					return res.json(res1.row);
			}else{
				return res.json({delphidata:"No data present"});
			}
		})
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
	        	"select Area,"
	        	+" from "+populationTable
	        	+" where ";
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
	        	"select  "
	        	+" from "+policeTables
	        	+" where ";
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
