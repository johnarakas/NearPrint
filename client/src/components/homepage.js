
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import {Card, Button , Container , Row , Col}  from 'react-bootstrap'
import Navbar from "./navbar";
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
            <Container style={{marginTop:"20px"}}>
              <Row>

                <Col >
                  <div>
                    <button onClick={()=>alert("hy")} style={{border:"none", paddingInline:"0px" }}> 
                    <Card style={{ width: '18rem' }}>
                      <div style={{height:"160px" ,width:"auto" ,backgroundColor:"darkgrey" }}></div>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        
                      </Card.Body>
                    </Card>
                    </button>
                  </div>  
                </Col>
                
                <Col >
                  <div>
                    <Card style={{ width: '18rem' }}>
                      <div style={{height:"160px" ,width:"auto" ,backgroundColor:"darkgrey" }}></div>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        
                      </Card.Body>
                    </Card>
                  </div>  
                </Col><Col >
                  <div>
                    <Card style={{ width: '18rem' }}>
                      <div style={{height:"160px" ,width:"auto" ,backgroundColor:"darkgrey" }}></div>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        
                      </Card.Body>
                    </Card>
                  </div>  
                </Col><Col >
                  <div>
                    <Card style={{ width: '18rem' }}>
                      <div style={{height:"160px" ,width:"auto" ,backgroundColor:"darkgrey" }}></div>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        
                      </Card.Body>
                    </Card>
                  </div>  
                </Col>
                <Col >
                  <div>
                    <Card style={{ width: '18rem' }}>
                      <div style={{height:"160px" ,width:"auto" ,backgroundColor:"darkgrey" }}></div>
                      <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and make up the bulk of
                          the card's content.
                        </Card.Text>
                        
                      </Card.Body>
                    </Card>
                  </div>  
                </Col>
              </Row>
            </Container>
            </div>
          
          </div>
         
        );
    }
  };
  