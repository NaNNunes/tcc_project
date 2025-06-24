import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const [usuarioNome, setUsuarioNome] = useState();

    // define id do user
    const setId = (data) =>{
        console.log('userType',data);
        setUserId(data);
        localStorage.setItem('userId',data);
    }

    // define tipo do user
    const setType = (data) =>{
        console.log('userType',data);
        setUserType(data);
        localStorage.setItem('userType', data);
    }

    useEffect( () => {
        const nome  = localStorage.getItem("userName") || "Visitante"
        const user = localStorage.getItem("userType") || "Visitante"
        setUsuarioNome(nome);
        setUserType(user);
    }, []);

    const login = (data, tipoUser) => {
        // reset
        localStorage.clear();
        // novo acesso
        setId(data.id);
        setType(tipoUser);
        setUsuarioNome(data.nome);
        localStorage.setItem("userName", data.nome); 
    }

    const logout = () =>{
        localStorage.setItem("userType","Visitante");
        localStorage.setItem("userName", "Visitante"); 
        localStorage.removeItem("userId");
        location.reload();
    }

    return (
        <AuthContext.Provider 
            value={
                {
                    usuarioNome,  
                    userId, setId,
                    userType, setType,
                    login, logout
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}
