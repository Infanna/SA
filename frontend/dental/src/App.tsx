import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Bodys from "./Components/Bodys";
import UserList from "./Components/UserList";
import Login from "./Components/Login";



export default function App() {

  return (
 
    <Router>
 
      <div>
 
        <Navbar />


        Heelo
 
        <Switch>

          <Route exact path="/" component={Login} />

          <Route exact path="/list" component={UserList} />
 
          <Route exact path="/create" component={Bodys} />

        </Switch>
 
      </div>
 
    </Router>
 
  );
 
 }
