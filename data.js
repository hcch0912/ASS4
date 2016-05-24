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
module.exports.getNearestHospitalData=function(req,res){
	//select min distance hospital query
	var target_X=req.body.lat;
	var target_Y=req.body.lng;
	var disEquation=" sqrt((ST_Y(ST_TRANSFORM(geom, 4326))-"+ target_X +")^2+(ST_X(ST_TRANSFORM(geom, 4326))-("+target_Y+"))^2) "

	var selectNearestHosQuery=
	" select \"OWNNAM1\", "+ disEquation+"AS DIS from "+hospitalTable+
	" where "+ disEquation+"=(select MIN( "+disEquation+" )"+
	" from "+hospitalTable+" )";
	//average distance to hospital

	var getAvgDisHosQuery=
	"select AVG ( " + disEquation+ " ) from "+hospitalTable; 

	pg.connect(conString,function(err,client,done){
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		var queryHospital=client.query(selectNearestHosQuery,function(err,res1){
			if(err){
				console.log(err);
			}
			if(res1){
					var queryAvghospital=client.query(getAvgDisHosQuery,function(err,res2){
						if(res2){
							
							return res.json({nearest:res1.rows,avgDis:res2.rows});
						}else{
							return res.json({delphidata:"No data present hospital"});
						}
					});
							
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
	        	+" from "+policeTable
	        	+" where ";
	        var queryPolice = client.query(selectPoliceQuery,function(err,res1){
	        	
	         	
	        	if(res1){
	        		
	        		
	        		
	        	}else{
			  		return res.json( { delphidata: "No data present." });
				}
	        	 
	        });
	       
		});
		
}

/*
 select "OWNNAM1",  
 sqrt(("X_COORD"-10.1)^2+("Y_COORD"-10.2)^2) AS DIS
  from cogs121_16_raw.sandag_hospitals_point_prj 
   where sqrt(("X_COORD"-10.1)^2+("Y_COORD"-10.2)^2) =
   (select MIN(  sqrt(("X_COORD"-10.1)^2+("Y_COORD"-10.2)^2) )
     from cogs121_16_raw.sandag_hospitals_point_prj)
*/

