
import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

import Cookies from 'universal-cookie';

import Navbar from "./navbar";



import "./CSS/location.css"

import {Card, Button , Accordion, Container , Row, Col }  from 'react-bootstrap'

import Popup from 'reactjs-popup';



const cookies = new Cookies();

export default class Location  extends Component {

    

    constructor(props) {
        super(props);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeStreetNumber = this.onChangeStreetNumber.bind(this);
        this.onChangeX = this.onChangeX.bind(this);
        this.onChangeY = this.onChangeY.bind(this);
        this.TrackMe = this.TrackMe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    
        this.state = {
            country:"",
            city:"",
            street:"",
            streetnumber:"",
            x:"",
            y:"",
            locations:[],
          
        };
      }
    
      onChangeCountry(e) {
        this.setState({
          country: e.target.value,
        });
      }

      onChangeCity(e) {
        this.setState({
          city: e.target.value,
        });
      }

      // These methods will update the state properties.
      onChangeStreet(e) {
        this.setState({
          street: e.target.value,
        });
      }
      onChangeStreetNumber(e) {
        this.setState({
          streetnumber: e.target.value,
        });
      }
      onChangeX(e) {
        this.setState({
          x : e.target.value,
        });
      }
      onChangeY(e) {
        this.setState({
         y : e.target.value,
        });
      }
    // This function will handle the submission.
    

    onSubmit(e) {
        e.preventDefault();
        
        
        let user = cookies.get('user')

        let address = {
          username:user.username,
          country:this.state.country,
          city: this.state.city,
          street: this.state.street,
          streetnumber:this.state.streetnumber,
          x: this.state.x,
          y: this.state.y,
        }
        axios
        .post("http://localhost:3000/locations/add" ,address )
        .then((res) => {
          console.log(res.data)
          
          
        });
    
        // We will empty the state after posting the data to the database
        this.setState({
            country:"",
            city:"",
            street:"",
            streetnumber:"",
            x:"",
            y:"",
        });
      }
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
              <Card style={{ width: '50%', textAlign:"left", marginTop:'2%' }}>
              <Card.Body>
                <Card.Title>
                  {loc.street +"  "+loc.streetnumber}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ loc.city+" , "+ loc.country}</Card.Subtitle>
                
                
              </Card.Body>
            </Card>
              
            );
          });
      
    };

    
    AutoFillAddress(){
      
      axios
          .get(`https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${this.state.x}&lon=${this.state.y}&accept-language=en&zoom=18&callback=?`)
          .then((res) => {
            // console.log(res)
            
            
            this.setState({ country: res.data.address.country})

            
            if(res.data.address.town!==undefined)
              this.setState({ city:res.data.address.town })
            if(res.data.address.residential!==undefined)
                this.setState({ city:res.data.address.residential })
            
          })
      
    }

    TrackMe = async () => {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          
          this.setState({ 
            x: position.coords.latitude, 
            y: position.coords.longitude
          })

          this.AutoFillAddress();
        }, 
        err => console.log(err)
      );
      
    }
      
    render(){          
        return (
          
            <div style={{backgroundColor:"#F7F7F7"}}>
              
                   
                   <div  id="newlocationpopup" > 
                          
                        <br/>
                         <Popup trigger={ <Button variant="primary" size="lg">  Add Location</Button>  } >
                            <div id='popupform'>
                             <form onSubmit={this.onSubmit}>
                                
                                <div className="form-group">
                                   <input
                                        id="country"
                                        placeholder="Country"
                                        name="country"
                                        type="text"
                                        required="required" 
                                        className="form-control"
                                        value={this.state.country}
                                        onChange={this.onChangeCountry}
                                    />
                                    <br/>
                                    <input
                                        id="city"
                                        name="city"
                                        placeholder="City / Vilage"
                                        type="text" 
                                        required="required" 
                                        className="form-control"
                                        value={this.state.city}
                                        onChange={this.onChangeCity}
                                    />
                                     <br/>
                                        <div  className="form-check form-check-inline">
                                         <input
                                            name="street"
                                            id="street"
                                            placeholder="Street"
                                            type="text" 
                                            
                                            className="form-control"
                                            value={this.state.street}
                                            onChange={this.onChangeStreet}
                                        />
                                        </div>
                                        <div  className="form-check form-check-inline">
                                            <input
                                                name="streetnumber"
                                                id="streetnumber"
                                                placeholder="number"
                                                type="number"  
                                                className="form-control"
                                                value={this.state.streetnumber}
                                                onChange={this.onChangeStreetNumber}
                                            />
                                        </div>
                                </div>
                                
                                <br/>
                                <button onClick={this.TrackMe} id="trackButton">Or Track Instead</button>
                                <br/>
                                <br/>
                                    <div className="form-group" id="submitbutton" >
                                        <input
                                        id="submitlocation"
                                        type="submit"
                                        value="Add New Location"
                                        className="btn btn-primary"
                                    />
                                </div>
                            </form>
                        </div>
                    </Popup>
                    <br/>
                    <br/>
                    <div >
                      <Container>
                        <Row>
                          <Col md={{ span: 10, offset:1 }} >
                          <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Locations</Accordion.Header>
                              <Accordion.Body>
                                {this.DivLocations()}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                            
                          </Col>
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
  