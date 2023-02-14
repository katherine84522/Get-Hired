import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState("Light")

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

  const handleThemeSwitch = () => {
    setTheme(theme === "Dark" ? "Light" : "Dark");
    console.log(theme)
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }



  return (
    <div className="h-screen dark:bg-black bg-[#f0ede9]" >
      <Router>{isAuthenticated ? <LoggedIn theme={theme} currentUser={currentUser} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} handleThemeSwitch={handleThemeSwitch} setTheme={setTheme} /> : <LoggedOut setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} handleThemeSwitch={handleThemeSwitch} setTheme={setTheme} theme={theme} />}</Router>
    </div>
  );
};

export default App;
