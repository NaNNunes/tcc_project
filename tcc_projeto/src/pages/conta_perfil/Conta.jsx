import EditarPag from "../../componentes/conta_perfil/EditarPag"
import Encerrar from "../../componentes/conta_perfil/Encerrar"
import Endereco from "../../componentes/Endereco"
import MinhasInfos from "../../componentes/conta_perfil/MinhasInfos"
import Seguranca from "../../componentes/conta_perfil/Seguranca"

// hook
import { useContext, useEffect, useState } from "react"
import { useEndereco } from "../../hooks/useApi"
import { AuthContext } from "../../context/userContext"
import { Navigate } from "react-router-dom"

const Conta = () => {
  const {usuarioNome, userType, userId} = useContext(AuthContext);
  if(localStorage.getItem("usuarioNome") === "Visitante") return <Navigate to="/login"/>
  
  const [userInfos, setUserInfos] = useState({});
  const [userEndereco, setUserEndereco] = useState({});

  // busca dados do user
  useEffect(()=>  {
    async function fetcData() {
      // const userType = localStorage.getItem("userType");
      // console.log(userType);
      // const userId = localStorage.getItem("userId");
      try{
        const request = await fetch(`http://localhost:5001/${userType}/${userId}`);
        const response = await request.json();

        setUserInfos(response);

        // POG
        const reqBuscaEnderecoById = await fetch(`http://localhost:5001/endereco/${response.id_endereco}`)
        const respBuscaEnderecoById = await reqBuscaEnderecoById.json();
        
        setUserEndereco(respBuscaEnderecoById);
      }
      catch(error){
        console.log(error.message);
      }
    }
    fetcData();
    //  acompanhamento de context
    console.log("Context --- Conta: ", (userType));
  },[])

  return (
    <>
      <MinhasInfos 
        nome={userInfos.nome}
        sobrenome={userInfos.sobrenome}
        email={userInfos.email}
        userTelefone={userInfos.userTelefone}
      />
      {
        localStorage.getItem("userType") === "administrador" 
          ? <EditarPag />
          : <Endereco 
              endereco={userEndereco}
            />
      }
      <Seguranca/>

      {/*  verificação de certeza e definir registro de user como falso */}
      <Encerrar/>
    </>
  )
}

export default Conta