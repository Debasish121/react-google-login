import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './App.css';
import ProfilePage from './components/ProfilePage';

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Detect if the app is opened within the Instagram in-app browser
    const isInstagram = window.navigator.userAgent.includes('Instagram');
    // If opened within Instagram, set a flag in localStorage
    if (isInstagram) {
      window.open("https://react-google-login-4ebf.vercel.app/", "_system");
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        if (err.response) {
          // If the error has a response object, use the status and statusText
          setError(`Error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          // If the error is due to a failed request, use a generic error message
          setError('Failed to fetch user information. Please try again.');
        } else {
          // Otherwise, use the error message itself
          setError(err.message);
        }
      }
    },
    onError: (error) => {
      console.error(error);
      setError('Failed to authenticate. Please try again later.');
    },
  });

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const handleGoToLogin = () => {
    setError(null); // Clear error message when going to login
  };

  return (
    <div className="app">
      {error && (
        <div className="error">
          <p>{error}</p>
          <button className="errorButton" onClick={handleGoToLogin}>Go to Login</button>
        </div>
      )}
      {!user && !error && (
        <button className="login" onClick={login}>
          Sign in with Google 🚀
        </button>
      )}
      {user && <ProfilePage user={user} onLogout={logout} />}
    </div>
  );
};

export default App;
