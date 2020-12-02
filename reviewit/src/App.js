import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/home/Navbar';
import SearchBar from './Components/home/SearchBar';
import Movies from './Components/Movies/Movies';
import ReviewTable from './reviews/popups/ReviewTable';

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [movies, setMovies] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    fetchReviews()
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setMovies([]);
  }

  const fetchReviews = () => {
    fetch('https://re-view-it.herokuapp.com/review/mine', {
          method: 'GET',
          headers: new Headers ({
            'Content-Type': 'application/json',
            'Authorization': sessionToken
        })
    })
    .then((res) => res.json())
    .then((myreviews) => {
        setUserReviews(myreviews)
        console.log(myreviews)
    })

  }

  return (
    <div className="App" id="appBody">
      <header className="App-header">
        <NavBar clickLogout={clearToken} sessionToken={sessionToken} updateToken={updateToken}/>
        {sessionToken && (<><SearchBar setMovies={setMovies} token={sessionToken}/>
        <Movies movies={movies} token={sessionToken}/></>)}
      </header>
        <ReviewTable userReviews={userReviews}/>
    </div>
  );
}

export default App;