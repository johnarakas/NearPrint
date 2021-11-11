
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import Cookies from 'universal-cookie';
import { Carousel } from 'react-responsive-carousel';

import axios from 'axios';


import React, { Component } from "react";
import {Container , Card , Row , Col  , Button , Form , Modal} from 'react-bootstrap'

import Navbar from "./navbar";

const cookies = new Cookies();

let user = cookies.get('user');

export default class ShowcaseProjects  extends Component {
    
    constructor(props) {
        super(props);
        
    
        this.state = {
            projects:[],
          
        };
    }
    GetProjectImages(images){
        return images.map((image) => {
            
            return(
                <div>
                    {console.log("hi")}
                    {console.log(image)}
                    <img src={ image } alt={ image.toString }></img>
                   
                </div>

              
            );
        });
    }
    LoadProjects(){
        return this.state.projects.map((obj) => {
            
            return(
                <div>

                    <Card style={{ width: '80%' }}>
                        
                    <Card.Title>{obj.username}</Card.Title>

                    {/* {console.log(obj.images)} */}

                    <img src={"https://cdnb.artstation.com/p/assets/images/images/021/102/857/large/eric-maki-billie-piper-3dprint.jpg?1570412830"}></img>
                    {/* <Carousel> */}
                        {/* {this.GetProjectImages(obj.images)} */}
                    {/* </Carousel> */}
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </div>

              
            );
        });
      
    }
    componentDidMount(){
        

        let user = cookies.get('user')
        // alert
        let obj= {
          username: user.username
        }
        axios
        .post("http://localhost:3000/MyProjects",obj)
        .then((response) => {
            
          this.setState({ projects: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    render(){          
        return (
            <div>
                <Navbar/>
                <br/>
                <br/>
                <div style={{marginLeft:"15%"}}>
                    {this.LoadProjects()}
                </div>
            </div>
        );
    }
};