
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const users = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

//This will help us connect to the database
const dbo = require("../db/conn");
const { ObjectId } = require("bson");

  users.route("/users/getUsers").get(function (req, res) {
    let db_connect = dbo.getDb("users");
    let id = req.body.id
   
    db_connect
      .collection("accounts")
      .find({} )
      .toArray(function (err, result) {
        console.log(result)
        if (err) throw err;
        res.json(result);
      });
  });

  users.route("/users/login").post(function (req, res) {
    let db_connect = dbo.getDb("users");
    let username = req.body.username
    let password = req.body.password
   
    db_connect
      .collection("accounts")
      .findOne({username : username } )
      .then(user=>{
        if(user !== undefined){

          bcrypt.compare(password, user.password, function(err, result) {
              console.log(result)
              
            return res.status(200).json(user);
          });
          
        }else{
          return res.status(404).json({msg:"username or password are incorect", flag:0});
        }
      })
      
  });
// This section will help you create a new record.
users.route("/users/signup").post(function (req, res) {
  let db_connect = dbo.getDb("users");
  console.log("creating a user")
  let obj = {

        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        imageUrl:"",
        info:"",
        printer:false,
        print:false,
        designer:false,
        design:false

  };
  console.log(obj)
  bcrypt.hash(obj.password, saltRounds, function(err, hash) {
      obj.password = hash
      db_connect.collection("accounts").insertOne(obj, function (err, res) {
        
        if (err) throw err;

      })
  });
 
});

  users.route("/users/print").post( async function (req, res) {
    let db_connect = dbo.getDb("users");
    let id = { id: req.body.id };
    
    let newvalues = {
      $set: {
        
        username: req.body.username,
        printer:req.body.printer,
        print:req.body.print
    
      },
    };

    var _id=  req.body.id 
    console.log(_id)
    console.log(newvalues)
    
    try{
      var result =   await  db_connect.collection("accounts").updateOne({username:   req.body.username }, newvalues)
      console.log(result)
      console.log(req.body.id)
    }catch(e){
      console.log(e)
    }
        
      
  });

// This section will help you update a record by id.
  users.route("/users/update").post( async function (req, res) {
    let db_connect = dbo.getDb("users");
    let id = { id: req.body.id };
    
    let newvalues = {
      $set: {
        
        username: req.body.username,
        email: req.body.email,
        // password: req.body.password,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        info: req.body.info,

        printer:false,
        print:false,
        designer:false,
        design:false
    
      },
    };

    var _id=  req.body.id 
    console.log(_id)
    console.log(newvalues)
    
    try{
      var result =   await  db_connect.collection("accounts").updateOne({username:   req.body.username }, newvalues)
      console.log(result)
      console.log(req.body.id)
    }catch(e){
      console.log(e)
    }
        
      
  });
module.exports = users;