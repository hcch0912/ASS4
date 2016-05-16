
// get user input 
function useData(inputlocation){
  var results="success";
  console.log(inputlocation+"here in public js");

 d3.json("/delphidata/"+inputlocation, function(err, resData) {
  console.log(resData.parks[0]);

  return results;

});
}








































