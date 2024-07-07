import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider} from 'react-redux';
import store from './store/ReduxStore.js';
import {BrowserRouter} from 'react-router-dom';
import {MantineProvider } from '@mantine/core';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
    <Provider store= {store}>
      <BrowserRouter>
       <App/>
       </BrowserRouter>
    </Provider>
    </MantineProvider>
  </React.StrictMode>,
)
