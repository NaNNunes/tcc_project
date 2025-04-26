import axios from "axios";
import { useEffect, useState } from "react";

// consulta de endereco por cep na api de brasil api
export function getEnd_API(cep){
    const urlCep = "https://brasilapi.com.br/api/cep/v1/"+cep;

    async function  fetchData() {
        try {
            const response = await axios.get(urlCep);
            const endereco = await response.data;
            console.log("Endereço localizado na API de CEP:",endereco);
            addEndereco(endereco);
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
            getEnd_local_API(data.id)
        } catch (error) {
            console.log(error);
        }
    }
    fetchData();
}

//localiza cep na api local
export function getEnd_local_API(id){
    const url = import.meta.env.VITE_API_URL;
    async function fetchData() {
        try{
            const response = await fetch(`${url}/${id}`);
            const data = await response.json();
            console.log("Endereço localizado na API local: ", data);
            return data;
        }
        catch (error){
            console.log(error);
        }
    }
    fetchData();
}