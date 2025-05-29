import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/userContext";

const url = import.meta.env.VITE_API_URL;

export function useVerificaLogin(){
    const [solicitantes, setSolicitantes] = useState([]);
    const [administradores, setAdministradores] = useState([]);

    const {login} = useContext(AuthContext);

    // -- ATENCAO --
    // o codigo a seguir segue o paradigma POG,
    // Programação Orientada a Gambiarra, não repita isso em casa
    // isso ocorre devido ao state por motivo de não sei

    useEffect(()=>{
    async function fetchData(){
            try {
                for(let i = 0; i < 2; i++){

                    const userType = (i == 0)
                        ? "solicitante"
                        : "administrador"

                    const request = await fetch(`${url}/${userType}`);
                    const response = await request.json();
                    
                    (i == 0) 
                        ? setSolicitantes(response)
                        : setAdministradores(response)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
        
    },[])

    // 2ª consulta atribuindo valores aos states de solicitante e adms
    const buscaCadastros = async () => {
       for(let i = 0; i < 2; i++){

            // define onde consultará
            let userType = (i == 0) 
                ? "solicitante" 
                : "administrador"

            
            const request = await fetch(`${url}/${userType}`,{
                method:"GET"
            });

            const response = await request.json();
            
            if(i == 0){
                setSolicitantes(response);
            }
            else{
                setAdministradores(response);
            }

        }
    }


    const verificaLogin = (data) => {
        buscaCadastros();

        // verificar email e cpf
        const user2find = solicitantes.find((solicitante) => {
            console.log(solicitante.cpf === data.loginOuCpf);
            return solicitante.cpf === data.loginOuCpf;
        })

        if(user2find !== undefined && user2find.senha === data.senha){
            login(user2find);
            console.log("user logado", user2find.nome);
            return "Login efetuado com sucesso";
        } else{
            return "usuario ou senha inválido";
        }
    }

    return { verificaLogin };
}

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
    const {setId} = useContext(AuthContext);
    
    // cadastra user
    const cadastrarInfosUser = async (data) => {
        // define o tipo de user
        const user = localStorage.getItem("userType");

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
            // alternativa definir id no localstorage
        setId(id);

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
        const user = localStorage.getItem("userType");

       await fetch(`${url}/${user}/${id}`,{
            method: "PATCH",
            body: JSON.stringify(data)
        })
    }

    return {
        cadastrarInfosUser,
        inserirPerguntaResposta,
        inserirValidacao,
    };
}

// compara dados de entrada de cadastro com dados cadastrados de users e pseudousers
export function useComparaDados (){

    const [solicitantes, setSolicitantes] = useState();
    const [adms, setAdms] = useState();
    const [assistencias, setAssistencias] = useState();

    // -- ATENÇÃO --
    // o código a seguir segue o paradigma POG, 
    // Programação Orientada a Gambiarra, não repita isso em casa.
    // consulta para carregar conexao com a api -- não atribui valores aos states solicitantes e adms
    useEffect(() => {
        async function fetchData(){
            try{
                for(let i = 0; i < 3; i++){

                    let userType = (i == 0) 
                        ? "solicitante" 
                        : (i == 1) 
                            ? "administrador"
                            : "assistencia"
                    
                    const request = await fetch(`${url}/${userType}`,{
                        method:"GET"
                    });
                    const response = await request.json();
                    
                    if(i == 0){
                        setSolicitantes(response);
                    }
                    else if(i == 1){
                        setAdms(response);
                    }
                    else{
                        setAssistencias(response);
                    }
                }
            }
            catch(error){
                console.log(error.message);
            }
        }
        fetchData();
    },[])

    // 2ª consulta atribuindo valores aos states de solicitante e adms
    const buscaCadastro = async () => {
       for(let i = 0; i < 3; i++){

            // define onde consultará
            let userType = (i == 0) 
                ? "solicitante" 
                : (i == 1) 
                    ? "administrador"
                    : "assistencia"
            
            const request = await fetch(`${url}/${userType}`,{
                method:"GET"
            });

            const response = await request.json();
            
            if(i == 0){
                setSolicitantes(response);
            }
            else if(i == 1){
                setAdms(response);
            }
            else{
                setAssistencias(response);
            }
        }
    }

    // verifica cpf
    // verifica se cpf informado pelo user esta cadastrado em solicitantes
    const verificaCpfDeSolicitantes = (cpf) => {
        // renderização
        buscaCadastro();

        // procura cpf na lista de solicitantes
        const solicitante2Find = solicitantes.find((solicitante) => {
            // console.log(solicitante.cpf === cpf)
            return solicitante.cpf === cpf;
        })

        return solicitante2Find;
    }

    // verifica se cpf informado pelo user já está cadastrado em adms
    const verificaCpfDeAdms = (cpf) => {
        // renderização
        buscaCadastro();

        // procura cpf na lista de adms
        const adm2Find = adms.find((adm) => {
            // console.log(adm.cpf === cpf)
            return adm.cpf === cpf;
        })

        return adm2Find;
    }

    // verifica email
    // verifica se email informado pelo user esta cadastrado em solicitantes
    const verificaEmailDeSolicitantes = (email) => {
        // renderização
        buscaCadastro();

        // procura email na lista de solicitantes
        const solicitante2Find = solicitantes.find((solicitante) => {
            // console.log(solicitante.cpf === cpf)
            return solicitante.email === email;
        })

        return solicitante2Find;
    }

    // verifica se email informado pelo user já está cadastrado em adms
    const verificaEmailDeAdms = (email) => {
        // renderização
        buscaCadastro();

        // procura email na lista de adms
        const adm2Find = adms.find((adm) => {
            // console.log(adm.cpf === cpf)
            return adm.email === email;
        })

        return adm2Find;
    }

    // verificar email de assistencias
    const verificaEmailDeAssistencia = (email) => {
        // renderização
        buscaCadastro();

        // procura email na lista de adms
        const assistencia2Find = assistencias.find((assistencia) => {
            // console.log(adm.cpf === cpf)
            return assistencia.email === email;
        })

        return assistencia2Find;
    }

    return {
        verificaCpfDeSolicitantes, verificaCpfDeAdms,
        verificaEmailDeAdms, verificaEmailDeSolicitantes, 
        verificaEmailDeAssistencia
    };
}

// por enquato apenas insere endereco
export function useEndereco(){

    // cadastra endereco
    const cadastrarEndereco = async (data) =>{
        const request = await fetch(`${url}/endereco`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)          
        }) 

        const response = await request.json();
        const endereco_id = response.id;      
        setaIdEmUser(endereco_id);
    }

    // define id de endereco de acordo com o user, solicitante ou pseudo user
    const setaIdEmUser = async (endereco_id) =>{
        const user =( (localStorage.getItem("userType") === "solicitante") 
            ? "solicitante"
            : "assistencia"
        );

        const enderecoId = {
            "id_endereco": endereco_id
        }

        await fetch(`${url}/${user}`,{
            method: "PATCH",
            body: JSON.stringify(enderecoId)
        })
    }

    return {cadastrarEndereco};
}

// cadastra assistencia
export function useCadastroAssistencia(){

    // insere assistencia
    const inserirAssistencia = async (data) =>{
        const request = await fetch(`${url}/assistencia`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });

        const response = await request.json();
        const id = await response.id;
        // define o adm
        inserirAdministrador(id);
        localStorage.setItem("assistenciaId", id);
    }

    // insere o adm da assistencia
    const inserirAdministrador = async (id) => {
        const administrador = {
            "administradorId": localStorage.getItem("userId")
        }
        await fetch(`${url}/assistencia/${id}`,{
            method: "PATCH",
            body: JSON.stringify(administrador)
        })
    }

    return {inserirAssistencia};
}