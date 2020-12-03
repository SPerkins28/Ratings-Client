import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Components/home/Home';
import SideDrawer from './Components/home/SideDrawer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setMovies([]);
  }

  return (
    <div className="App" id="appBody">
      <header className="App-header">
        <Router>
          <SideDrawer clickLogout={clearToken} sessionToken={sessionToken} updateToken={updateToken} />
          {/* {sessionToken && (<><SearchBar setMovies={setMovies} token={sessionToken}/>
          <Movies movies={movies} token={sessionToken}/></>)} */}
        </Router>
      </header>
    </div>
  );
}

export default App;