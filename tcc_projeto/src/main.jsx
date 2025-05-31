import './index.css'
import MyRouter from "./MyRouter.jsx";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <RouterProvider router={MyRouter}/>
    
  </StrictMode>
)