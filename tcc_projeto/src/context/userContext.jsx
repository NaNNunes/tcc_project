// TO DO refatorar codigo onde é pego id e type do user pelo localstorage
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [userId, setUserId] = useState();
    const [userType, setUserType] = useState();
    const [isLogado, setIsLogado] = useState();
    const [usuarioNome, setUsuarioNome] = useState();

    // define id do user
    const setId = (data) =>{
        setUserId(data);
        localStorage.setItem('userId',data);
    }

    // define tipo do user
    const setType = (data) =>{
        setUserType(data);
        localStorage.setItem('userType', data);
    }

    // nome
    useEffect( () => {
        const nome  = localStorage.getItem("userName") || "Visitante"
        setUsuarioNome(nome)
    }, [])

    const login = (data, tipoUser) => {
        localStorage.clear();
        setUserId(data.id);

        setUserType(tipoUser);
        localStorage.setItem("userType", tipoUser);
        
        setUsuarioNome(data.nome)
        localStorage.setItem("isLogado", true);
    }

    const logout = () =>{
        setUsuarioNome("Visitante");
        localStorage.setItem("userType", "Visitante");
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
