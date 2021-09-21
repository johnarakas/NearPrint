
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Cookies from 'universal-cookie';

import axios from 'axios';

import React, { Component } from "react";
import {Modal, Button , Form} from 'react-bootstrap'



import "./CSS/profile.css"
import Printer from './images/printer.png'

const cookies = new Cookies();
let user = cookies.get('user');

  
export default class AddPrinter extends Component {
        
    constructor(props) {
        super(props);

        this.ClosePopup = this.ClosePopup.bind(this)
        this.onChangeNozzle= this.onChangeNozzle.bind(this)
        this.onChangeModel= this.onChangeModel.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
        


        this.state = {
            
            model:"",
            nozzle:"",
            username:"",

            popup:false
        
        };
    }
    
    
    onChangeNozzle(e) {
        this.setState({
          nozzle: e.target.value,
        });
    }

    onChangeModel(e) {
        this.setState({
          model: e.target.value,
        });
    }

      
    onSubmit(e) {
        // e.preventDefault();
        
        

        let printer = {
            username:user.username,
            nozzle: this.state.nozzle,
            model: this.state.model
        }
        axios
        .post("http://localhost:3000/printers/addPrinter" ,printer )
        .then((res) => {
            console.log(res.data)
            
        });

        // We will empty the state after posting the data to the database
        this.setState({
            model:"",
            nozzle:"",
        });
    }

    
    
    

    
    ClosePopup(e){
        e.preventDefault();
        this.setState({popup:false})
        this.setState({
          
          model:"",
          nozzle:"",
        })
    }


    PopupPrinter(props){
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
                New 3D Printer
              </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={this.onSubmit}  style={{textAlign:"center", width:"95%"}} >
                        
                            <Form.Control type="text" 
                                
                                id="model"
                                placeholder="3D printer model"
                                name="model"
                                required="required" 
                                className="form-control"
                                value={this.state.model}
                                onChange={this.onChangeModel}
                            />

                            <Form.Control
                                        id="nozzle"
                                        name="nozzle"
                                        placeholder="3D printer nozzle ( 0.1 , 0.2 , .. )"
                                        type="text" 
                                        required="required" 
                                        className="form-control"
                                        value={this.state.nozzle}
                                        onChange={this.onChangeNozzle} 
                                
                            />
                            
                            

                            
                            <Button id="editsubmitbutton" onClick={this.ClosePopup}>
                                Close
                            </Button>
                            
                            <Button variant="primary" id="editsubmitbutton" type="submit">
                                Add New 3D Printer
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
                    {this.PopupPrinter()}
                    <button  onClick={()=>{ this.setState({popup:true})} }>
                        <img src={Printer} alt='printer'  style={{height:"150px" , width:"auto"}}/>
                        <br/>
                        Add 3D Printer
                    </button>
                </div>
                
        )
    }
};