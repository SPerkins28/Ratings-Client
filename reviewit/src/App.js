import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './Components/home/SearchBar';
import SideDrawer from './Components/home/SideDrawer';
import Movies from './Components/Movies/Movies';
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

  // const fetchReviews = () => {
  //   fetch('https://re-view-it.herokuapp.com/review/mine', {
  //         method: 'GET',
  //         headers: new Headers ({
  //           'Content-Type': 'application/json',
  //           'Authorization': sessionToken
  //       })
  //   })
  //   .then((res) => res.json())
  //   .then((userReviews) => {
  //       setUserReviews(userReviews)
  //       console.log(userReviews)
  //   })
  // }

  return (
    <div className="App" id="appBody">
      <header className="App-header">
      </header>
        <Router>
          <SideDrawer clickLogout={clearToken} sessionToken={sessionToken} updateToken={updateToken} />
          {sessionToken && (<><SearchBar setMovies={setMovies} token={sessionToken}/>
          <Movies movies={movies} token={sessionToken}/></>)}
        </Router>
    </div>
  );
}

export default App;