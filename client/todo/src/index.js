import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserProvider';
import App from './App';
import './css/App.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
   <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
 
);

