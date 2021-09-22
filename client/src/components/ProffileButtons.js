import React, {  forwardRef , Component, createRef } from 'react';
import {MapContainer,  TileLayer, ZoomControl , Marker , Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Container, Card ,DropdownButton ,Row , Col, Button  } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Switch from "react-switch";



import  "./CSS/ProffileButtons.css"

const cookies = new Cookies();
let user = cookies.get('user')



export default class ProffileButtons  extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            printer: false,
            print: false
        };

        this.onChangePrint = this.onChangePrint.bind(this)
        this.onChangePrinter = this.onChangePrinter.bind(this)


    }

    onChangePrint(print){
        
        this.setState({print})
        
        if(print === true){
            this.setState({printer:true})
        }
        const edituser = {

            print : this.state.print,
            printer: this.state.printer,
            id: user.id,
            username: user.username
          };
      
          
        axios
        .post("http://localhost:3000/users/print", edituser)
        .then((res) => {
            console.log(res.data)     
            
        });
      
    }
    onChangePrinter(printer){
        
        this.setState({printer})
        if(printer === false){
            this.setState({print:false})
        }

        const edituser = {

            print : this.state.print,
            printer: this.state.printer,
            id: user.id,
            username: user.username
          };
      
          
        axios
        .post("http://localhost:3000/users/print", edituser)
        .then((res) => {
            console.log(res.data)     
            
        });
      
    }


    componentDidMount(){
        
        this.setState({
            print: user.print,
            printer: user.printer
        })
    }

      render() {
        
          return(
              <div>
                  
                <div>
                    <Container>
                        <Row>
                            <Card style={{ width: '67%',marginLeft:"15px" }}>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            I have 3D pritner 

                                        </Col>
                                        <Col>
                                            <Switch onChange={this.onChangePrinter} checked={this.state.printer} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            I do print on demand 

                                        </Col>
                                        <Col>
                                            <Switch onChange={this.onChangePrint} checked={this.state.print} />
                                        </Col>

                                    </Row>
                                    
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                    
                    </div>
              </div>
          );
      }
};

