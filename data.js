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
	        			
	        		return res.json(res1.rows);
	        		
	        	}else{

			  		return res.json( { delphidata: "No data present." });
				}
	        	 
	        });
	       
		});
		
}

//hospital 
module.exports.getHospitalData=function(req,res){
	var inputlocation=req.params.inputlocation;

	//select min distance hospital query
	var hospitalName;
	var distance;
	var target_X;
	var target_Y;
	var disEquation=" sqrt((\"X_COORD\"-"+ target_X +")^2+(\"Y_COORD\""+-target_Y+")^2) "

	var selectNearestHosQuery=
	" select \"OWNNAM1\", "+ disEquation+"AS DIS from "+hospitalTable+
	" where "+ disEquation+"=(select MIN( "+disEquation+" )"
	" from "+hospitalTable+" )";
	//average distance to hospital
	var getAvgDisHosQuery=
	"select AVG ( " + disEquation+ " ) from "+hospitalTable; 

	pd.connect(conString,function(err,client,done){
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}

		var queryHospital=client.query(selectNearestHosQuery,function(err,res1){
			if(res1){
					return res.json(res1.row);
			}else{
				return res.json({delphidata:"No data present"});
			}
		});

		var queryAvghospital=client.query(getAvgDisHosQuery,function(err,res2){
			if(res2){
					return res.json(res2.row);
			}else{
				return res.json({delphidata:"No data present"});
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
	        	"select Area,"
	        	+" from "+populationTable
	        	+" where ";
	        var queryPopulation = client.query(selecPopulationQuery,function(err,res1){
	          	
	        	if(res1){
	        		
	        		return res.json(res1.rows);
	        		
	        		
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
	        		
	        		
	        		
	        	}else{
			  		return res.json( { delphidata: "No data present." });
				}
	        	 
	        });
	       
		});
		
}


