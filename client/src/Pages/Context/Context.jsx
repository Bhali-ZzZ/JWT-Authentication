import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const url = "https://jwtauthentication-tu3l.onrender.com";

  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
  });

  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [auth.token]);

  // Log the username when auth state changes
  useEffect(() => {
    if (auth.user) {
      console.log(auth.user.username);
    }
  }, [auth.user]);

  const login = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: '', user: null });
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <StoreContext.Provider value={{ url, login, logout, auth }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
