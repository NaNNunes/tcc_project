import { useContext } from "react";

import { AuthContext } from "../context/userContext";

const url = import.meta.env.VITE_API_URL;

// cadastro de user
export function useUser() {
  // funçoes do context para salvar id e tipo de user
  const { setId, userId, setType, userType, setNome } = useContext(AuthContext);

    // altera senha do user
    const alteraSenhaUser = async (senha) =>{

        const newSenha = {
            "senha": senha
        }
        
        fetch(`${url}/${userType}/${userId}`,{
            method: "PATCH",
            body: JSON.stringify(newSenha)
        })

        location.reload();
    }

    // atualiza infos do user
    const atualizaInfosUser = async (data) => {

        const user = localStorage.getItem("userType");
        const id = localStorage.getItem("userId");

        const request = await fetch(`${url}/${user}/${id}`,{
            method: "PATCH",
            body: JSON.stringify(data)
        })
        location.reload();
    }

    // busca user pelo id e o tipo de usuario
    const buscaUserById = async (tipoUser ,idUser) =>{
        const request = await fetch(`${url}/${tipoUser}/${idUser}`);
        const response = await request.json();

        return response;
    }

    // buscar users
    const buscaSolicitantes = async () =>{
        const request = await fetch(`${url}/solicitante`);
        const response = await request.json();

        return response;
    }

    // busca pseudo solicitantes vinculados a assistencia do adm
    const buscarSolicitantesAssistencia = async(assistencias) =>{
        const request = await fetch(`${url}/solicitante`);
        const response = await request.json();

        // corrigir, pois esta buscando todos os solicitantes
        const solicitantes = assistencias
            .flatMap(assistencia => response
            .filter(solicitante => 
                solicitante.idAssistencia === assistencia.id 
                
            ));

        console.log(assistencias);
        console.log("solicitantes:", solicitantes);
    }

    // buscar users
    const buscaAdministradores = async () =>{
        const request = await fetch(`${url}/administrador`);
        const response = await request.json();

        return response;
    }

    // cadastra user
    const cadastrarInfosUser = async (data, userType) => {
        // TROQUE DE "userType" para "tipoUsuario".
        const request = await fetch(`${url}/${userType}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await request.json();
        const id = response.id;

        // alternativa definir id no localstorage
        setId(id);
        setNome(response.nome);

        // user invalido pois falta endereco e/ou pergunta de segurança
        const isValidacaoInserida = await inserirValidacao(false);

        if(isValidacaoInserida){
            return request.ok;
        }
    }

    // cadastra solicitante presencial
    const cadastrarPseudoUser = async (data, idAssistencia) =>{

        // separando dados de solicitante presencial        
        const dadosPseudoUser = {
            "email": data.email,
            "cpf": data.cpf,
            "userTelefone": data.userTelefone,
            "nome": data.nome,
            "sobrenome": data.sobrenome,
            "isValido": false,
            "idAssistencia": idAssistencia
        }

        const request = await fetch(`${url}/solicitante`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(dadosPseudoUser)
        });
        const response = await request.json();
        return response.id;
    }

    // define validaçao do user
    const inserirValidacao = async (isValido) =>{
        const id = localStorage.getItem('userId');
        const user = localStorage.getItem('tipoUsuario');

        const request = await fetch(`${url}/${user}/${id}`,{
            method:"PATCH",
            body: JSON.stringify({"isValido":isValido})
        })

        return request.ok;
    }
    
    // adiciona pergunta de segurança
    const inserirPerguntaResposta = async (data) => {

        const id = localStorage.getItem("userId");
        const user = localStorage.getItem("tipoUsuario");

       await fetch(`${url}/${user}/${id}`,{
            method: "PATCH",
            body: JSON.stringify(data)
        })
    }

    // verificar senha informada pelo user
    const verificaSenhaInformada = async (senha) => {
        const user = userType || localStorage.getItem("userType");
        const id = userId || localStorage.getItem("userId");

        const request = await fetch(`${url}/${user}/${id}`);
        const response = await request.json();

        // compara senha inserida com senha do user
        return (senha === response.senha);
    }

    return {
        atualizaInfosUser,
        alteraSenhaUser,
        buscaAdministradores,
        buscaSolicitantes,
        buscarSolicitantesAssistencia,
        buscaUserById,
        cadastrarInfosUser,
        cadastrarPseudoUser,
        inserirPerguntaResposta,
        inserirValidacao,
        verificaSenhaInformada
    }
}