import React, {  forwardRef , Component, createRef } from 'react';
import {MapContainer,  TileLayer, ZoomControl , Marker , Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Container, Card ,DropdownButton ,Row , Col, Button  } from 'react-bootstrap';
import Navbar from "./navbar";
import axios from 'axios';
import Cookies from 'universal-cookie';


import ToggleButton from 'react-toggle-button'

import Printer from './images/marker_printer.png'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import Form from 'react-bootstrap/Form'

import  "./CSS/ProffileButtons.css"

const cookies = new Cookies();
let user = cookies.get('user')

// import { Class } from 'leaflet';

const iconPerson = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

export default class ProffileButtons  extends Component {
    

      render() {
        
          return(
              <div>
                  
                <div>
                    <Container>
                        <Row>
                            <Card style={{ width: '67%',marginLeft:"15px" }}>
                                <Card.Body>
                                    <div>
                                        <div>
                                        <div className="form-group" >
                                                <div className="form-check form-check-inline">
                                                    Having a 3D Printer
                                                </div>
                                                <div className="form-check form-check-inline" style={{ verticalAlign:"top" }}>
                                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                            <Form.Check type="checkbox"/>
                                                        </Form.Group>
                                                </div>
                                                <br/>
                                                <br/>
                                                <div className="form-check form-check-inline">
                                                    Print on demand
                                                </div>
                                                <div className="form-check form-check-inline" style={{ verticalAlign:"top", marginLeft:"18px"  }}>
                                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                            <Form.Check type="checkbox"
                                                             />
                                                        </Form.Group>
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                    
                    </div>
              </div>
          );
      }
};

