import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="663541887169-1soi53o5bdfpksm5ons6t9t0leig05ce.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>;
  </React.StrictMode>
);