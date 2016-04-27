
(function(d3) {
  "use strict";

d3.json("/delphidata", function(err, resData) {//resData is Array with 42 json element


//all
var dataset=[];

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
  //from light to dark
var color=["#e6f5ff","#99d6ff","#4db8ff","#006bb3","#0030cc","#001866"]; 
var colorAreaArr=[];
for(var i=0;i<dataset.length;i++){
    var thisColor;
    var max;//the majority interval 
    var tempArr=[];
    for(var j=0;j<6;j++){ 
        tempArr[j]=dataset[i].Data[j].number;  
    };
    max=Math.max(...tempArr);
    for(var j=0;j<6;j++){ 
        if(dataset[i].Data[j].number==max){
          thisColor=color[j];
        };  
    };
    colorAreaArr.push({"Area":dataset[i].Area,"Color":thisColor});
};


//choose area
var chooseArea=function(area,result){
      for(var i=0;i<dataset.length;i++){
        if(area==dataset[i].Area){
          result=dataset[i].Data;
        }
      }
      return result;
};


var width = 960,
    height = 500,
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

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



  var g = svg.selectAll(".arc")
      .data(pie(dataset[0].Data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d,i) { return color(i%d.data.number); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) {return d.data.price; });

  // var text=document.getElementById("h1");
  //   text.innerHTML=d.


function type(d) {
  d.number = +d.number;
  return d;
}


});

})(d3);



