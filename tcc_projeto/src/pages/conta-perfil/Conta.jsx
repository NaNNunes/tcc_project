// verificar se o useEffect é o causador do impedimento de atualização do campo quando regex é ativado
// encontrar nova forma de carregar dados de user uma unica vez.

import Encerrar from "../../componentes/conta_perfil/Encerrar"
import Endereco from "../../componentes/Endereco"
import MinhaAssistencia from "../../componentes/assistencia/MinhaAssistencia"
import MinhasInfos from "../../componentes/conta_perfil/MinhasInfos"
import Seguranca from "../../componentes/conta_perfil/Seguranca"

// hook
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/userContext"
import { Navigate } from "react-router-dom"

// Importação dos estilos.
import styles from './Conta.module.css';

import { useUser } from "../../hooks/useUser.js";
import { useAssistencia } from "../../hooks/useAssistencia.js";
import { useEndereco } from "../../hooks/useEndereco.js"

const Conta = () => {
  const {userType, userId} = useContext(AuthContext);

  const { buscaUserById } = useUser();
  const { buscaAssistencias } = useAssistencia();
  const { buscaEnderecoById } = useEndereco();

  // verifica se user está logado
  if(localStorage.getItem("userType") === "Visitante") return <Navigate to="/login"/>
  
  const [userInfos, setUserInfos] = useState({});
  const [listaAssistencias, setListaAssistencia] = useState([]);
  const [userEndereco, setUserEndereco] = useState({});

  // busca dados do user
  useEffect(()=>  {
    async function fetcData() {
      const user = userType || localStorage.getItem("userType");
      const id = userId || localStorage.getItem("userId");

      try{
        // busca dados do user pelo id do localstorage
        const resBuscaDadosUserById = await buscaUserById(user, id);
        
        // atribuição ao state
        setUserInfos(resBuscaDadosUserById);
        // pega FK id_endereco --- realizar verificação de qual é o tipo de user antes da atribuição
        const idEnderecoUser = resBuscaDadosUserById.id_endereco;

        // buscar assistencias do user
        const resListaAssistencias = await buscaAssistencias();

        // define lista de assistencias encontradas
        setListaAssistencia(resListaAssistencias);

        // somente se solicitante ocorrera a busca aqui
        if(user === "solicitante"){
          // busca dados de endereco pela FK id_endereco
          const respBuscaEnderecoById = await buscaEnderecoById(idEnderecoUser);
          // atribuição ao state
          setUserEndereco(respBuscaEnderecoById);
        }
      }
      catch(error){
        console.log(error.message);
      }
    }
    fetcData();
  },[])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className={styles.formulario}>
        {/* infos do user */}
        <MinhasInfos 
          nome={userInfos.nome}
          sobrenome={userInfos.sobrenome}
          cpf={userInfos.cpf}
          email={userInfos.email}
          userTelefone={userInfos.userTelefone}
        />

        {/* infos da assistencia ou endereco do solicitante */}
        {
          (localStorage.getItem("userType") === "administrador")
            ?
              // verificacao de assistencia pertencente ao user por id, apenas no componente
              <MinhaAssistencia assistencias={listaAssistencias} admId={userInfos.id} />
            :
              <Endereco endereco={userEndereco}/>
        }
        <Seguranca/>

        {/*  verificação de certeza e definir registro de user como falso */}
        <Encerrar/>
      </div>
    </div>
  )
}

export default Conta