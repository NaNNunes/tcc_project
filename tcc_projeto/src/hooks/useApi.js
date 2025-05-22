import axios from "axios";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;

// consulta de endereco por cep na api de brasil api
export function getEnd_API(cep){
    const urlCep = "https://brasilapi.com.br/api/cep/v1/"+cep;

    async function  fetchData() {
        try {
            const response = await axios.get(urlCep);
            const endereco = await response.data;
            console.log("Endereço localizado na API de CEP:",endereco);
            addEndereco(endereco); // funcao para depositar endereco na api local
        } catch (error) {
            alert("Nenhum local encontrado com este CEP");
            console.log(error);
        }
    }
    fetchData();
}

//add cep na api local
function addEndereco(endereco){
    const url = import.meta.env.VITE_API_URL;
    async function fetchData() {
        try {
            const response = await fetch(url,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(endereco)
            })

            const data = await response.json();
            console.log("CEP adicionado na API local: ",data)
        } catch (error) {
            console.log(error);
        }
    }
    fetchData();
}

//localiza cep na api local
export function getEnd_local_API(){
    const [enderecos, setEndereco] = useState([])
    const url = import.meta.env.VITE_API_URL;
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(url);
                const data = await response.json();
                setEndereco(data);
            }
            catch (error){
                console.log(error);
            }
        }
        fetchData();
    }, [])
    return enderecos;
}


export function useCadastraUser(){
    const inserirInfoAcessoSolicitante = async (data) => {
        const request = await fetch(`${url}/solicitante`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await request.json();
        console.log(response.id);
        return response.id;
    }

    return {inserirInfoAcessoSolicitante};
}