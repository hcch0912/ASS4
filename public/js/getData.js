
function getNearestHospital(lat,lng){

  var data={};
  data.lat=lat;
  data.lng=lng;


  var results={};

   $.ajax({
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/delphidata/hospital',            
            success: function(data) {
                    results.name=data.nearest.OWNNAM1;
                    results.distance=data.nearest.dis;
                    results.avg=data.avgDis.avg;
                   
                    var hospitalName=document.getElementById("nearestHospital");
                    hospitalName.innerHTML=results.name+" "+Math.round(results.distance * 100) / 100;      
             }
   });
	}


function getNearestPolice(lat,lng){

  var data={};
  data.lat=lat;
  data.lng=lng;

  var results={};

   $.ajax({
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/delphidata/police',            
            success: function(data) {
                    results.name=data.nearest.FACILITY;
                    results.distance=data.nearest.dis;
                    results.avg=data.avgDis.avg;
                   
                    var hospitalName=document.getElementById("nearestPolice");
                    hospitalName.innerHTML=results.name+" "+Math.round(results.distance * 100) / 100;                  
             }
   });
  }


function getParkInfo(parkName){
  var data={};
  data.parkName=parkName;
   var results={};
   
   $.ajax({
            type: 'POST',
            dataType: 'json',
            data:JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/getPark',            
            success: function(data) {
                  document.getElementById("currplace").innerHTML=data.name;
                  document.getElementById("parkImg").src=data.img;
            
             }
   });
}

