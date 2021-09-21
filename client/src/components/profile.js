
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./navbar";
import Cookies from 'universal-cookie';

import axios from 'axios';

import React, { Component } from "react";
import {Container , Row , Col  , Button , Form , Modal} from 'react-bootstrap'

import Popup from 'reactjs-popup';
import Edit from './images/edit.png'
import DefaultProfilePicture from './images/profile.png'
import "./CSS/profile.css"
import { popup } from "leaflet";
const cookies = new Cookies();

  let user = cookies.get('user');
export default class Profile  extends Component {
  
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.ClosePopup = this.ClosePopup.bind(this);

    // this.onChangePersonPosition = this.onChangePersonPosition.bind(this);
    // this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        username: user.username,
        email:user.email,
        password:"",
        phone:  user.phone,
        imageUrl: user.imageUrl,
        info: user.info,
        printer:false,
        print:false,
        designer:false,
        design:false,
        popup:false
      
    };
  }
  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }


  onChangeEmail(e){
    this.setState({
      email : e.target.value
    })
  }


  onChangePhone(e){
    this.setState({
      phone : e.target.value
    })
  }
  onChangeImageUrl(e){
    this.setState({
      imageUrl : e.target.value
    })
  }
  
  onChangeInfo(e){
    this.setState({
      info : e.target.value
    })
  }


  
  onSubmit(e) {
    e.preventDefault();
    this.setState({popup:false})
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const edituser = {
      id: user.id,
      username: user.username,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      imageUrl: this.state.imageUrl,
      info: this.state.info,
    };

    
    axios
      .post("http://localhost:3000/users/update", edituser)
      .then((res) => {
        console.log(res.data)     
        
      });

    // We will empty the state after posting the data to the database
    this.setState({
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
    });

  }



  LoadImage(){
    if(user.imageUrl !== ""){
      return user.imageUrl
    }else{
      return DefaultProfilePicture
    }
  };
  
  componentDidMount(){
    
  }
  

  ClosePopup(e){
    e.preventDefault();
    this.setState({popup:false})
  }


  ShowProfileForm(props){
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
          Change Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form  onSubmit={this.onSubmit}  style={{textAlign:"center", width:"95%"}} >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" value={this.state.imageUrl}
                        placeholder="place url of an image for your profile"
                        onChange={ this.onChangeImageUrl}
                      />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      
                      <Form.Control type="password" 
                      
                        placeholder="password" 
                        value={this.state.password}
                        onChange={ this.onChangePassword}
                      
                    />
                  </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="text" 
                          as="textarea" rows={3}
                          placeholder="info" 
                          value={this.state.info}
                          onChange={ this.onChangeInfo}
                        
                      />
                    </Form.Group>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" 
                        
                        value={this.state.email} 
                        onChange={this.onChangeEmail}
                      
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="phone"  
                        value={this.state.phone} 
                        onChange={this.onChangePhone}
                      
                      />
                    </Form.Group>
                   
                    <Button id="editsubmitbutton" onClick={this.ClosePopup}>
                      Close
                    </Button>
                    
                    <Button variant="primary" id="editsubmitbutton" type="submit">
                      Update
                    </Button>
                  </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button> */}
      {/* </Modal.Footer> */}
    </Modal>
    );
  }

  render(){          
      return (
        <div id="bg"  style={{backgroundColor:"#F7F7F7"}}>
          
          <div id="profileDiv" >
            <Container >
            
                <Row>
                  <Col md={{ span: 8, offset: 3 }} id="introductory">
                    <div id="profileImageDiv">

                      <img id="profileImage" src={this.LoadImage()} alt="profileimage"></img>
                    </div>
                    <Row>
                      <Col>
                          <div id="usernameDiv">
                            <h3>{user.username}</h3>
                          </div>
                      </Col>
                      <Col>
                         <div id="editDiv">
                            <button onClick={()=>{this.setState({popup:true}) }}>
                                <img id="editIcon" src={Edit} alt="profile image"/> 
                            </button>
                                          
                        </div> 
                          {this.ShowProfileForm() }
                      </Col>
                      
                      <div id="infoDiv">
                        {user.info}
                      </div>
                    </Row>
                  </Col>

                </Row>
              
            </Container>
          </div>
          {/* <div id="popupFormDiv" >
              <div id="popupForm">
                
                  <Form  onSubmit={this.onSubmit} >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" value={this.state.imageUrl}
                        placeholder="place url of an image for your profile"
                        onChange={ this.onChangeImageUrl}
                      />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      
                      <Form.Control type="password" 
                      
                        placeholder="password" 
                        value={this.state.password}
                        onChange={ this.onChangePassword}
                      
                    />
                  </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="text" 
                          as="textarea" rows={3}
                          placeholder="info" 
                          value={this.state.info}
                          onChange={ this.onChangeInfo}
                        
                      />
                    </Form.Group>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" 
                        
                        value={this.state.email} 
                        onChange={this.onChangeEmail}
                      
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="phone"  
                        value={this.state.phone} 
                        onChange={this.onChangePhone}
                      
                      />
                    </Form.Group>
                   
                    <Button id="editsubmitbutton" onClick={()=>{ this.popupFunctionClose()}}>
                      Close
                    </Button>
                    
                    <Button variant="primary" id="editsubmitbutton" type="submit">
                      Update
                    </Button>
                  </Form>
              </div>
          </div> */}

        </div>
      );
      
        
  }
};
