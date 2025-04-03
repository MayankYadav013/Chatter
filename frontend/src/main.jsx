import React from 'react';
import RactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./context/AuthProvider.jsx"
import { BrowserRouter } from 'react-router-dom';

RactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
