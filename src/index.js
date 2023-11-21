import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesPag from './routes';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutesPag />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter>
  </React.StrictMode>
);


