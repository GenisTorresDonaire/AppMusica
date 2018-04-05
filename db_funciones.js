var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID; // objecte necessari pel find_peli_id

var url = "mongodb://localhost:27017/";

var listado_canciones = function(dbo){
   
  dbo.collection("canciones").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    
  });
  console.log("a) Fet!"); console.log("");
  
}