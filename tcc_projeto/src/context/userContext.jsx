import { useState, useEffect, createContext } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    // nao funciona
        // teoria id = possivel n + str
    const [userId, setUserId] = useState("");
    // nao funciona 2
    const [userType, setUserType] = useState("");
    const [usuarioNome, setUsuarioNome] = useState("")

    const setId = (data) =>{
        // nao funciona
        setUserId(data);
        //alternativa
        localStorage.setItem("userId", data);
    }

    const setType = (data) =>{
        setUserType(data);
        
        localStorage.setItem("userType", data === "solicitante" ? "solicitante" : "administrador");
    }

    // nome
    useEffect( () => {
        const nome  = localStorage.getItem("userName") || "Visitante"
        setUsuarioNome(nome)
    }, [])

    const login = (data) => {
        console.log("Usuário atual:", data)
        localStorage.setItem("userName", data.nome)
        localStorage.setItem("email", data.email)
        setUsuarioNome(data.nome)
    }

    const logout = () =>{
        localStorage.removeItem("userName")
        localStorage.removeItem("email")
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
