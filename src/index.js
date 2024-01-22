import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import reportWebVitals from './reportWebVitals';

import { RouterProvider, } from "react-router-dom";
import router from './router';
import SocketProvider from './components/socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <SocketProvider>
    <RouterProvider router={router} />
  </SocketProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
