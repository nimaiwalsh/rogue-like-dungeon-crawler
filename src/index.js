import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { injectGlobal } from 'emotion';

injectGlobal`

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    /*Default size is 16px*/
    /* 1rem = 10px, 10px/16px = 62.5% */
    font-size: 62.5%; 
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    line-height: 1.6;
  }
`

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
