import { createBrowserRouter } from "react-router-dom";

//import pages
import App from "./App.jsx"
import Login from "./componentes/Login.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Login/>
            }
        ]
    }
])

export default router;