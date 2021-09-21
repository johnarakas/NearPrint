
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const printers = express.Router();

const dbo = require("../db/conn");


    printers.route("/printers/addFilament").post(function (req, res) {
        let db_connect = dbo.getDb("printers");
        
        let obj = {

            username: req.body.username,
            material: req.body.material,
            color: req.body.color,
            
        };

        db_connect.collection("filament").insertOne(obj, function (err, res) {

            if (err) throw err;   

        });
    });

    printers.route("/printers/addPrinter").post(function (req, res) {
        let db_connect = dbo.getDb("printers");
        
        let obj = {

            username: req.body.username,
            model: req.body.model,
            nozzle: req.body.nozzle,
            
        };

        db_connect.collection("printer").insertOne(obj, function (err, res) {

            if (err) throw err;   

        });
    });


    printers.route("/printers/getFilaments").post(function (req, res) {
        let db_connect = dbo.getDb("printers");
        
        
        
        db_connect
        .collection("filament")
        .find({username: req.body.username } )
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

    printers.route("/printers/getPrinters").post(function (req, res) {
        let db_connect = dbo.getDb("printers");
        
        
        db_connect
        .collection("printer")
        .find({username: req.body.username } )
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });
module.exports = printers