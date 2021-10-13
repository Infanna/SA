import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Bodys from "./Components/Bodys";
import UserList from "./Components/UserList";


export default function App() {

  return (
 
    <Router>
 
      <div>
 
        <Navbar />
 
        <Switch>
 
          <Route exact path="/" component={UserList} />
 
          <Route exact path="/create" component={Bodys} />
 
        </Switch>
 
      </div>
 
    </Router>
 
  );
 
 }
