
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const projects = express.Router();


//This will help us connect to the database
    const dbo = require("../db/conn");

    projects.route("/projects").get(function (req, res) {
        let db_connect = dbo.getDb("project");
        db_connect
        .collection("projects")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

    projects.route("/MyProjects").post(function (req, res) {
        let db_connect = dbo.getDb("project");

        let obj = { username : req.body.username}
        db_connect
        .collection("projects")
        .find(obj)
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

    projects.route("/projects/add").post(function (req, res) {
        let db_connect = dbo.getDb("project");
        
        let obj = {
    
            username: req.body.username,
            name: req.body.name,
            info: req.body.info,

            requirements: req.body.requirements,
            price: req.body.price,

            images: req.body.images,
            files: req.body.files,
            email: req.body.email,
            phone: req.body.phone,

            
            country : req.body.country  ,
            city : req.body.city,
            street : req.body.street,
            
            x : req.body.x,
            y : req.body.y,
        
        };

        db_connect.collection("projects").insertOne(obj, function (err, res) {

            if (err) throw err;   
    
        });
    });
module.exports = projects;