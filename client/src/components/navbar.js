
// We import bootstrap to make our application look better.


import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, NavItem, NavDropdown, Badge } from 'react-bootstrap';

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container'


import profileicon from './images/profile.png'

import Cookies from 'universal-cookie';

import DefaultProfilePicture from './images/profile.png'

const cookies = new Cookies();

  let user = cookies.get('user')



  export default class Bar  extends Component {
  
    LoadImage(){
      
      if(user.imageUrl !== ""){
        return user.imageUrl
      }else{
        return DefaultProfilePicture
      }
    };
  
                
      

    //if(user !== undefined){
      // if(user.role === "master"){
        render(){
        return (
          <div>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home"><NavLink className="nav-link" style={{color:"white"}} to="/homepage"><h4><Badge bg="secondary"><h4>Near</h4></Badge>Print</h4></NavLink></Navbar.Brand>
             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link className="nav-link"  href="/map" >Map</Nav.Link>
                  
                  <Nav.Link >Projects</Nav.Link>
                
              </Nav>
              <Nav>
                
                <Nav.Link eventKey={2} >
                  <NavLink className="nav-link"  to="/profile"><img style={{width:"40px" , height:"auto" , borderRadius:"50px"}} src={this.LoadImage()} alt="log" ></img>{" "+user.username}</NavLink>    
              
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
                   
        </div>
        );
      }
  };
  