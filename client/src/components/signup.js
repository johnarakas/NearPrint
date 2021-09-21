
import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

import { NavLink } from "react-router-dom";


import logo from './images/logo.png'
import "./CSS/login.css"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'

export default class Signup  extends Component {


    constructor(props) {
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        


        // this.onChangePersonPosition = this.onChangePersonPosition.bind(this);
        // this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            username: "",
            password:"",
            email:"",
            phone:"",
            
          
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
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value,
        });
      }
      onChangePhone(e) {
        this.setState({
          phone: e.target.value,
        });
      }
      
      
    // This function will handle the submission.
      

    onSubmit(e) {
        e.preventDefault();
    
        // When post request is sent to the create url, axios will add a new record(newperson) to the database.
        const user = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
          
        };
    
        
        axios
          .post("http://localhost:3000/users/signup", user)
          .then((res) => console.log(res.data));
    
        // We will empty the state after posting the data to the database
        this.setState({
          username: "",
          password: "",
          email:"",
          phone:"",
          
        });
      }

      render(){
        return(
          <div id="login" > 
            <Container>
            <Row>
              <Col>
                <img src={logo} id="Logo" alt="Logo" />
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Body>
                     NearPrint it's our idea of decentralize marketplace. It's addressed normal 
                     peopole who wants to connect and work with peopole who have printers, 3D printers 
                     designers and more.

                     
                    </Accordion.Body>
                  </Accordion.Item>
                
                </Accordion>
              </Col>
              <Col id="loginform">
                <h1 id="signinheader"><Badge bg="secondary">Sign Up</Badge></h1>
                <Row className="justify-content-md-center">
  
                  <Col md={7}>
                  <Form  onSubmit={ this.onSubmit}>
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

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        
                        <Form.Control placeholder="example@mail.com"
                                  type="email"
                                  required="required" 
                                  className="form-control"
                                  value={this.state.email}
                                  onChange={this.onChangeEmail}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        
                        <Form.Control placeholder="6912345678"
                                type="tel"
                                required="required" 
                                className="form-control"
                                
                                value={this.state.phone}
                                onChange={this.onChangePhone}
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
                  <NavLink id="signuplink" className="nav-link" to="/">
                      SignIn
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
  