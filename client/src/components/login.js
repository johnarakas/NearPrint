
import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.css';

import logo from './images/logo.png'
import "./CSS/login.css"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'

export default class Login  extends Component {


    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        // this.onChangePersonPosition = this.onChangePersonPosition.bind(this);
        // this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            username: "",
            password:"",
            auth:"",
            id:"",
            
            phone:"",
            email:"",

            imageUrl:"",
            info:"",
            printer:false,
            print:false,
            designer:false,
            design:false
          
        };
      }
    
      
      // These methods will update the state properties.
      onChangeUsername(e) {
        this.setState({
          username: e.target.value,
        });
      }
      onChangePassword(e) {
        this.setState({
          password: e.target.value,
        });
      }
    
    // This function will handle the submission.
    

    onSubmit(e) {
        e.preventDefault();
    
        // When post request is sent to the create url, axios will add a new record(newperson) to the database.
        const user = {
          username: this.state.username,
          password: this.state.password,
        };
    

        axios
          .post("http://localhost:3000/users/login" , user)
          .then((res) => {
            console.log(res.data)
            
            this.setState({ auth: true });
            this.setState({ id: res.data._id });
            
            this.setState({phone: res.data.phone})
            this.setState({email: res.data.email})
            this.setState({username: res.data.username})
            
            this.setState({ imageUrl: res.data.imageUrl})
            this.setState({ info: res.data.info})
            this.setState({ printer: res.data.printer})
            this.setState({ print: res.data.print})
            this.setState({ designer: res.data.designer})
            this.setState({ design: res.data.designe})
            
            // imageUrl:"",
            // info:"",
            // printer:false,
            // print:false,
            // designer:false,
            // design:false

            
            
          });
    
        // We will empty the state after posting the data to the database
        this.setState({
          username: "",
          password: "",
          auth:"",
          id:"",
          
          phone:"",
          email:"",

          imageUrl:"",
          info:"",
          printer:false,
          print:false,
          designer:false,
          design:false
        });
      }
    
    render(){

        if(this.state.auth === true){

          let userCookie = { 
              id : this.state.id ,
              username: this.state.username ,
              phone: this.state.phone,  
              email: this.state.email,
              imageUrl: this.state.imageUrl,
              info:  this.state.info,
              printer:  this.state.printer,
              print: this.state.print,
              designer:  this.state.designer,
              design:  this.state.design
          }

          const cookies = new Cookies();
          cookies.set('user', userCookie , { path : '/'} )
          
          let str = "/homepage";
        
          window.location.href = str;
        
        
        }
          
        
        return (
          <div id="login" > 
            <Container>
            <Row>
              <Col>
                <img src={logo} id="Logo" alt="Logo" />
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Body>
                      NearPrint it's our iplementation of social network with decentralize marketplace. It's addressed normal 
                     peopole who wants to connect and work with peopole who have printers, 3D printers 
                     designers and more.

                    </Accordion.Body>
                  </Accordion.Item>
                
                </Accordion>
              </Col>
              <Col id="loginform">
                <h1 id="signinheader"><Badge bg="secondary">Sign In</Badge></h1>
                <Row className="justify-content-md-center" >
  
                  <Col md={8}>
                      <Form  onSubmit={this.onSubmit} >
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control placeholder="username"
                                  type="text"
                                  required="required" 
                                  className="form-control"
                                  value={this.state.username}
                                  onChange={this.onChangeUsername} 
                        />
                      </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      
                      <Form.Control 
                          placeholder="Password"
                          type="password" 
                          name="password"
                          required="required" 
                          className="form-control"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                      />
                      
                    </Form.Group>

                    
                    
                    <div className="d-grid gap-2" id="submitbutton">
                      <Button variant="primary"
                      
                                        type="submit"
                                        value="Log In"
                                        className="btn btn-primary"
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                  <NavLink id="signuplink" className="nav-link" to="/signup">
                      SignUp
                   </NavLink>
                  </Col>
                  
                </Row>
                
              </Col>
            </Row>
          </Container>
          </div>
         
        );
    }
  };
  