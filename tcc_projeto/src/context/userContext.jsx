import { useState, useEffect, createContext } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

    const [usuarioNome, setUsuarioNome] = useState("")

    const [dadosUser, setDadosUser] = useState({});

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

    const salvaDadosUser = (dados) =>{
        for(const [key, value] of Object.entries(dados)){
            localStorage.setItem(key, value);
        }
    }
    
    return (
        <AuthContext.Provider value={{usuarioNome, login, logout, dadosUser, salvaDadosUser}}>
            {children}
        </AuthContext.Provider>
    )
}
