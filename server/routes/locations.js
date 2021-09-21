
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const locations = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

//This will help us connect to the database
const dbo = require("../db/conn");

  locations.route("/locations/add").post(function (req, res) {
    let db_connect = dbo.getDb("users");

    let obj = {
        username : req.body.username,
        url: req.body.url,
        print: req.body.print,
        printer: req.body.printer,
        country : req.body.country  ,
        city : req.body.city,
        street : req.body.street,
        streetnumber : req.body.streetnumber,
        x : req.body.x,
        y : req.body.y,

   
    
    };
    console.log(obj)
            
    db_connect.collection("locations").insertOne(obj, function (err, res) {
        
    if (err) throw err;
    });
  });

    locations.route("/locations/getLocations").post(function (req, res) {
      let db_connect = dbo.getDb("users");
      
      
      db_connect
      .collection("locations")
      .find({} )
      .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
      });
    });
    
    locations.route("/locations/getUserLocations").post(function (req, res) {
      let db_connect = dbo.getDb("users");
      
      let username =req.body.username
      
      db_connect
      .collection("locations")
      .find({username:username} )
      .toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
      });
    });

    // locations.route("/locations/getUserLocations").post(function (req, res) {
    //     let db_connect = dbo.getDb("users");
    //     let username = req.body.username
    
    //     db_connect
    //     .collection("locations")
    //     .find({} )
    //     .toArray(function (err, result) {
    //         if (err) throw err;
    //         res.json(result);
    //     });
            
    // });

    locations.route("/locations/getLocationFromStreet").post(function (req, res) {
      let db_connect = dbo.getDb("users");
      let street = req.body.street
  
      db_connect
      .collection("locations")
      .findOne({street:street} )
      .then( location => {
        return res.json(location);
      });
          
  });
module.exports = locations;