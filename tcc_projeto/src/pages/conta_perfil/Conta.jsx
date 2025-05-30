import EditarPag from "../../componentes/conta_perfil/EditarPag"
import Encerrar from "../../componentes/conta_perfil/Encerrar"
import Endereco from "../../componentes/Endereco"
import MinhasInfos from "../../componentes/conta_perfil/MinhasInfos"
import Seguranca from "../../componentes/conta_perfil/Seguranca"

// hook
import { useEffect, useState } from "react"


const Conta = () => {
  const [userInfos, setUserInfos] = useState({});
  //
  useEffect(()=>  {
    async function fetcData() {
      const userType = localStorage.getItem("userType");
      console.log(userType);
      const userId = localStorage.getItem("userId");
      try{
        const request = await fetch(`http://localhost:5001/${userType}/${userId}`);

        const response = await request.json();

        setUserInfos(response)
      }
      catch(error){
        console.log(error.message);
      }
    }
    fetcData();
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
        localStorage.getItem("userType") == "administrador" 
          ? <EditarPag/>
          : <Endereco/>
      }
      <Seguranca/>
      <Encerrar/>
    </>
  )
}

export default Conta