import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './Components/home/Navbar';
import SearchBar from './Components/home/SearchBar';
import Movies from './Components/Movies/Movies';

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

  // const protectedViews = () => {
  //   return(sessionToken === localStorage.getItem('token') ? <SearchBar setMovies={setMovies} token={sessionToken}/>
  // //   : null)
  // }
  console.log(movies);

  return (
    <div className="App" id="appBody">
      <header className="App-header">
        <NavBar clickLogout={clearToken} sessionToken={sessionToken} updateToken={updateToken}/>
        {sessionToken && (<><SearchBar setMovies={setMovies} token={sessionToken}/>
        <Movies movies={movies} token={sessionToken}/></>)}
      </header>
    </div>
  );
}

export default App;