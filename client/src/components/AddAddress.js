
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Cookies from 'universal-cookie';

import axios from 'axios';

import React, { Component } from "react";
import {Modal, Button , Form} from 'react-bootstrap'



import "./CSS/profile.css"
import Xartis from './images/map.png'

const cookies = new Cookies();
let user = cookies.get('user');

  
export default class AddAddress  extends Component {
        
    constructor(props) {
        super(props);

        this.ClosePopup = this.ClosePopup.bind(this)
        
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        
        this.onChangeX = this.onChangeX.bind(this);
        this.onChangeY = this.onChangeY.bind(this);
        this.TrackMe = this.TrackMe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.TrackMe = this.TrackMe.bind(this)


        this.state = {
            
            country:"",
            city:"",
            street:"",
            streetnumber:"",
            x:"",
            y:"",

            popup:false
        
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

      
    onSubmit(e) {
        // e.preventDefault();
        
        

        let address = {
            username:user.username,
            url:user.imageUrl,
            print: user.print,
            printer: user.printer,
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

    TrackMe = async (e) => {
        
        await navigator.geolocation.getCurrentPosition(
          (position) => {

            
            e.preventDefault();
            this.setState({ 
              x: position.coords.latitude, 
              y: position.coords.longitude
            })
  
            this.AutoFillAddress();
          }, 
          err => console.log(err)
        );
        
        e.preventDefault();
    }
    
    ClosePopup(e){
        e.preventDefault();
        this.setState({popup:false})
        this.setState({
          
          country:"",
          city:"",
          street:"",
          x:"",
          y:""
        })
    }


    PopupMap(props){
        return(
            <Modal
            {...props}
            
            show={this.state.popup}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                New Address
              </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={this.onSubmit}  style={{textAlign:"center", width:"95%"}} >
                        
                            <Form.Control type="text" 
                                
                                id="country"
                                placeholder="Country"
                                name="country"
                                required="required" 
                                className="form-control"
                                value={this.state.country}
                                onChange={this.onChangeCountry}
                            />

                            <Form.Control
                                        id="city"
                                        name="city"
                                        placeholder="City / Vilage"
                                        type="text" 
                                        required="required" 
                                        className="form-control"
                                        value={this.state.city}
                                        onChange={this.onChangeCity} 
                                
                            />
                            
                            <Form.Control 
                                        name="street"
                                        id="city"
                                        placeholder="Street"
                                        type="text" 
                                        
                                        className="form-control"
                                        value={this.state.street}
                                        onChange={this.onChangeStreet}
                                
                            />
                            <br/>
                            {this.state.x +" , "+this.state.y}
                            <br/>
                            <button onClick={this.TrackMe } id="trackButton">Or Track Instead</button>
                            <br/>

                            
                            <Button id="editsubmitbutton" onClick={this.ClosePopup}>
                                Close
                            </Button>
                            
                            <Button variant="primary" id="editsubmitbutton" type="submit">
                                Add New Address
                            </Button>
                        </Form>
            </Modal.Body>
          </Modal>
          );
    }


    render(){          
        return (
        
                <div>
                    
                    <br/>
                    <br/>
                    {this.PopupMap()}
                    <button  onClick={()=>{ this.setState({popup:true})} }>
                        <img src={Xartis} alt='xarits'  style={{height:"150px" , width:"auto"}}/>
                        <br/>
                        Add Address
                    </button>
                </div>
                
        )
    }
};