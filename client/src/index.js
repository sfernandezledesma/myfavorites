import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import DarkTheme from './components/DarkTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import GlobalState from './components/GlobalState';

ReactDOM.render(
  <DarkTheme>
    <CssBaseline />
    <GlobalState>
      <App />
    </GlobalState>
  </DarkTheme>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
