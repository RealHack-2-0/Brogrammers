import React from 'react';
import { timeout } from 'q';

export function login(email, password) {
  
  return dispatch => {
    fetch('http://172.16.41.11:3000/login', {
      method: 'POST',
      // mode:"no-cors",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(r => {
        console.log("sign",r);
        localStorage.setItem('user',r.data)
        
      });

    function success(user) {
      localStorage.setItem('user',user)
    }
    function failure() {
      localStorage.removeItem('user')
    }
  };
}

export function logout() {
  return dispatch => {
    dispatch(logoutSuccess());
  };
  function logoutSuccess() {
    localStorage.removeItem('user')
  }
}
