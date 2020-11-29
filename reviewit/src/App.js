import React, {useState, useEffect} from 'react';
import Navbar from './home/Navbar';
import Auth from './auth/Auth';
import ReviewIndex from './reviews/ReviewIndex';

function ClientApp() {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessoinToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return(sessoinToken === localStorage.getItem('token') ? <ReviewIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
      <Navbar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default ClientApp;