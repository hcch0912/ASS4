
function oncheck(element){
  element.checked=element.checked;
  if(element.checked==true){
      switch (element.name){
        case  "park"
          getPark();
          break;
        case "cemeteries"
          getCemetry();
          break;
        case "canyons"
          getCanyons();
          break;
        default:
          break;
      }
  }else{
      switch (element.name){
        case  "park"
          clearPark();
          break;
        case "cemeteries"
          clearCemetry();
          break;
        case "canyons"
          clearCanyons();
          break;
        default:
          break;
      }
  }

}






function getPark(){
    $.ajax({
            ype: 'GET',
            url: 'http://localhost:3000/getPark',            
            success: function(data) {
               
            
             }
    });
}

function getCemetry(){
     $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/delphi/getCemetry',            
            success: function(data) {
               console.log(data+data.DISTRICT+data.x+data.y);
            
             }
   });
}


function getCanyons(){
     $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/delphi/getCanyons',            
            success: function(data) {
               console.log(data+data.DISTRICT+data.x+data.y);
            
             }
   });
}


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

s