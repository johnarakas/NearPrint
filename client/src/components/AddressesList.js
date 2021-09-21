
import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

import Cookies from 'universal-cookie';

import Navbar from "./navbar";



import "./CSS/location.css"

import {Card, Button , Container , Row  }  from 'react-bootstrap'

import Popup from 'reactjs-popup';



const cookies = new Cookies();

export default class AddressesList  extends Component {

    

    constructor(props) {
        super(props);
        
    
        this.state = {
            locations:[],
          
        };
      }
    
      

    // This function will handle the submission.
    

      componentDidMount(){
        

        let user = cookies.get('user')
        // alert
        let obj= {
          username: user.username
        }
        axios
        .post("http://localhost:3000/locations/getUserLocations",obj)
        .then((response) => {
          
          this.setState({ locations: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    DivLocations(){
      
        return this.state.locations.map((loc) => {
            
            return(
                <div>

                    <Card style={{ width: '68%', textAlign:"left", marginTop:'2%' }}>
                    <Card.Body>
                        <Card.Title>
                        {loc.street +"  "+loc.streetnumber}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{ loc.city+" , "+ loc.country}</Card.Subtitle>
                        
                        
                    </Card.Body>
                    </Card>
                </div>

              
            );
          });
      
    };

    
    

    render(){          
        return (
          
            <div style={{backgroundColor:"#F7F7F7"}}>
              
                   
                   <div> 
                          
                       
                    <br/>
                    <div >
                      <Container>
                          
                        <h2>Addresses</h2>
                        <Row>
                            
                            {this.DivLocations()}
                                
                        </Row>
                      </Container>
                    
                    </div>
                    <div>                    
                  </div>
                </div>
          </div>
            
        );
        
          
    }
  };
  