import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
