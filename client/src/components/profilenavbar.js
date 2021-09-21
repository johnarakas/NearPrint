

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";



const ProfileNavbar = () => {
  
    
    return (
      <div style={{textAlign:"center"}}>
      
      <div style={{display:"inline-block"}}>
        <NavLink className="nav-link" style={{color:"black"}} to="/project">Projects</NavLink>
        </div>
      <div style={{display:"inline-block"}}>
        <NavLink className="nav-link" style={{color:"black"}} to="/profile">Settings</NavLink> 
      </div>
        
        
    </div>
    );
  };
  
  export default ProfileNavbar;