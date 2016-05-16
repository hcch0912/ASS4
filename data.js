var dotenv = require('dotenv');
var pg = require('pg');
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;


var getData = module.exports.getData = function (req, res) {

 	var results=[];
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        //Query Park data
        var selectParkQuery="Select name_full from sandag_parks_cntyandcity_prj"
        var queryPark = client.query(selectParkQuery);

        queryPark.on('row', function(row) {
            results.push(row);
        });
        console.log(results[0]);
        queryPark.on('end', function() {
            done();
            return res.json(results);
        });

        //query 

    });
  return { delphidata: "No data present." }
}