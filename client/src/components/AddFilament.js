
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Cookies from 'universal-cookie';

import axios from 'axios';

import React, { Component } from "react";
import {Modal, Button , Form} from 'react-bootstrap'



import "./CSS/profile.css"
import Filament from './images/filament.png'

const cookies = new Cookies();
let user = cookies.get('user');

  
export default class AddFilament extends Component {
        
    constructor(props) {
        super(props);

        this.ClosePopup = this.ClosePopup.bind(this)
        this.onChangeMaterial= this.onChangeMaterial.bind(this)
        this.onChangeColor= this.onChangeColor.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
        


        this.state = {
            
            material:"",
            color:"",
            username:"",

            popup:false
        
        };
    }
    
    
    onChangeMaterial(e) {
        this.setState({
          material: e.target.value,
        });
    }

    onChangeColor(e) {
        this.setState({
          color: e.target.value,
        });
    }

      
    onSubmit(e) {
        // e.preventDefault();
        
        

        let filament = {
            username:user.username,
            material: this.state.material,
            color: this.state.color
        }
        axios
        .post("http://localhost:3000/printers/addFilament" ,filament )
        .then((res) => {
            console.log(res.data)
            
        });

        // We will empty the state after posting the data to the database
        this.setState({
            material:"",
            color:"",
        });
    }

    
    
    

    
    ClosePopup(e){
        e.preventDefault();
        this.setState({popup:false})
        this.setState({
          
          color:"",
          material:"",
        })
    }


    PopupFilament(props){
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
                New Filament
              </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={this.onSubmit}  style={{textAlign:"center", width:"95%"}} >
                        
                            <Form.Control type="text" 
                                
                                id="material"
                                placeholder="filament material"
                                name="material"
                                required="required" 
                                className="form-control"
                                value={this.state.material}
                                onChange={this.onChangeMaterial}
                            />

                            <Form.Control
                                        id="color"
                                        name="color"
                                        placeholder="filament color"
                                        type="text" 
                                        required="required" 
                                        className="form-control"
                                        value={this.state.color}
                                        onChange={this.onChangeColor} 
                                
                            />
                            
                            

                            
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
                    {this.PopupFilament()}
                    <button  onClick={()=>{ this.setState({popup:true})} }>
                        <img src={Filament} alt='filament'  style={{height:"150px" , width:"auto"}}/>
                        <br/>
                        Add New Filament
                    </button>
                </div>
                
        )
    }
};