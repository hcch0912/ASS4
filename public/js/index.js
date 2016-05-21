
// get user input 
function useData(inputlocation){
  var results="success";
  

 d3.json("/delphidata/park/"+inputlocation, function(err, resData) {

console.log("hello1");
  if(resData){
    for(var i=0;i<resData.length;i++){
        console.log(resData[i]);
    }
 
 }else{
  console.log("nono");
 }

  return results;

});


}

//  d3.json("/delphidata/population/"+inputlocation, function(err, resData) {

// console.log("hello2");
//   if(resData){
//   console.log(resData);
//  }else{
//   console.log("nono");
//  }

//   return results;

// });


//  d3.json("/delphidata/police/"+inputlocation, function(err, resData) {

// console.log("hello3");
//   if(resData){
//   console.log(resData);
//  }else{
//   console.log("nono");
//  }

//   return results;

// });
// }





































