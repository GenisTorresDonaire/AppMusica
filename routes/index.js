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
  
});


// DELETE
router.get('/canciones/eliminar/:id', function(req,res,next) {

  MongoClient.connect(url, function(err,db){
  	if (err) throw err;
  	var dbo = db.db(dbnom);

  	var objId = new ObjectId(req.params.id);

  	dbo.collection("canciones").remove( {"_id" : objId} );
  	console.log(objId);
  	
  	res.redirect('/canciones');
  	db.close();
  });
  
});


// EDIT FORMULARIO
router.get('/canciones/editar/:id', function(req, res, next) {
  MongoClient.connect(url, function(err,db){
    if (err) throw err;
    var dbo = db.db(dbnom);
    
    var objId = new ObjectId(req.params.id);

    dbo.collection('canciones').find({ "_id" : objId }).toArray(function(err, result){
      if (err) throw err;  
      db.close();
      
      res.render('editar', {canciones_llista: result});
    });
  });
});


// EDIT 
router.post('/canciones/editar', function(req,res,next) {
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbnom);

    // Alternativament : 
    var objId = new ObjectId(req.body.id);
    var cancion_obj = { $set : {titulo: req.body.titulo, autor: req.body.cantante, año: parseInt(req.body.año)}};

    dbo.collection("canciones").updateOne( {"_id" : objId}, cancion_obj, function(err, result) {
      if (err) throw err;
      db.close();
      res.redirect('/canciones');
    });
  });
});


// INSERTAR VER FORMULARIO
router.get('/canciones/crear', function(req, res, next) {
  res.render('insertar');
});

// INSERTAR
router.post('/canciones/crear', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dbnom);

    // Alternativament : 
    var cancion_obj = {titulo: req.body.titulo, autor: req.body.cantante, año: parseInt(req.body.año)};
    console.log(cancion_obj);
    dbo.collection("canciones").insertOne(cancion_obj, function(err, result) {
      if (err) throw err;
      db.close();
      res.redirect('/canciones');
    });
  });
});

module.exports = router;