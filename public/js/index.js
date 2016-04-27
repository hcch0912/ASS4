var map;

$(document).ready(function() {

  initMap();

  $('li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('li').removeClass('curr-tab');
    $('.tab-content').removeClass('current');

    $(this).addClass('curr-tab');
    $("#"+tab_id).addClass('current');
  })
});

/*function initMap() {
  map = new google.maps.Map(document.getElementById('jsmap'), {
    center: {lat: 32.842674, lng: -117.157767},
    zoom: 11
  });
  console.log("aaa");

  // place markers on the map
  for(i in location) {
    console.log(location[i].name);
  }

};*/

(function(d3) {
  "use strict";

  var datas = {
    "labels": [],
    "series": [
      {
        "labels": [],
        "values": []
      },
      {
        "labels": [],
        "values": []
      },
      {
        "labels": [],
        "values": []
      }                        
    ]
  };

d3.json("/delphidata", function(err, data) {

    if (err) {
      console.log(err);
      return;
    }

    var areaArr=[];
    var priceArr1=[[],[],[]];
    for(var i=0;i<data.length;i++){
      areaArr[i]=data[i].Area;
      
        priceArr1[0][i]=data[i]['Rent <$500'];
        priceArr1[1][i]=data[i]['Rent $1-$1.3K'];
        priceArr1[2][i]=data[i]['Rent $2K+'];
      
    }
   datas.labels=areaArr;
   datas.series.labels=["Rent <$500","Rent $1-1.3K","Rent $2K+"];
   datas.series[0].values=priceArr1[0];
   datas.series[1].values=priceArr1[1];
   datas.series[2].values=priceArr1[2];

var dataSeriesSize=3;

var chartWidth       = 300,
    barHeight        = 20,
    groupHeight      = barHeight * dataSeriesSize,
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<datas.labels.length; i++) {
  for (var j=0; j<dataSeriesSize; j++) {
    zippedData.push(datas.series[j].values[i]);
  }
}

// Color scale
var color = d3.scale.category20();
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * datas.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scale.linear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/dataSeriesSize))) + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return color(i % dataSeriesSize); })
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % dataSeriesSize === 0)
        return datas.labels[Math.floor(i/dataSeriesSize)];
      else
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(datas.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function (d, i) { return color(i); })
    .style('stroke', function (d, i) { return color(i); });

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });
   
 });


})(d3);











































