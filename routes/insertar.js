var express = require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;
var url = "mongodb://localhost:27017";
var dbnom = "AppMusica";

// Per defecte es mostra la llista d'elements
router.get('/',function(req,res,next){
	res.redirect('/canciones');
});


// FIND
router.get('/canciones', function(req,res,next) {

  /*
  MongoClient.connect(url, function(err,db){
  	if (err) throw err;
  	var dbo = db.db(dbnom);

  	dbo.collection("canciones").find({}).toArray(function(err, result){
  		if (err) throw err;  
  		db.close();
        // enviem amb format Json  el resultat anomenat "videos_llista" a l'index.ejs
  		res.render('index', {canciones_llista: result});
  	});
  });
  */
});



module.exports = router;