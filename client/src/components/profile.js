
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./navbar";
import Cookies from 'universal-cookie';

import axios from 'axios';

import React, { Component } from "react";
import {Container , Row , Col  , Button , Form} from 'react-bootstrap'


import Profile from "./profile";

import "./CSS/profile.css"
import AddressesList from "./AddressesList";
import ProffileButtons from "./ProffileButtons";
import AddAddress from "./AddAddress";
import AddProject from "./AddProject";
import AddFilament from "./AddFilament";
import AddPrinter from "./AddPrinter";
import ProfileInfo from "./ProfileInfo";


const cookies = new Cookies();

  let user = cookies.get('user');


  
export default class profile  extends Component {
    
    
    render(){          
        return (
        
            <div style={{backgroundColor:"#F7F7F7"}} >
                <Navbar/>
                <div>
                    
                    <br/>
                    <div>
                        

                    </div>
                    
                    <div style={{ marginLeft:"-20px" }}>
                        <ProfileInfo/>
                        

                    </div>
                    <br/>
                    <div style={{marginLeft:"18%"}}>
                        <br/>
                        <ProffileButtons/>
                        <Container style={{ marginLeft:"8%" ,width:"61%"}}>
                            <Row>
                                <Col lg={3} md={6}>
                                    <AddAddress/>
                                </Col>
                                
                                <Col lg={3} md={6}>
                                    <AddProject/>
                                </Col>

                                <Col lg={3} md={6}>
                                    <AddPrinter/>
                                </Col>
                                
                                <Col lg={3} md={6}>
                                    <AddFilament/>
                                </Col >
                            </Row>
                        </Container>
                        
                        <AddressesList/>

                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                
            </div>
        )
    }
};