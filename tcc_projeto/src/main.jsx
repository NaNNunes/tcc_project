import './index.css'
import MyRouter from "./MyRouter.jsx";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/userContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={MyRouter}/>
    </AuthProvider>
  </StrictMode>
)