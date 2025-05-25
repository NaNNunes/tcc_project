import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/userContext";

const url = import.meta.env.VITE_API_URL;

// verificador de cpf valido
export function useVerificadorDeCpf(){
    const verificador = (cpfStr = "000.000.000-00") => {

        // verifica se todos os digitos são repetidos | obs: da pra fazer um laço e comparar
        if (
            (cpfStr == "000.000.000-00") || (cpfStr == "111.111.111-11") || (cpfStr == "222.222.222-22") || 
            (cpfStr == "333.333.333-33") || (cpfStr == "444.444.444-44") || (cpfStr == "555.555.555-55") || 
            (cpfStr == "666.666.666-66") || (cpfStr == "777.777.777-77") || (cpfStr == "888.888.888-88") ||
            (cpfStr == "999.999.999-99") 
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
        // DV  informado é igual ao DV esperado?
        return ((verificador[0] == cpfStr[cpfStr.length - 2]) && (verificador[1] == cpfStr[cpfStr.length - 1]));
    }
    return {verificador};
}

// verificador de cnpj
export function useVerificadorDeCnpj(){

    const verificador = (cnpjStr = "00.000.000/0000-00") =>{
        // filtro de validação
        if(
            (cnpjStr == "00.000.000/0000-00") || (cnpjStr == "11.111.111/1111-11") || (cnpjStr == "22.222.222/2222-22") || 
            (cnpjStr == "33.333.333/3333-33") || (cnpjStr == "44.444.444/4444-44") || (cnpjStr == "55.555.555/5555-55") || 
            (cnpjStr == "66.666.666/6666-66") || (cnpjStr == "77.777.777/7777-77") || (cnpjStr == "88.888.888/8888-88") || 
            (cnpjStr == "99.999.999/9999-99")
        ){
            return false;
        }

        let cnpjDigitos = [];
        let digitoVerificador = [];

        // não precisa entender, so confia
        let multiplicador = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let somaProdutos;
        let resto_somaProd;

        // passagem de valores 
        for(let i = 0; i < cnpjStr.length; i++){
            (!(isNaN(cnpjStr[i]))) && cnpjDigitos.push(cnpjStr[i]);
        }

        // gambiar-... verificação de digitos validadores
        for(let i = 1; i >= 0; i--){
            // restart de auxiliares
            somaProdutos = 0;
            resto_somaProd = 0;

            // motivo da estrutura do multiplicador
                // a multiplicação dos digitos do cnpj começa em cinco e desce até 2 depois reinicia em 9 até 2
                // para o segundo DV começa em 6 e vai até 2, depois reinicia em 9
            let inicio = i;
            
            // limite do laço
                // se primeiro DV 12 senao 13
            let limite = (i == 1) ? 12 : 13

            // soma dos produtos
            for (let c = 0; c < limite; c++){
                somaProdutos += cnpjDigitos[c] * multiplicador[inicio]
                inicio++;
            }

            // resto da divisao entre soma dos produtos do digitos e 11
            resto_somaProd = (somaProdutos % 11);
            // definiçao do DV
            digitoVerificador[i] = ((resto_somaProd == 0) || (resto_somaProd == 1)) ? 0 : (11 - resto_somaProd);
        }

        // devido a gambi.. ao laço ser decrescente a verificação é invertida
        return (
            (digitoVerificador[0] == cnpjDigitos[(cnpjDigitos.length-1)])
            &&
            (digitoVerificador[1] == cnpjDigitos[(cnpjDigitos.length-2)])
        );
    }

    return {verificador};
}

// cadastro de user
export function useCadastroUser(){

    // funçoes do context para salvar id e tipo de user
    const {setId, setType} = useContext(AuthContext);
    
    // cadastra user
    const cadastrarInfosUser = async (data) => {
        // define o tipo de user
        const user = (data.userCategoria == 1) ? "solicitante" : "administrador"

        const request = await fetch(`${url}/${user}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await request.json();
        const id = await response.id;

        // nao funciona
        setId(id);
        // console.log("userId:", localStorage.getItem("userId"));
        setType(data.userCategoria);

        // user invalido pois falta endereco e/ou pergunta de segurança
        inserirValidacao(false);
    }

    // define validaçao do user
    const inserirValidacao = async (isValido) =>{
        const id = localStorage.getItem("userId");
        const user = localStorage.getItem("userType")

        await fetch(`${url}/${user}/${id}`,{
            method:"PATCH",
            body: JSON.stringify({"isValido":isValido})
        })
    }

    // adiciona pergunta de segurança
    const inserirPerguntaResposta = async (data) => {
        const id = localStorage.getItem("userId");
        const user = localStorage.getItem("userType")

       await fetch(`${url}/${user}/${id}`,{
            method: "PATCH",
            body: JSON.stringify(data)
        })
    }

    return {cadastrarInfosUser, inserirPerguntaResposta};
}

export function useEndereco(){
    // insere endereço no cadastro
    const inserirEndereco = async (data, user) =>{
        const id = localStorage.getItem("userId");
        await fetch(`${url}/${user}/${id}`,{
            method:"PATCH",
            body: JSON.stringify(data)
        })
    }

    return {inserirEndereco};
}

export function useCadastroAssistencia(){

    const cadastrarAssistencia = async (data) => {
        const request = await fetch(`${url}/assistencia`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })

        const response = await request.json();
        const id = await response.id;
        inserirAdministrador(id);
    }

    const inserirAdministrador = async (id) => {
        const administrador = {
            "administradorId": localStorage.getItem("userId")
        }
        await fetch(`${url}/assistencia/${id}`,{
            method: "PATCH",
            body: JSON.stringify(administrador)
        })
    }

    return (cadastrarAssistencia);
}