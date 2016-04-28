
var map;

$(document).ready(function() {

  //initMap();
  $("button").click(function() {
        console.log(this.value);
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

  function clearPir(){
      d3.selectAll().remove();
  };

 function  renderPie(areaName) {
  "use strict";
  document.getElementById('city').innerHTML = areaName;
 d3.json("/delphidata", function(err, resData) {
 var dataset=[];
 var thisArea;
    for(var i=0;i<resData.length;i++){
          var data=[]; 
    
          data[0]={"price":"Rent <$700","number":resData[i]['Rent <$500']+resData[i]['Rent $500-$599']+resData[i]['Rent $600-$699']}; 
          data[1]={"price":"Rent $700-$1K","number":resData[i]['Rent $700-$799']+resData[i]['Rent $800-$899']+resData[i]['Rent $900-$999']};
          data[2]={"price":"Rent $1-$1.3K","number":resData[i]['Rent $1-$1.3K']};
          data[3]={"price":"Rent $1.3-$1.5K","number":resData[i]['Rent $1.3-$1.5K']};
          data[4]={"price":"Rent $1.5-$2K","number":resData[i]['Rent $1.5-$2K']};
          data[5]={"price":"Rent $2K+","number":resData[i]['Rent $2K+']};
          var ajson={"Area":resData[i].Area,"Data":data};
          dataset.push(ajson);
    };
         
    for(var i=0;i<dataset.length;i++){
      if(dataset[i].Area==areaName){
        console.log("success "+areaName);
        thisArea=dataset[i];
      }
    };
console.log(thisArea.Area);

  var width = 300,
      height = 330,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.category20();

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var labelArc = d3.svg.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.number; });

  var svg = d3.select(".chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



    var g = svg.selectAll(".arc")
        .data(pie(thisArea.Data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d,i) { return color(i%d.data.number); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".25em")
        .attr("font-size","15px")
        .attr("z-index","100")
        .text(function(d) {return d.data.price; });

    // var text=document.getElementById("h1");
    //   text.innerHTML=d.


  function type(d) {
    d.number = +d.number;
    return d;
  }
});
}









































