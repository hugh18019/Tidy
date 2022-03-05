import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './utils/reducers';

const store = createStore(reducer);

// App2.js is used
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
              <App />
          </ThemeProvider>
        </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
