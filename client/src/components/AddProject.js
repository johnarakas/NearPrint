
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./navbar";
import Cookies from 'universal-cookie';

import axios from 'axios';

import React, { Component } from "react";
import {Modal, Container , Row , Col  , Button , Form} from 'react-bootstrap'


import "./CSS/profile.css"

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
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.ClosePopup = this.ClosePopup.bind(this) ;
        
        this.AddImage = this.AddImage.bind(this);
        this.AddFile = this.AddFile.bind(this)
        
        this.onChangeAddress = this.onChangeAddress.bind(this)

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
            
            x:"",
            y:"",
            addresses:[],
            addressesString:[],

            address:"",

            image:"",
            images:[],
            
            file:"",
            files:[],
            
            popup:false
          
        };
      }
      
      onChangeAddress(e){
        e.preventDefault();

        this.setState({address: e.target.value})
        
        for(var addr of this.state.addresses){
          if(addr._id === e.target.value){
            
            this.setState({

              country: addr.country,
              city: addr.city,
              street: addr.street,
              x: addr.x,
              y: addr.y
            })
          }
        }

      }
      onChangeImage(e){
        
        this.setState({
          image:e.target.value
        })

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
     
      AddImage(e){


        e.preventDefault();

        this.state.images.push(this.state.image)
        this.setState({image:""})
        
      }

      AddFile(e){

        e.preventDefault();

        this.state.files.push(this.state.file)
        this.setState({file:""})

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
            

            let project = {
                username: user.username,
                name : this.state.name,
                info : this.state.info,
                requirements : this.state.requirements,
                price : this.state.price,
                email : user.email,
                images: this.state.images,
                files : this.state.files,
                phone : user.phone,
                country:this.state.country,
                city: this.state.city,
                street: this.state.street,
                
                x: this.state.x,
                y: this.state.y,

                popup: false
            }
            
            // console.log(project)
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
          
          this.setState({addresses: response.data})

          let tmp = response.data[0]
          this.setState({
            address: tmp._id,
            country: tmp.country,
            city: tmp.city,
            street: tmp.street,
            x: tmp.x,
            y: tmp.y
          })
          
          
          // console.log(response.data)
          //   for(var addr of response.data){
          //       let str= ""
          //       str = addr.city
          //       if(addr.street !== "")
          //           str+= " , "+ addr.street     
                    
          //       this.state.addressesString.push(str)

          //   }

            // this.setState({addresses: array})



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
          let str=""
          
          str+= addr.city

          if(addr.street !== ""){
            str+=" , "+addr.street
          }
          
          return(
            <option 
                value={addr._id}
                key={addr._id}
                checked={this.state.role === addr}
                
            >{str}</option>
          );
        });
    };

    LoadImages(){
      
      return this.state.images.map((img) => {
      
        
        return(
          <p>{img+"\n"}</p>
        );
      });
    }
  
    LoadFiles(){
      
      return this.state.files.map((file) => {
      
        
        return(
          <p>{file+"\n"}</p>
        );
      });
    }
    

    
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
                    <Form  onSubmit={this.onSubmit}  style={{textAlign:"center", width:"95%"}} >
                        
                              <select style={{width:"100%"}} onChange={this.onChangeAddress} value={this.state.address}>
                                {this.DivAddress()}
                              </select>
                              
                              <hr style={{marginLeft:"30px" , marginBottom:"30px", marginTop:"30px"}} />

                              <Form.Control type="text" 
                                  
                                  id="name"
                                  placeholder="Project Name"
                                  name="name"
                                  required="required" 
                                  className="form-control"
                                  value={this.state.name}
                                  onChange={this.onChangeName}
                              />

                              <Form.Control type="text" 
                                as="textarea" rows={3}
                                placeholder="Project Info" 
                                value={this.state.info}
                                onChange={ this.onChangeInfo}
                              />

                              <Form.Control type="text" 
                                as="textarea" rows={3}
                                placeholder="Project Requirements" 
                                value={this.state.requirements}
                                onChange={ this.onChangeRequirements}
                              />

                              <Form.Control type="text" 
                                  
                                  placeholder="Price"
                                  
                                  required="required" 
                                  className="form-control"
                                  value={this.state.price}
                                  onChange={this.onChangePrice}
                              />

                              
                              <hr style={{marginLeft:"30px" , marginBottom:"30px", marginTop:"30px"}} />
                            
                              <Container >

                                <Row>
                                      {this.LoadImages()}
                                  <Col style={{marginTop:"-20px",  marginLeft:"-10px"}}>
                                    <Form.Control type="text" 
                                        
                                        placeholder="Place Image URL"
                                        style={{width:"170%"}}
                                        
                                        className="form-control"
                                        value={this.state.image}
                                        onChange={this.onChangeImage}
                                        
                                    />
                                  </Col>
                                  <Col style={{textAlign:"right",  marginRight:"-30px"}}>
                                    <Button onClick={ this.AddImage } >Add</Button>
                                  </Col>
                                </Row>
                                <br/>
                                <Row>
                                  {this.LoadFiles()}
                                  <Col style={{marginTop:"-20px", marginLeft:"-10px"}}>
                                    <Form.Control type="text" 
                                        style={{width:"170%"}}
                                        placeholder="Place File URL"
                                        
                                        className="form-control"
                                        value={this.state.file}
                                        onChange={this.onChangeFile}
                                    />
                                  </Col>
                                  <Col style={{textAlign:"right", marginRight:"-30px"}}>
                                      <Button onClick={ this.AddFile }>Add</Button>
                                  </Col>
                                </Row>

                                

                              </Container>
                            <Button id="editsubmitbutton" onClick={this.ClosePopup}>
                                Close
                            </Button>
                            
                            <Button variant="primary" id="editsubmitbutton" type="submit">
                                Add New Project
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
                        <img src={Project} alt='xarits'  style={{height:"150px" , width:"auto"}}/>
                        <br/>
                        Add Project
                    </button>
                </div>
                
        )
    }
};