import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { RefreshContextProvider } from './refreshcontext/refreshContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RefreshContextProvider>
    <BrowserRouter >
    <App />
    </BrowserRouter  >
    </RefreshContextProvider>

  </React.StrictMode>,
)
