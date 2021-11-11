import React, {  Component } from 'react';
import {MapContainer,  TileLayer, ZoomControl , Marker ,LayersControl, LayerGroup ,  Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Container  ,Row ,  } from 'react-bootstrap';
import Navbar from "./navbar";
import axios from 'axios';
import Cookies from 'universal-cookie';

import L from 'leaflet';

import  "./CSS/map.css"

const cookies = new Cookies();
let user = cookies.get('user')



const iconPerson = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

export default class Map  extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.UpdateLocation = this.UpdateLocation.bind(this)
        

        this.state = {
            x:0,
            y:0,
            locations:[],
            address:"",
            allLocations:[]
        };
      }
     

      componentDidMount(){
        
        

        
        this.LoadAddress();
        
        let obj={  }
        axios
        .post("http://localhost:3000/locations/getLocations",obj)
        .then((response) => {
          
          this.setState({ allLocations: response.data });
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });


        
        setTimeout(() => {
          this.TrackMe().then(()=>{
            this.mapRef.current.setView([this.state.x, this.state.y],12)

          })

        }, 1000);

      
      }

      LoadUsers(){
        return this.state.allLocations.map((loc) => {
          
          if(loc.printer ===false && loc.print=== false ){
            return(
              
              <Marker position={[loc.x , loc.y] }
                key={loc._id}  
                icon={iconPerson} >


                  <Popup>
                    <div style={{ display: "inline-block"}}>
                        <img src={ loc.url } style={{height:"50px", with:"auto"}} alt="1"></img>

                    </div>
                    
                    <div style={{ display: "inline-block",marginLeft:"20px", verticalAlign:"bottom"}}>
                        <h6>{loc.username}</h6>

                    </div>
                    
                        
                  </Popup>
                  
              </Marker>
              
            );
          }
        });
      }

      LoadPrints(){
        return this.state.allLocations.map((loc) => {
          
          if(loc.printer ===true && loc.print=== true ){
            return(
              
              <Marker position={[loc.x , loc.y] }
                key={loc._id}  
                icon={iconPerson} >
                     <Popup>
                    <div style={{ display: "inline-block"}}>
                        <img src={ loc.url } style={{height:"50px", with:"auto"}} alt="1"></img>

                    </div>
                    
                    <div style={{ display: "inline-block",marginLeft:"20px", verticalAlign:"bottom"}}>
                        <h6>{loc.username}</h6>

                    </div>
                    <br/>
                    <div style={{ display: "inline-block"}}>
                        <p style={{backgroundColor:"#FF00E4", padding:"5px" , borderRadius:"20px"}} >has a printer</p>

                    </div>
                    
                    <div style={{ display: "inline-block",marginLeft:"20px", verticalAlign:"bottom"}}>
                        
                        <p style={{backgroundColor:"#00A19D",padding:"5px", borderRadius:"20px" }} > print on demand</p>

                    </div>
                        
                  </Popup>
              </Marker>
              
            );
          }
        });
      }

      LoadPrinters(){
        return this.state.allLocations.map((loc) => {
          
          if(loc.printer ===true && loc.print=== false){
            return(
              
              <Marker position={[loc.x , loc.y] }
                key={loc._id}  
                icon={iconPerson} >
                     <Popup>
                    <div style={{ display: "inline-block"}}>
                        <img src={ loc.url } style={{height:"50px", with:"auto"}} alt="1"></img>

                    </div>
                    
                    <div style={{ display: "inline-block",marginLeft:"20px", verticalAlign:"bottom"}}>
                        <h6>{loc.username}</h6>

                    </div>
                    <br/>
                    <div style={{ display: "inline-block"}}>
                        <p style={{backgroundColor:"#FF00E4", padding:"5px" ,borderRadius:"20px" }} > has a printer </p>

                    </div>
                    
                        
                  </Popup>
              </Marker>
              
            );
          }
      });
      }



      CurrentPosition(){
        this.TrackMe()

        return(
          
          <option key={"trackme"} value={"trackme"} >
            My Current Location
          </option>
        );
      }



      LoadAddress(){
        let obj= {
          username: user.username
        }
        
        axios
        .post("http://localhost:3000/locations/getUserLocations",obj)
        .then((response) => {
          
          this.setState({locations : response.data })
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
      

      TrackMe = async () => {
        await navigator.geolocation.getCurrentPosition(
          (position) => {
            
            this.setState({ 
              x: position.coords.latitude, 
              y: position.coords.longitude
            })
          }, 
          err => console.log(err)
        );
        
      }

      UpdateLocation(e){
        
        if(e.target.value.localeCompare("address")===0){

            this.setState({address: "address"})
            
        }else if(e.target.value.localeCompare("trackme")===0){

          this.setState({address: "trackme"})
          this.TrackMe()
          
          setTimeout(() => {
              
            this.mapRef.current.flyTo([this.state.x, this.state.y], 12, {
              duration: 2
            });
          }, 1000);

        }else{
          

            let location = this.state.locations.find(({_id })=> _id === e.target.value)
            this.setState({address: location._id })
            
            setTimeout(() => {
              
              
              this.mapRef.current.flyTo([location.x, location.y], 12, {
                duration: 2
              });
            }, 1000);




        }



      }
      
      GetUserAddress(){
        return this.state.locations.map((loc) => {
          let str = loc.street+" "+loc.city
          
          return(
            <option key={str}
                value={loc._id} >
                {str}
            </option>
            
          );
        });
      }


      render() {
        
          return(
            <div>
              {/* <Navbar/> */}
              <Container>
                <br/>
                <Row>
                  <select class="btn btn-secondary dropdown-toggle" 
                      style={{marginLeft:"0px",height:"50px", textAlign:"left"}} 
                      title="Address" 
                      value={this.state.address}
                      onChange={this.UpdateLocation} 
                      >
                        
                      <option key={"notvalid"} value={"address"} >
                        Addresses
                      </option>

                    {this.CurrentPosition()}
                    {this.GetUserAddress()}
                  </select>
                  
                </Row>
                <br/>
                <Row>
                  <MapContainer
                      whenCreated={ mapInstance => { this.mapRef.current = mapInstance } }
                      center={[ this.state.x, this.state.y]}
                      zoom={13}
                      zoomControl={false}
                      style={{ width: "100%", height: "600px" }}
                  >
            
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                      />
                      <ZoomControl position="bottomright"/>
                      
                      <LayersControl position="topright" >
                        <LayersControl.Overlay  checked name="Users">
                          <LayerGroup>
                              {this.LoadUsers()}
                          </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay  checked name="Users who print on demand">
                          <LayerGroup>
                              {this.LoadPrints()}
                          </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay  checked name="Users with printers">
                          <LayerGroup>
                              {this.LoadPrinters()}
                          </LayerGroup>
                        </LayersControl.Overlay>
                      </LayersControl>
                  </MapContainer>

                </Row>
              </Container>
            </div>

          );
      }
};