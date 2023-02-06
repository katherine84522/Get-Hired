import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        });
      }
    });
  }, []);

  // if (!isAuthenticated) {
  //   return <div><h2>Not Authenticated</h2></div>;
  // }
  return (
    <div className="app">
      <Router>{isAuthenticated ? <LoggedIn setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /> : <LoggedOut setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} />}</Router>
    </div>
  );
};

export default App;
