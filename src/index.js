import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { logPageView, initGA } from './Ananlytics/Analystics';

// Tracker component to log page views on route change
const Tracker = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    initGA(); // initialize GA once
  }, []);

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Tracker>
        <App />
      </Tracker>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
