
import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

import Cookies from 'universal-cookie';

import Navbar from "./navbar";


import "./CSS/project.css"


import Popup from 'reactjs-popup';


import {Card, Button , Container , Row, Col , Accordion}  from 'react-bootstrap'
const cookies = new Cookies();

export default class Projects  extends Component {

    

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
      DivProjects(){
        return this.state.projects.map((project) => {
            
            return(
              <Card style={{ width: '50%', marginLeft:'20%', marginTop:'2%' }}>
              <Card.Body>
              <Container>
                <Row>
                  <Col>
                <Card.Title>
                  {project.name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{project.price}{" $ ,   "+ project.info}</Card.Subtitle>
                <Card.Text>
                  {project.requirements}
                </Card.Text>
                <Card.Text style={{color:"gray"}}>
                  {project.street+' '}{project.streetnumber+" , "}{project.city+" "}{project.country}
                </Card.Text>
                </Col>
                <Col style={{textAlign:"right"}}>
                Edit | Delete
                </Col>
              </Row>
              </Container>
              </Card.Body>
            </Card>
              
            );
          });
      }
        
    render(){          
        return (
        
            <div>
              
                   
                   
                   <div > 
                    <div  id="newprojectbutton">                         
                        <Popup   trigger={ <Button variant="primary"  style={{marginTop:"20px" }} size="lg">Add Project</Button> } >
                            <div>
                             <form onSubmit={this.onSubmit} >
                                
                                <div className="form-group" id="form">
                                   <br/>
                                   <input
                                        id="name"
                                        placeholder="Project Name"
                                        name="name"
                                        type="text"
                                        required="required" 
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                    />
                                    <textarea
                                        id="info"
                                        placeholder="Info"
                                        name="info"
                                        type="text"
                                        required="required" 
                                        className="form-control"
                                        value={this.state.info}
                                        onChange={this.onChangeInfo}
                                    />
                                    <textarea
                                        id="requirements"
                                        placeholder="Requirements"
                                        name="requirements"
                                        type="text"
                                        required="required" 
                                        className="form-control"
                                        value={this.state.requirements}
                                        onChange={this.onChangeRequirements}
                                    />
                                    <input
                                        id="price"
                                        placeholder="Price"
                                        name="price"
                                        type="number"
                                        required="required" 
                                        className="form-control"
                                        value={this.state.price}
                                        onChange={this.onChangePrice}
                                    />
                                    <input
                                        id="file"
                                        placeholder="File URL"
                                        name="file"
                                        type="text"
                                        required="required" 
                                        className="form-control"
                                        value={this.state.file}
                                        onChange={this.onChangeFile}
                                    />
                                    <select name="Address" id="address" onChange={this.onChangeStreet}>
                                        {
                                            this.DivAddress()
                                        }
                                    </select>
                                    <br/>
                                    <br/>
                                    
                                    <div className="form-group" id="submitbutton" >
                                        <input
                                        
                                        type="submit"
                                        value="Create"
                                        className="btn btn-primary"
                                      />
                                    </div>
                                </div>
                                    
                                    
                            </form>
                        </div>
                    </Popup>
                    </div>

                    <div>
                      <br/>
                    <div >

                                    
                      <Container>
                        <Row>
                          <Col md={{ span: 10, offset:1 }} >
                          <Accordion defaultActiveKey="1">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Projects</Accordion.Header>
                              <Accordion.Body>
                                {this.DivProjects()}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                            
                          </Col>
                        </Row>
                      </Container>    
                              
                        
                    </div>
                  </div>
                </div>
          </div>
            
        );
        
          
    }
  };
  