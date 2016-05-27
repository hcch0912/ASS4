var dotenv = require('dotenv');
var pg = require('pg');
dotenv.load();
var jsonQuery = require('json-query')


//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;

var parkTable="cogs121_16_raw.sandag_parks_cntyandcity_prj";
var populationTable="cogs121_16_raw.hhsa_san_diego_demographics_county_population_2012";
var policeTable="cogs121_16_raw.sandag_lawenforcementfacilities_prj";
var hospitalTable="cogs121_16_raw.sandag_hospitals_point_prj";


module.exports.getParkData = function (req,res) {

	var parkName=req.body.parkName;

	var parksData = require('./parks.json');
	
	for(var i=0;i<parksData.parks.length;i++){
	
		if(parksData.parks[i].name==parkName){
			return res.send(JSON.stringify(parksData.parks[i]));
		}
	}
		
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
							console.log(JSON.stringify({nearest:res1.rows[0],avgDis:res2.rows[0]}));
							return res.send({nearest:res1.rows[0],avgDis:res2.rows[0]});
						}else{
							return res.send({delphidata:"No data present hospital"});
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

//hospital 
module.exports.getNearestPoliceData=function(req,res){
	//select min distance hospital query

	 var target_X=req.body.lat;
	 var target_Y=req.body.lng;

	
	var disEquation=" sqrt((ST_Y(ST_TRANSFORM(geom, 4326))-"+ target_X +")^2+(ST_X(ST_TRANSFORM(geom, 4326))-("+target_Y+"))^2) "

	var selectNearestPoliQuery=
	" select \"FACILITY\", "+ disEquation+"AS DIS from "+policeTable+
	" where "+ disEquation+"=(select MIN( "+disEquation+" )"+
	" from "+policeTable+" )";
	//average distance to hospital

	var getAvgDisPoliQuery=
	"select AVG ( " + disEquation+ " ) from "+policeTable; 

	pg.connect(conString,function(err,client,done){
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false,data:err});
		}
		var queryHospital=client.query(selectNearestPoliQuery,function(err,res1){
			if(err){
				console.log(err);
			}
			if(res1){
					var queryAvghospital=client.query(getAvgDisPoliQuery,function(err,res2){
						if(res2){
							console.log(JSON.stringify({nearest:res1.rows[0],avgDis:res2.rows[0]}));
							return res.send({nearest:res1.rows[0],avgDis:res2.rows[0]});
						}else{
							return res.send({delphidata:"No data present hospital"});
						}
					});
							
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

