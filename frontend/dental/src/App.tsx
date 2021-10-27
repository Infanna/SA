
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Navbar from "./Components/Navbar";
import Bodys from "./Components/Bodys";
import UserList from "./Components/UserList";
import SignIn from "./Components/SignIns";
import Home from "./Components/Home";




export default function App() {
  const [token, setToken] = React.useState<String>("");

  useEffect(() => {
    const getToken = localStorage.getItem("uid");
    if (getToken) {
      setToken(getToken);
    }
  }, []);
  console.log("Token",token)

  if (!token) {
    return <SignIn />
  }

  return (

    <Router>
      {token && (
        <>
        <div>

          <Navbar />

          <Switch>

            <Route exact path="/" component={Home} />

            <Route exact path="/list" component={UserList} />

            <Route exact path="/create" component={Bodys} />

          </Switch>

        </div>
        </>
      )}
    </Router>

  );

}
