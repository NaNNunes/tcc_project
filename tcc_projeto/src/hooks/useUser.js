import { useContext } from "react";

import { AuthContext } from "../context/userContext";

const url = import.meta.env.VITE_API_URL;

// cadastro de user
export function useUser() {
  // funçoes do context para salvar id e tipo de user
  const { setId, userId, setType, userType } = useContext(AuthContext);

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
    
    // lista todos os likes
    const buscaAssistenciasFavoritas = async() =>{
        const request = await fetch(`${url}/assistencia_Fav_Solicitante`);
        const response = await request.json();

        return response;
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

        // user invalido pois falta endereco e/ou pergunta de segurança
        const isValidacaoInserida = await inserirValidacao(false);

        if(isValidacaoInserida){
            return request.ok;
        }
    }

    // cadastra solicitante presencial
    const cadastrarPseudoUser = async (data) =>{

        // separando dados de solicitante presencial        
        const dadosPseudoUser = {
            "email": data.email,
            "cpf": data.cpf,
            "userTelefone": data.userTelefone,
            "nome": data.nome,
            "sobrenome": data.sobrenome,
            "isValido": false
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

    // favorita assistencia
    const favoritarAssistencia = async (data) =>{

        const request = await fetch(`${url}/assistencia_Fav_Solicitante`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });

        const response = await request.json();

        if(request.ok){
            console.log("assistencia favoritada:", response);
            location.reload();
            return response.id;
        }
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

    // remove assistencia da lista de favoritos
    const removerAssistenciaDeFavoritos = async (id) =>{
        const request = await fetch(`${url}/assistencia_Fav_Solicitante/${id}`,{
            method: "DELETE",
        });

        const response = await request.json();

        if(request.ok){
            console.log("Assistencia removida de favoritos:", response);
            location.reload();
        }
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
        buscaAssistenciasFavoritas,
        buscaAdministradores,
        buscaSolicitantes,
        buscaUserById,
        cadastrarInfosUser,
        cadastrarPseudoUser,
        favoritarAssistencia,
        inserirPerguntaResposta,
        inserirValidacao,
        removerAssistenciaDeFavoritos,
        verificaSenhaInformada
    }
}