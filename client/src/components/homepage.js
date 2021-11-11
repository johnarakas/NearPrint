
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import {Card, Button , Container , Row , Col}  from 'react-bootstrap'
import Navbar from "./navbar";
import Map from "./map"
import Cookies from 'universal-cookie';
import { Component } from "react";
const cookies = new Cookies();

// // We import NavLink to utilize the react router.


// import React, { Component } from "react";
// // This will require to npm install axios
// import axios from 'axios';
// import { NavLink } from "react-router-dom";




export default class Homepage extends Component {

    
    render(){

          
        
        return (
          <div style={{backgroundColor:"#F7F7F7"}}>
            <Navbar/>
            <div>
              <Map/>
            <Container style={{marginTop:"20px"}}>
              
            </Container>
            </div>
          
          </div>
         
        );
    }
  };
  