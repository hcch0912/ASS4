




$(document).ready( function () {

  $('#toHelp').click(function(e) {
    e.preventDefault();
    $('#help').css('margin-left','0px');
    $('#main').css('margin-left','-1250px');
  });

  $('#toHome').click(function(e) {
    e.preventDefault();
    $('#main').css('margin-left','0px');
    $('#help').css('margin-left','1250px');
  });


});

//globle location variable

var thisPlace={};
  
    thisPlace.has=false;
    thisPlace.showPoliceMarker=false;
    thisPlace.showHospitalMarker=false;
    thisPlace.showFoodMarker=false;
    thisPlace.showBeverageMarker=false;
    thisPlace.showGroceryMarker=false;
var chart;
var saveCount=0;

function oncheck(element){
  element.checked=element.checked;
  if(element.checked==true){
      switch (element.name){
        case  "parks":
          addParkMarker();
          break;
        case "cemeteries":
          addCemetryMarker();
          break;
        case "canyons":
          addCanyonsMarker();
          break;
        case "food":
          addFoodMarker();
          break;
        case "beverage":
          addBeverageMarker();
          break;
        case "grocery":
          addGroceryMarker();
          break;
        case "police":
          showPolice();
          break;
        case "hospital":
          showClinic();
        default:
          break;
      }
  }else{
      switch (element.name){
        case  "parks":
          clearPark();
          break;
        case "cemeteries":
          clearCemetry();
          break;
        case "canyons":
          clearCanyons();
          break;
        case "food":
          clearFood();
          break;
        case "beverage":
          clearBeverage();
          break;
        case "grocery":
          clearGrocery();
          break;
        case "police":
          clearPolice();
          break;
        case "hospital":
          clearClinic();
        default:
          break;
      }
  }

}


function addParkMarker(){

    $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/getParks',            
            success: function(data) {

                
                var markerList=[];
                  
                for(var i=0;i<data.length;i++){  
                    var title = data[i].name;
                    var marker = L.marker(new L.LatLng(data[i].latitude, data[i].longitude), {
                        icon: L.mapbox.marker.icon({'marker-symbol': 'park', 'marker-color': '#2d862d'}),
                        title: title
                    });
                    marker.bindPopup(title);

                    parkMarkers.addLayer(marker);
                    markerList.push(marker);
                }

                for(var i=0;i<markerList.length;i++){
                  
                  markerList[i].on('click',function(e){
                    getParkInfo(e.target.options.title);
                    
                    getNearestHospital(e.target._latlng.lat,e.target._latlng.lng);

                    console.log(thisPlace);
                    
                  });
                }
                map.addLayer(parkMarkers);

             }
    });

}







function addCemetryMarker(){

     $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/delphi/getCemetry',            
            success: function(data) {

                var markerList=[];
                  
                for(var i=0;i<data.length;i++){  
                    var title = data[i].name;
                    var marker = L.marker(new L.LatLng(data[i].latitude, data[i].longitude), {
                        icon: L.mapbox.marker.icon({'marker-symbol': 'cemetery', 'marker-color': '#484848'}),
                        title: title
                    });
                    marker.bindPopup(title);

                    cemetryMarkers.addLayer(marker);
                    markerList.push(marker);
                }

                for(var i=0;i<markerList.length;i++){
                  
                  markerList[i].on('click',function(e){
                    getCemeteryInfo(e.target.options.title);
                    getNearestHospital(e.target._latlng.lat,e.target._latlng.lng);
                    getNearestPolice(e.target._latlng.lat,e.target._latlng.lng);
                    getNearFood(e.target._latlng.lat,e.target._latlng.lng);
                    getNearBeverage(e.target._latlng.lat,e.target._latlng.lng);
                    getNearGrocery(e.target._latlng.lat,e.target._latlng.lng);

                    console.log(thisPlace);
                  });
                }
                map.addLayer(cemetryMarkers);
 
             }
   });
}



function addCanyonsMarker(){

     $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/delphi/getCanyons',            
            success: function(data) {
                var markerList=[];
                  
                for(var i=0;i<data.length;i++){  
                    var title = data[i].name;
                    var marker = L.marker(new L.LatLng(data[i].latitude, data[i].longitude), {
                        icon: L.mapbox.marker.icon({
                          'marker-symbol': 'park',
                           'marker-color': '#2d862d',
                           'marker-size':'large'
                         }),
                        title: title
                    });
                    marker.bindPopup(title);

                    parkMarkers.addLayer(marker);
                    markerList.push(marker);
                }

                for(var i=0;i<markerList.length;i++){
                  
                  markerList[i].on('click',function(e){
                    getParkInfo(e.target.options.title);
                    getNearestHospital(e.target._latlng.lat,e.target._latlng.lng);
                    getNearestPolice(e.target._latlng.lat,e.target._latlng.lng);
                  });
                }
                map.addLayer(parkMarkers);

             }
   });
}




//geolocation find user location 
function findme(){
    map.locate({setView : true,               
              maxBounds: bounds,
              maxZoom: 19,
              minZoom: 10});
    var geolocate = document.getElementById('geolocate');
 

    var myLayer = L.mapbox.featureLayer().addTo(map);

    if (!navigator.geolocation) {
        geolocate.innerHTML = 'Geolocation is not available';
    } else {

        geolocate.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            map.locate();
        };
    }

    map.on('locationfound', function(e) {
      console.log("in findme")
        map.fitBounds(e.bounds);

        myLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Here I am!',
                'marker-color': '#ff8888',
                'marker-symbol': 'star'
            }
        });

    });
    map.on('locationerror', function() {
        console.log("err");
        geolocate.innerHTML = 'Position could not be found';
    });
}

function enableCheckBox(){
  document.getElementById("beverage").disabled=false;
  document.getElementById("food").disabled=false;
  document.getElementById("grocery").disabled=false;
  document.getElementById("police").disabled=false;
  document.getElementById("hospital").disabled=false;
}

function disableCheckBox(){
  document.getElementById("beverage").disabled=true;
  document.getElementById("food").disabled=true;
  document.getElementById("grocery").disabled=true;
}

function getParkInfo(parkName){

  if(thisPlace.has==true){
  reset();
  }
  var data={};
  data.parkName=parkName;
  
   
   $.ajax({
            type: 'POST',
            dataType: 'json',
            data:JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/getParkInfo',            
            success: function(dataRes) {
                  
                  document.getElementById("currplace").innerHTML=dataRes.name;
                  document.getElementById("parkImg").src=dataRes.img;
                  enableCheckBox();
                  thisPlace=dataRes;
                  thisPlace.has=true;
            
             }
   });
  
}

function getCemeteryInfo(name){

  if(thisPlace.has==true){
    reset();
  }
  var data={};
  data.cemeteryName=name

   $.ajax({
            type: 'POST',
           
            dataType: 'json',
            data:JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/getCemeteryInfo',            
            success: function(dataRes) {
                 
                  document.getElementById("currplace").innerHTML=dataRes.name;
                  document.getElementById("parkImg").src=dataRes.img;
                  enableCheckBox();
                  thisPlace=dataRes;
                   thisPlace.has=true;
             }
   });  
  
}

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
            success: function(dataRes) {
              if(dataRes){
                    results.name=dataRes.nearest.OWNNAM1;
                    results.distance=dataRes.nearest.dis;
                    results.avg=dataRes.avgDis.avg;
                    var hospitalName=document.getElementById("nearestHospital");
                    hospitalName.innerHTML=results.name+" "+Math.round(results.distance * 100) / 100;
                    thisPlace.hospital={name:results.name,lat:dataRes.nearest.st_x,lng:dataRes.nearest.st_y};
              }else{
                alert("Sorry,we failed to retrieve data from database,please retry");
              }
                          
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
              if(data){
                    results.name=data.nearest.FACILITY;
                    results.lat=data.nearest.st_x;
                    results.lng=data.nearest.st_y;
                    results.distance=data.nearest.dis;
                    results.avg=data.avgDis.avg;
                   
                    var hospitalName=document.getElementById("nearestPolice");
                    hospitalName.innerHTML=results.name+"Distance:"+Math.round(results.distance * 100) / 100;

                    thisPlace.police={name:results.name,lat:results.lat,lng:results.lng};
              }else{
                    alert("Sorry,we failed to retrieve data from database,please retry");
              }
                    

             }
          
   });
   
  }

function showPolice(){

    if(thisPlace.has==true){
       policeMarker=L.mapbox.featureLayer({

          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [
                thisPlace.police.lat,
                thisPlace.police.lng 
              ]
          },
          properties: {
              title: thisPlace.police.name,
              'marker-size': 'large',
              'marker-color': '#003399',
              'marker-symbol': 'police'
          
      }
      });
      policeMarker.addTo(map);
      thisPlace.showPoliceMarker=true;
  }
  document.getElementById("police").innerHTML="Hide it";
}

function showClinic(){

    if(thisPlace.has==true){  
       hospitalMarker=L.mapbox.featureLayer({

          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [
                thisPlace.hospital.lat,
                thisPlace.hospital.lng 
              ]
          },
          properties: {
              title: thisPlace.hospital.name,
              'marker-size': 'large',
              'marker-color': '#b30000',
              'marker-symbol': 'hospital'
          }
      });
      hospitalMarker.addTo(map);
      thisPlace.showHospitalMarker=true;
  }

}



function getNearFood(lat,lng){

  
  var data={lat:lat,lng:lng};
  var results=[];
    $.ajax({
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/delphi/food',            
                success: function(dataRes) {
                  if(dataRes){
                      if(dataRes.length>0){
                          for(var i=0;i<dataRes.length;i++){
                              results.push({name:dataRes[i].OWNNAM1,
                                            lat:dataRes[i].st_x,
                                            lng:dataRes[i].st_y
                                          });
                      }
                          thisPlace.food=results;
                         
                   
                      }else{
                        
                        thisPlace.food=false;
                      }

                  }else{
                      alert("Sorry,we failed to retrieve data from database,please retry");
                  }
                                }
       });
    
  
}
function getNearBeverage(lat,lng){

  
  var data={lat:lat,lng:lng};
  var results=[];
    $.ajax({
                type: 'POST',

                dataType: 'json',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/delphi/beverage',            
                success: function(dataRes) {
                  if(dataRes){
                        if(dataRes.length>0){
                            for(var i=0;i<dataRes.length;i++){
                                results.push({name:dataRes[i].OWNNAM1,
                                              lat:dataRes[i].st_x,
                                              lng:dataRes[i].st_y
                                            });
                            }     
                                  thisPlace.beverage=results;
                                
                           
                        }else{
                          
                          thisPlace.beverage=false;
                        }
                  }else{
                        alert("Sorry,we failed to retrieve data from database,please retry");
                  }
                  
              }
       });
  
  
}

function getNearGrocery(lat,lng){
 
  var data={lat:lat,lng:lng};
  var results=[];
    $.ajax({
                type: 'POST',
              
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:3000/delphi/grocery',            
                success: function(dataRes) {
                  if(dataRes){
                    if(dataRes.length>0){
                        for(var i=0;i<dataRes.length;i++){
                          results.push({name:dataRes[i].OWNNAM1,
                                        lat:dataRes[i].st_x,
                                        lng:dataRes[i].st_y
                                      });
                         }

                            thisPlace.grocery=results;
                            
                    }else{
                       
                        thisPlace.grocery=false;
                    }
                  }else{
                     alert("Sorry,we failed to retrieve data from database,please retry");
                  }
                  
            }
       });

}


function addFoodMarker(){
    if(thisPlace.has==true){
      for(var i=0;i<thisPlace.food.length;i++){

          
          var marker = L.mapbox.featureLayer({

                          type: 'Feature',
                          geometry: {
                              type: 'Point',
                              coordinates: [
                                thisPlace.food[i].lat,
                                thisPlace.food[i].lng 
                              ]
                          },
                          properties: {
                              title: thisPlace.food[i].name,
                              'marker-size': 'medium',
                              'marker-color': '#ff9933',
                              'marker-symbol': 'ice-cream'
                          
                      }
                      });
         foodMarker.addLayer(marker); 

      }
      foodMarker.addTo(map);
      thisPlace.showFoodMarker=true;
    }
  
}

function addBeverageMarker(){
  if(thisPlace.has==true){
   for(var i=0;i<thisPlace.beverage.length;i++){
       var marker=L.mapbox.featureLayer({

          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [
                thisPlace.beverage[i].lat,
                thisPlace.beverage[i].lng 
              ]
          },
          properties: {
              title: thisPlace.beverage[i].name,
              'marker-size': 'medium',
              'marker-color': '#66ccff',
              'marker-symbol': 'bar'
          }
      });
       beverageMarker.addLayer(marker);
     }
      beverageMarker.addTo(map);
      thisPlace.showBeverageMarker=true;
    }
  
}

function addGroceryMarker(){
  if(thisPlace.has==true){
   for(var i=0;i<thisPlace.grocery.length;i++){
       var marker=L.mapbox.featureLayer({

          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [
                thisPlace.grocery[i].lat,
                thisPlace.grocery[i].lng 
              ]
          },
          properties: {
              title: thisPlace.grocery[i].name,
              'marker-size': 'medium',
              'marker-color': '#BE9A6B',
              'marker-symbol': 'grocery'
          }
      });
       groceryMarker.addLayer(marker);
      } 
      groceryMarker.addTo(map);
      thisPlace.showGroceryMarker=true;
  }
 
}

function reset(){

    document.getElementById("food").checked=false;
    document.getElementById("beverage").checked=false;
    document.getElementById("grocery").checked=false;
    document.getElementById("foodMsg").innerHTML="";
    document.getElementById("beverageMsg").innerHTML="";
    document.getElementById("groceryMsg").innerHTML="";

    if(thisPlace.showPoliceMarker==true){
    map.removeLayer(policeMarker);
    thisPlace.showPoliceMarker==false;
    }
    if(thisPlace.showHospitalMarker==true){
    map.removeLayer(hospitalMarker);
    thisPlace.showHospitalMarker==false;
    }
    if(thisPlace.showGroceryMarker==true){
      clearGrocery();
    }
    if(thisPlace.showBeverageMarker==true){
      clearBeverage();
    }
    if(thisPlace.showFoodMarker==true){
      clearFood();
    }

}
function clearCemetry(){
  reset();
  map.removeLayer(cemetryMarkers);
  cemetryMarkers.clearLayers();

}
function clearCanyons(){
  map.removeLayer(canyonsMarkers);
  canyonsMarkers.clearLayers();
}
function clearPark(){
  map.removeLayer(parkMarkers);
  parkMarkers.clearLayers();
}
function clearFood(){
  map.removeLayer(foodMarker);
  foodMarker.clearLayers();
 
  showFoodMarker=false;
}
function clearBeverage(){
  map.removeLayer(beverageMarker);
  beverageMarker.clearLayers();
  
  showBeverageMarker=false;
}
function clearGrocery(){
  map.removeLayer(groceryMarker);
  groceryMarker.clearLayers();
  
  showGroceryMarker=false;
}
function clearPolice(){
  map.removeLayer(policeMarker);
  showPoliceMarker=false;
  
}
function clearClinic(){
  map.removeLayer(hospitalMarker);
  showHospitalMarker=false;
  
}
 

function saveLocation(){
  //add all of the info to the statspage 

  if(thisPlace.food&&thisPlace.beverage&&thisPlace.grocery){
    if(thisPlace.food)
  var parentNode=document.getElementById("savedPlaces");
  var newDiv=document.createElement("div");
      var nameSpan=document.createElement("span");
          nameSpan.id=thisPlace.name;
          nameSpan.innerHTML=thisPlace.name;
      var img=document.createElement("img");
          img.src=thisPlace.img;
          img.style="width:20px;height:20px;"
      newDiv.appendChild(nameSpan);
      newDiv.appendChild(img);
  parentNode.appendChild(newDiv);
  
  if(saveCount==0){
       chart= c3.generate({
                data: {
                    columns: [
                        [thisPlace.name,thisPlace.food.length,thisPlace.beverage.length,thisPlace.grocery.length ]
                    ],
                    type: 'bar'
                },
                bar: {
                    width: {
                        ratio: 0.5 // this makes bar width 50% of length between ticks
                    }
                }
      });
      saveCount++;
  }else{
    chart.load({
        columns: [
           [thisPlace.name,thisPlace.food.length,thisPlace.beverage.length,thisPlace.grocery.length ]
        ]
    });
  }
  }else{
    alert("Please select all of the check box before saving this location");
  }
}


