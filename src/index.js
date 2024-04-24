import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import Quiz from './components/Quiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Quiz />
  </React.StrictMode>
);

// When strict mode is on, in development, it will render twice, so if there is an error message etc., we may see it appear twice