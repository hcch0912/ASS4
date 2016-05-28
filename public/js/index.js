var map;




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
                    getNearestPolice(e.target._latlng.lat,e.target._latlng.lng);
                  });
                }
                map.addLayer(parkMarkers);
             }
    });
}



function clearPark(){
        map.removeLayer(parkMarkers);

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
                    getNearestPolice(e.target._latlng.lat,e.target._latlng.lng);
                  });
                }
                map.addLayer(parkMarkers);
            
             }
   });
}

function clearCemetry(){
  map.removeLayer(cemetryMarkers);
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
                    getNearestPolice(e.target._latlng.lat,e.target._latlng.lng);
                  });
                }
                map.addLayer(parkMarkers);
            
             }
   });
}

function clearCanyons(){
  map.removeLayer(canyonsMarkers);
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
                    thisPlace.hospital={name:results.name,lat:data.nearest.st_x,lng:data.nearest.st_y};      
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
                    results.lat=data.nearest.st_x;
                    results.lng=data.nearest.st_y;
                    results.distance=data.nearest.dis;
                    results.avg=data.avgDis.avg;
                   
                    var hospitalName=document.getElementById("nearestPolice");
                    hospitalName.innerHTML=results.name+" "+Math.round(results.distance * 100) / 100;
                    thisPlace.police={name:results.name,lat:results.lat,lng:results.lng};

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
              'marker-color': '#BE9A6B',
              'marker-symbol': 'police'
          
      }
      });
      policeMarker.addTo(map);
      thisPlace.showPoliceMarker=true;
  }
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
              'marker-color': '#BE9A6B',
              'marker-symbol': 'hospital'
          }
      });
      hospitalMarker.addTo(map);
      thisPlace.showPoliceMarker=true;
  }
}


function getParkInfo(parkName){

  if(thisPlace.showPoliceMarker==true||thisPlace.showHospitalMarker==true){
    map.removeLayer(policeMarker);
    thisPlace.showPoliceMarker==false;
    map.removeLayer(hospitalMarker);
    thisPlace.showHospitalMarker==false;
    
  }
  var data={};
  data.parkName=parkName;
   var results={};
   
   $.ajax({
            type: 'POST',
            dataType: 'json',
            data:JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/getParkInfo',            
            success: function(data) {
                  document.getElementById("currplace").innerHTML=data.name;
                  document.getElementById("parkImg").src=data.img;
                  thisPlace=data;
                  thisPlace.isTarget=true;

            
             }
   });
}






/*
// get user input 
function useData(inputlocation){
  var results="success";
  

 d3.json("/delphidata/park/"+inputlocation, function(err, resData) {

console.log("hello1");
  if(resData){
  console.log(resData);
 }else{
  console.log("nono");
 }

  return results;

});


 d3.json("/delphidata/hospital/"+inputlocation, function(err, resData) {

console.log("hello3");
  if(resData){
  console.log(resData);
 }else{
  console.log("nono");
 }

  return results;

});
}




 d3.json("/delphidata/population/"+inputlocation, function(err, resData) {

console.log("hello2");
  if(resData){
  console.log(resData);
 }else{
  console.log("nono");
 }

  return results;

});


 d3.json("/delphidata/police/"+inputlocation, function(err, resData) {

console.log("hello3");
  if(resData){
  console.log(resData);
 }else{
  console.log("nono");
 }

  return results;

});
}


var map;

$(document).ready(function() {

  //initMap();
  $("button").click(function() {
        console.log(this.value);
        $('.chart').empty();
        renderPie(this.value);
    });

  $('li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('li').removeClass('curr-tab');
    $('.tab-content').removeClass('current');

    $(this).addClass('curr-tab');
    $("#"+tab_id).addClass('current');
  });

  $('.list').click(function(){
    var name = $(this).text();
    console.log(name);
    
    renderPie("Carlsbad");
    $('#current-title').html(name);
    $( ".tab-link" ).trigger( "click" );
  });
});

//   function clearPir(){
//       d3.selectAll().remove();
//   };

//  function  renderPie(areaName) {
//   "use strict";
//   $('.chart').empty();
//   document.getElementById('city').innerHTML = areaName;
//  d3.json("/delphidata", function(err, resData) {
//  var dataset=[];
//  var thisArea;
//     for(var i=0;i<resData.length;i++){
//           var data=[]; 
    
//           data[0]={"price":"Rent <$700","number":resData[i]['Rent <$500']+resData[i]['Rent $500-$599']+resData[i]['Rent $600-$699']}; 
//           data[1]={"price":"Rent $700-$1K","number":resData[i]['Rent $700-$799']+resData[i]['Rent $800-$899']+resData[i]['Rent $900-$999']};
//           data[2]={"price":"Rent $1-$1.3K","number":resData[i]['Rent $1-$1.3K']};
//           data[3]={"price":"Rent $1.3-$1.5K","number":resData[i]['Rent $1.3-$1.5K']};
//           data[4]={"price":"Rent $1.5-$2K","number":resData[i]['Rent $1.5-$2K']};
//           data[5]={"price":"Rent $2K+","number":resData[i]['Rent $2K+']};
//           var ajson={"Area":resData[i].Area,"Data":data};
//           dataset.push(ajson);
//     };
         
//     for(var i=0;i<dataset.length;i++){
//       if(dataset[i].Area==areaName){
//         console.log("success "+areaName);
//         thisArea=dataset[i];
//       }
//     };
// console.log(thisArea.Area);

//   var width = 300,
//       height = 330,
//       radius = Math.min(width, height) / 2;

//   var color = d3.scale.category20();

//   var arc = d3.svg.arc()
//       .outerRadius(radius - 10)
//       .innerRadius(0);

//   var labelArc = d3.svg.arc()
//       .outerRadius(radius - 40)
//       .innerRadius(radius - 40);

//   var pie = d3.layout.pie()
//       .sort(null)
//       .value(function(d) { return d.number; });

//   var svg = d3.select(".chart").append("svg")
//       .attr("width", width)
//       .attr("height", height)
//     .append("g")
//       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



//     var g = svg.selectAll(".arc")
//         .data(pie(thisArea.Data))
//         .enter().append("g")
//         .attr("class", "arc");

//     g.append("path")
//         .attr("d", arc)
//         .style("fill", function(d,i) { return color(i%d.data.number); });

//     g.append("text")
//         .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
//         .attr("dy", ".25em")
//         .attr("font-size","15px")
//         .attr("z-index","100")
//         .text(function(d) {return d.data.price; });

//     // var text=document.getElementById("h1");
//     //   text.innerHTML=d.


//   function type(d) {
//     d.number = +d.number;
//     return d;
//   }
// });
// }









































*/
