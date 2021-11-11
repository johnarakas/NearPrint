import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app

import Login from "./components/login";
import Signup from "./components/signup";
import Homepage from "./components/homepage";
import Profile from "./components/profile";
import Project from "./components/projects";
import Map from "./components/map";
import AddressesList from "./components/AddressesList";
import ProffileButtons from "./components/ProffileButtons";
import AddAddress from "./components/AddAddress";
import ShowcaseProjects from "./components/ShowcaseProjects";



const App = () => {
  return (
    <div>
      
      <Route path="/ShowcaseProjects">
        <ShowcaseProjects />
      </Route>
      <Route exact path="/addresses">
        <AddressesList />
      </Route>
      <Route exact path="/addaddress">
        <AddAddress />
      </Route>
      
      <Route exact path="/proffilebuttons">
        <ProffileButtons />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
      
      <Route exact path="/homepage">
        <Homepage />
      </Route>
      
      <Route exact path="/profile">
        <Profile />
      </Route>
      
      
      <Route exact path="/map">
        <Map />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>
      
      
      
      <Route path="/project">
        <Project />
      </Route>
    </div>
  );
};

export default App;