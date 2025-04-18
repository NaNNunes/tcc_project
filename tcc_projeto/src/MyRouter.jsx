import { createBrowserRouter } from "react-router-dom";

//import pages
import App from "./App.jsx"
import Login from "./componentes/Login.jsx";
import ContaePerfil from "./componentes/ContaePerfil.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Login/>
            },
            {
                path: "/ContaePerfil",
                element: <ContaePerfil/>
            }
        ]
    }
])

export default router;