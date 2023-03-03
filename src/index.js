import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RectanglesProvider } from './state/RectanglesState';

ReactDOM.render(
  <RectanglesProvider>
    <App />
  </RectanglesProvider>,
  document.getElementById('root')
);
