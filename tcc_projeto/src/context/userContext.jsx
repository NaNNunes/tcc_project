import { useState, useEffect, createContext } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    // nao funciona 1
        // teoria state é asincrono
    const [userId, setUserId] = useState("");
    // nao funciona 2
    const [userType, setUserType] = useState("");
    const [usuarioNome, setUsuarioNome] = useState("")

    // define id do user
    const setId = (data) =>{
        // nao funciona
        setUserId(data);
        //alternativa
        localStorage.setItem("userId", data);
        console.log("user ID:",localStorage.getItem("userId"));
    }

    // define tipo do user
    const setType = (data) =>{
        setUserType(data);
        localStorage.setItem("userType", data);
        console.log("user selecionado:",localStorage.getItem("userType"));
    }

    // nome
    useEffect( () => {
        const nome  = localStorage.getItem("userName") || "Visitante"
        setUsuarioNome(nome)
    }, [])

    const login = (data) => {
        localStorage.setItem("isLogado", "sim");
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
