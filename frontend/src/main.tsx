// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mysten/dapp-kit/dist/index.css';
import App from './App.tsx'
import './index.css'
import { Providers } from './Providers.tsx' // Import Providers

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
)