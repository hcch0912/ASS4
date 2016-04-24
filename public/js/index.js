(function(d3) {
  "use strict";

  var datas={};
d3.json("/delphidata", function(err, data) {

    if (err) {
      console.log(err);
      return;
    }

   
    datas={
    "labels": [
          data[0].Area, data[1].Area, data[2].Area, data[3].Area, data[4].Area, data[5].Area, data[6].Area, data[7].Area,
          data[8].Area, data[9].Area, data[10].Area,data[11].Area,data[12].Area,data[13].Area,data[14].Area,data[15].Area,
          data[16].Area,data[17].Area,data[18].Area,data[19].Area,data[20].Area,data[21].Area,data[22].Area,data[23].Area,
          data[24].Area,data[25].Area,data[26].Area,data[27].Area,data[28].Area,data[29].Area,data[30].Area,data[31].Area,
          data[32].Area,data[33].Area,data[34].Area,data[35].Area,data[36].Area,data[37].Area,data[38].Area,data[39].Area,
          data[40].Area,data[41].Area,data[42]
          ],
    "series": [
     {
      "label": 'Rent<$1000',
      "values":[

              data[0]['Rent <$500']+data[0]['Rent $500-$599']+data[0]['Rent $600-699'], data[1]['Rent <$500'] ,data[2]['Rent <$500'], data[3]['Rent <$500'],data[4]['Rent <$500'], data[5]['Rent <$500'], data[6]['Rent <$500'], data[7]['Rent <$500'],
              data[8]['Rent <$500'], data[9]['Rent <$500'] ,data[10]['Rent <$500'],data[11]['Rent <$500'],data[12]['Rent <$500'],data[13]['Rent <$500'],data[14]['Rent <$500'],data[15]['Rent <$500'],
              data[16]['Rent <$500'],data[17]['Rent <$500'],data[18]['Rent <$500'],data[19]['Rent <$500'],data[20]['Rent <$500'],data[21]['Rent <$500'],data[22]['Rent <$500'],data[23]['Rent <$500'],
              data[24]['Rent <$500'],data[25]['Rent <$500'],data[26]['Rent <$500'],data[27]['Rent <$500'],data[28]['Rent <$500'],data[29]['Rent <$500'],data[30]['Rent <$500'],data[31]['Rent <$500'],
              data[32]['Rent <$500'],data[33]['Rent <$500'],data[34]['Rent <$500'],data[35]['Rent <$500'],data[36]['Rent <$500'],data[37]['Rent <$500'],data[38]['Rent <$500'],data[39]['Rent <$500'],
              data[40]['Rent <$500'],data[41]['Rent <$500'],data[42]
              ]
      },
      {
      "label": 'Rent $1-$1.3K',
      "values": [
              data[0]['Rent $1-$1.3K'], data[1]['Rent $1-$1.3K'], data[2]['Rent $1-$1.3K'], data[3]['Rent $1-$1.3K'] ,data[4]['Rent $1-$1.3K'], data[5]['Rent $1-$1.3K'], data[6]['Rent $1-$1.3K'], data[7]['Rent $1-$1.3K'],
              data[8]['Rent $1-$1.3K'], data[9]['Rent $1-$1.3K'], data[10]['Rent $1-$1.3K'],data[11]['Rent $1-$1.3K'],data[12]['Rent $1-$1.3K'],data[13]['Rent $1-$1.3K'],data[14]['Rent $1-$1.3K'],data[15]['Rent $1-$1.3K'],
              data[16]['Rent $1-$1.3K'],data[17]['Rent $1-$1.3K'],data[18]['Rent $1-$1.3K'],data[19]['Rent $1-$1.3K'],data[20]['Rent $1-$1.3K'],data[21]['Rent $1-$1.3K'],data[22]['Rent $1-$1.3K'],data[23]['Rent $1-$1.3K'],
              data[24]['Rent $1-$1.3K'],data[25]['Rent $1-$1.3K'],data[26]['Rent $1-$1.3K'],data[27]['Rent $1-$1.3K'],data[28]['Rent $1-$1.3K'],data[29]['Rent $1-$1.3K'],data[30]['Rent $1-$1.3K'],data[31]['Rent $1-$1.3K'], 
              data[32]['Rent $1-$1.3K'],data[33]['Rent $1-$1.3K'],data[34]['Rent $1-$1.3K'],data[35]['Rent $1-$1.3K'],data[36]['Rent $1-$1.3K'],data[37]['Rent $1-$1.3K'],data[38]['Rent $1-$1.3K'],data[39]['Rent $1-$1.3K'],
              data[40]['Rent $1-$1.3K'],data[41]['Rent $1-$1.3K'],data[42]
              ]
      },
      {
      "label": 'Rent >2k',
      "values": [
              data[0]['Rent $2K+'], data[1]['Rent $2K+'], data[2]['Rent $2K+'], data[3]['Rent $2K+'] ,data[4]['Rent $2K+'], data[5]['Rent $2K+'], data[6]['Rent $2K+'], data[7]['Rent $2K+'],
              data[8]['Rent $2K+'], data[9]['Rent $2K+'], data[10]['Rent $2K+'],data[11]['Rent $2K+'],data[12]['Rent $2K+'],data[13]['Rent $2K+'],data[14]['Rent $2K+'],data[15]['Rent $2K+'],
              data[16]['Rent $2K+'],data[17]['Rent $2K+'],data[18]['Rent $2K+'],data[19]['Rent $2K+'],data[20]['Rent $2K+'],data[21]['Rent $2K+'],data[22]['Rent $2K+'],data[23]['Rent $2K+'],
              data[24]['Rent $2K+'],data[25]['Rent $2K+'],data[26]['Rent $2K+'],data[27]['Rent $2K+'],data[28]['Rent $2K+'],data[29]['Rent $2K+'],data[30]['Rent $2K+'],data[31]['Rent $2K+'], 
              data[32]['Rent $2K+'],data[33]['Rent $2K+'],data[34]['Rent $2K+'],data[35]['Rent $2K+'],data[36]['Rent $2K+'],data[37]['Rent $2K+'],data[38]['Rent $2K+'],data[39]['Rent $2K+'],
              data[40]['Rent $2K+'],data[41]['Rent $2K+'],data[42]
              ]
      }
    ]
  }

 
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



// (function(d3) {
//   "use strict";

// var data = {
//   labels: [
//     'resilience', 'maintainability', 'accessibility',
//     'uptime', 'functionality', 'impact'
//   ],
//   series: [
//     {
//       label: '2012',
//       values: [4, 8, 15, 16, 23, 42]
//     },
//     {
//       label: '2013',
//       values: [12, 43, 22, 11, 73, 25]
//     },
//     {
//       label: '2014',
//       values: [31, 28, 14, 8, 15, 21]
//     },]
// };

// var chartWidth       = 300,
//     barHeight        = 20,
//     groupHeight      = barHeight * data.series.length,
//     gapBetweenGroups = 10,
//     spaceForLabels   = 150,
//     spaceForLegend   = 150;

// // Zip the series data together (first values, second values, etc.)
// var zippedData = [];
// for (var i=0; i<data.labels.length; i++) {
//   for (var j=0; j<data.series.length; j++) {
//     zippedData.push(data.series[j].values[i]);
//   }
// }

// // Color scale
// var color = d3.scale.category20();
// var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

// var x = d3.scale.linear()
//     .domain([0, d3.max(zippedData)])
//     .range([0, chartWidth]);

// var y = d3.scale.linear()
//     .range([chartHeight + gapBetweenGroups, 0]);

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .tickFormat('')
//     .tickSize(0)
//     .orient("left");

// // Specify the chart area and dimensions
// var chart = d3.select(".chart")
//     .attr("width", spaceForLabels + chartWidth + spaceForLegend)
//     .attr("height", chartHeight);

// // Create bars
// var bar = chart.selectAll("g")
//     .data(zippedData)
//     .enter().append("g")
//     .attr("transform", function(d, i) {
//       return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
//     });

// // Create rectangles of the correct width
// bar.append("rect")
//     .attr("fill", function(d,i) { return color(i % data.series.length); })
//     .attr("class", "bar")
//     .attr("width", x)
//     .attr("height", barHeight - 1);

// // Add text label in bar
// bar.append("text")
//     .attr("x", function(d) { return x(d) - 3; })
//     .attr("y", barHeight / 2)
//     .attr("fill", "red")
//     .attr("dy", ".35em")
//     .text(function(d) { return d; });

// // Draw labels
// bar.append("text")
//     .attr("class", "label")
//     .attr("x", function(d) { return - 10; })
//     .attr("y", groupHeight / 2)
//     .attr("dy", ".35em")
//     .text(function(d,i) {
//       if (i % data.series.length === 0)
//         return data.labels[Math.floor(i/data.series.length)];
//       else
//         return ""});

// chart.append("g")
//       .attr("class", "y axis")
//       .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
//       .call(yAxis);

// // Draw legend
// var legendRectSize = 18,
//     legendSpacing  = 4;

// var legend = chart.selectAll('.legend')
//     .data(data.series)
//     .enter()
//     .append('g')
//     .attr('transform', function (d, i) {
//         var height = legendRectSize + legendSpacing;
//         var offset = -gapBetweenGroups/2;
//         var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
//         var vert = i * height - offset;
//         return 'translate(' + horz + ',' + vert + ')';
//     });

// legend.append('rect')
//     .attr('width', legendRectSize)
//     .attr('height', legendRectSize)
//     .style('fill', function (d, i) { return color(i); })
//     .style('stroke', function (d, i) { return color(i); });

// legend.append('text')
//     .attr('class', 'legend')
//     .attr('x', legendRectSize + legendSpacing)
//     .attr('y', legendRectSize - legendSpacing)
//     .text(function (d) { return d.label; });

//   // ASSIGNMENT PART 1B
//   // Grab the delphi data from the server
//    d3.json("/delphidata", function(err, data) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Data", data);
//   });

// })(d3);








































