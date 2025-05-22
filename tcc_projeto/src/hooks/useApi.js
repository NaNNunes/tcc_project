import axios from "axios";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;


export function useVerificadorDeCpf(){
    const verificador = (cpfStr = "00000000000") => {
        // verifica se todos os digitos são repetidos | obs: da pra fazer um laço e comparar
        if (
            (cpfStr == "00000000000") || (cpfStr == "11111111111") || (cpfStr == "22222222222") || 
            (cpfStr == "33333333333") || (cpfStr == "44444444444") || (cpfStr == "55555555555") || 
            (cpfStr == "66666666666") || (cpfStr == "77777777777") || (cpfStr == "88888888888") ||
            (cpfStr == "99999999999") 
        ) {
            console.log("cpf não válido: ", cpfStr);
            return false;
        }

        let cpfDigitos = [];
        let verificador = [];
        // aux
        let multiplicador = 0;
        let somaProdutos = 0;
        let resto_somaProd = 0;
        // passando digitos
        for (let i = 0; i < cpfStr.length; i++) {
            (!(isNaN(cpfStr[i]))) && cpfDigitos.push(cpfStr[i]);
        }

        // verificador
        for (let i = 0; i < 2; i++) {
            somaProdutos = 0;
            multiplicador = 10+i; // posicao do verificador no cpf

            for(let c = 0; c < 9+i ; c++){
                somaProdutos += (cpfDigitos[c] * multiplicador--);
            }
            resto_somaProd = somaProdutos % 11;
            verificador[i] = ((resto_somaProd == 0) || (resto_somaProd == 1) ? 0 : (11 - resto_somaProd));
        }
    
        return ((verificador[0] == cpfStr[cpfStr.length - 2]) && (verificador[1] == cpfStr[cpfStr.length - 1]));
    }

    return {verificador};
}

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