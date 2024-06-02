import '@/styles/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet
        defaultTitle="Rock, Paper, Scissors"
        titleTemplate="%s | Rock, Paper, Scissors"
        htmlAttributes={{ lang: 'en' }}
      />

      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
