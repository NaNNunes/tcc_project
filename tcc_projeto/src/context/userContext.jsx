// TO DO refatorar codigo onde é pego id e type do user pelo localstorage
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState("");

    const [usuarioNome, setUsuarioNome] = useState("")

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
        localStorage.setItem("isLogado", "sim");

        setUserId(data.id);
        setUserType(tipoUser);

        setUsuarioNome(data.nome)
    }

    const logout = () =>{
        setUsuarioNome("Visitante")
    }

    return (
        <AuthContext.Provider 
            value={{usuarioNome, login, logout, userId, setId, userType, setType}}
        >
            {children}
        </AuthContext.Provider>
    )
}
