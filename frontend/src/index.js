
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';


// Suppress noisy runtime errors injected by browser extensions (e.g. MetaMask inpage script)
// We specifically prevent errors that mention MetaMask or inpage so the app doesn't show
// the red overlay for extension-related failures that are outside app control.
window.addEventListener('error', (event) => {
  try {
    const msg = String(event && event.message ? event.message : '');
    if (/MetaMask|inpage|Failed to connect to MetaMask/i.test(msg)) {
      // prevent the error from surfacing to DevTools error overlay
      event.preventDefault();
      // keep a console warning for diagnostics
      // eslint-disable-next-line no-console
      console.warn('Suppressed extension error:', msg);
    }
  } catch (e) {
    // swallow any handler errors
  }
});

window.addEventListener('unhandledrejection', (event) => {
  try {
    const reason = event && event.reason ? event.reason : '';
    const msg = typeof reason === 'string' ? reason : (reason && reason.message) ? reason.message : '';
    if (/MetaMask|inpage|Failed to connect to MetaMask/i.test(String(msg))) {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.warn('Suppressed extension promise rejection:', msg);
    }
  } catch (e) {
    // swallow
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
