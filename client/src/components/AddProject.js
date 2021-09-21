
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./navbar";
import Cookies from 'universal-cookie';

import axios from 'axios';

import React, { Component } from "react";
import {Modal, Container , Row , Col  , Button , Form} from 'react-bootstrap'


import Profile from "./profile";
import Locations from "./locations";
import Projects from "./projects";

import Popup from 'reactjs-popup';
import Edit from './images/edit.png'
import DefaultProfilePicture from './images/profile.png'
import "./CSS/profile.css"
import AddressesList from "./AddressesList";
import ProffileButtons from "./ProffileButtons";
import Project from './images/project.png'

const cookies = new Cookies();
let user = cookies.get('user');

  
export default class AddProject  extends Component {
   

    constructor(props) {
        super(props);
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeInfo = this.onChangeInfo.bind(this);
        this.onChangeRequirements = this.onChangeRequirements.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);

        
        this.onChangeStreet = this.onChangeStreet.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {

            
            name: "",
            info: "",

            requirements: "",
            price: "",

            file: "",
            
            

            country:"",
            city:"",
            street:"",
            streetnumber:"",
            x:"",
            y:"",
            addresses:[],
            projects:[],
          
        };
      }
      
     
      onChangeName(e) {
        this.setState({
          name: e.target.value,
        });
      }
      onChangeInfo(e) {
        this.setState({
          info : e.target.value,
        });
      }
      onChangeRequirements(e) {
        this.setState({
          requirements: e.target.value,
        });
      }
      onChangePrice(e) {
        this.setState({
          price: e.target.value,
        });
      }
      onChangeFile(e) {
        this.setState({
          file: e.target.value,
        });
      }
     
      


      // These methods will update the state properties.
      onChangeStreet(e) {
        this.setState({
          street: e.target.value,
        });
      }
      
      
    

    onSubmit(e) {
        e.preventDefault();
        
        
        let user = cookies.get('user')
        let obj = {
            street : this.state.street
        }
        axios
        .post("http://localhost:3000/locations/getLocationFromStreet",obj)
        .then((response) => {
            

            this.setState({country: response.data.country})
            this.setState({city: response.data.city})
            this.setState({streetnumber: response.data.streetnumber})

            let project = {
                username: user.username,
                name : this.state.name,
                info : this.state.info,
                requirements : this.state.requirements,
                price : this.state.price,
                email : user.email,
                file : this.state.file,
                phone : user.phone,
                country:this.state.country,
                city: this.state.city,
                street: this.state.street,
                streetnumber:this.state.streetnumber,
                x: this.state.x,
                y: this.state.y,
            }
            axios
            .post("http://localhost:3000/projects/add" ,project )
            .then((res) => {
              
                console.log(res.data)
                            
            });
            this.setState({
            
                username:"",
                name: "",
                info: "",
    
                requirements: "",
                price: "",
    
                file: "",
                email: "",
                phone: "",
    
    
                country:"",
                city:"",
                street:"",
                streetnumber:"",
                x:"",
                y:"",
                addresses:[],
                projects:[],

            });
        })
        .catch(function (error) {
          console.log(error);
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
          
            let addresses =  response.data;
            let array = []
            for(var addr of addresses){
                let str= ""
                str = addr.street
                
                array.push(str)

            }
            this.setState({addresses: array})



        })
        .catch(function (error) {
          console.log(error);
        });

        axios
        .get("http://localhost:3000/projects")
        .then((response) => {
          this.setState({ projects: response.data });

        })
        .catch(function (error) {
          console.log(error);
        });
      }

      
    DivAddress(){
      
        return this.state.addresses.map((addr) => {
            
          return(
            <option 
                value={addr}
                key={addr}
                checked={this.state.role === addr}
                
            >{addr}</option>
          );
        });
    };

    
  
    

    
    ClosePopup(e){
        e.preventDefault();
        this.setState({popup:false})
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
                New Project
              </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    
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
                        <img src={Project} alt='xarits'  style={{height:"150px" , width:"auto"}}/>
                        <br/>
                        Add Project
                    </button>
                </div>
                
        )
    }
};