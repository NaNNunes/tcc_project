// TO DO refatorar codigo onde é pego id e type do user pelo localstorage
import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/userContext";

const url = import.meta.env.VITE_API_URL;

// verifica credenciais de login
export function useVerificaLogin(){
    const [solicitantes, setSolicitantes] = useState([]);
    const [administradores, setAdministradores] = useState([]);

    // funçoes do context para salvar id e tipo de user
    const {login} = useContext(AuthContext);

    // -- ATENCAO --
    // o codigo a seguir segue o paradigma POG,
    // Programação Orientada a Gambiarra, não repita isso em casa
    // isso ocorre devido a assincronia do state
        // 1º chamada
    useEffect(()=>{
    async function fetchData(){
            try {
                for(let i = 0; i < 2; i++){

                    const userType = (i === 0)
                        ? "solicitante"
                        : "administrador"

                    const request = await fetch(`${url}/${userType}`);
                    const response = await request.json();
                    
                    (i === 0) 
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
            
            // atribui a lista encontrada de acordo com o laço
            (i == 0)
                ?   setSolicitantes(response)
                :   setAdministradores(response)

        }
    }

    const verificaLogin = (data) => {
        // renderização de lista
        buscaCadastros();
        console.log("login")

        // verifica se email ou senha foi encontrado em solicitantes
        const solicitante2find = solicitantes.find((solicitante) => {
            console.log(
                "solicitante: ",
                solicitante.cpf === data.loginOuCpf
                ||
                solicitante.email === data.loginOuCpf
            );
            return (
                solicitante.cpf === data.loginOuCpf
                ||
                solicitante.email === data.loginOuCpf
            );
        })

        // verifica se email ou senha foi encontrado em administradores
        const administrador2find = administradores.find((administrador)=>{
            console.log(
                "administrador: ",
                administrador.cpf === data.loginOuCpf
                ||
                administrador.email === data.loginOuCpf
            );
            return (
                administrador.cpf === data.loginOuCpf
                ||
                administrador.email === data.loginOuCpf
            );
        })

        // verifica se solcitante foi encontrado e se senha inserida é a mesma do cadastro
        if( solicitante2find !== undefined && solicitante2find.senha === data.senha)
        {
            // verifica se cadastro do solicitante é válido
            (solicitante2find.isValido !== true)
                ? alert("user Invalido")
                :   
                    login(solicitante2find, "solicitante");
                    console.log("user logado:", solicitante2find.nome);
                    console.log("----------------")
                    return "Login efetuado com sucesso";
                    
        } 
        else if // verifica se solcitante foi encontrado e se senha inserida é a mesma do cadastro
        (administrador2find !== undefined && administrador2find.senha === data.senha)
        {
             // verifica se cadastro do solicitante é válido            
            (administrador2find.isValido !== true)
                ? alert("userInválido")
                :
                    login(administrador2find, "administrador");
                    console.log("user logado:", administrador2find.nome);
                    console.log("----------------")
                    return "Login efetuado com sucesso";
        } 
        else // caso credenciais não localizada em nenhuma das tabelas
        {
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
export function useUser(){
    // funçoes do context para salvar id e tipo de user
    const {setId, userId, setType, userType} = useContext(AuthContext);

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

    // cadastra user
    const cadastrarInfosUser = async (data) => {
        // define o tipo de user
        // TROQUE DE "userType" para "tipoUsuario".
        const user = localStorage.getItem("tipoUsuario");

        const request = await fetch(`${url}/${user}`,{
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
        setType(user);

        // user invalido pois falta endereco e/ou pergunta de segurança
        inserirValidacao(false);
    }

    // cadastra solicitante presencial
    const cadastrarPseudoUser = async (data) =>{

        const request = await fetch(`${url}/solicitante`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
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
        const user = localStorage.getItem('userType');

        fetch(`${url}/${user}/${id}`,{
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
        buscaUserById,
        cadastrarInfosUser,
        cadastrarPseudoUser,
        favoritarAssistencia,
        inserirPerguntaResposta,
        inserirValidacao,
        removerAssistenciaDeFavoritos,
        verificaSenhaInformada
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

        // true or false
        return solicitante2Find !== undefined;
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

        // true or false
        return adm2Find !== undefined;
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

        // true or false
        return solicitante2Find !== undefined;
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

        // true or false
        return adm2Find !== undefined;
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

        // true or false
        return assistencia2Find !== undefined;
    }

    return {
        verificaCpfDeSolicitantes, verificaCpfDeAdms,
        verificaEmailDeAdms, verificaEmailDeSolicitantes, 
        verificaEmailDeAssistencia
    };
}

// por enquato apenas insere endereco
export function useEndereco(){

    // atualiza endereco do user
    const atualizarEndereco = async (idEndereco, data) =>{

        const request = await fetch(`${url}/endereco/${idEndereco}`,{
            method: "PATCH",
            body: JSON.stringify(data)
        })
        
        const response = await request.json();
        const endereco_id = response.id; 
        setaIdEmUser(endereco_id);

        location.reload();

        return response;
    }

    // busca Endereco By Id
    const buscaEnderecoById = async (idEndereco) =>{
        const request = await fetch(`${url}/endereco/${idEndereco}`);
        const response = await request.json();

        return response;
    }

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
        // define id do endereco como chave estrangeira 
        setaIdEmUser(endereco_id);
        
        // retorna endereço fora cadastrado e user recebeu o id do endereco 
        return response.ok; 
    }

    // define id de endereco de acordo com o user, solicitante ou pseudo user
    const setaIdEmUser = async (endereco_id) =>{

        // define quem receberá o id do endereco
        const tipo = localStorage.getItem('userType');
        const user = (tipo != "Visitante") 
            && (tipo === "solicitante")
                ? "solicitante"
                : "assistencia"

        // pega o id do endereco
        const id = (user !== "Visitante") 
            && (tipo === "solicitante")
                ? localStorage.getItem("userId")
                : localStorage.getItem("assistenciaId");

        const enderecoId = {
            "id_endereco": endereco_id
        }

        const request = await fetch(`${url}/${user}/${id}`,{
            method: "PATCH",
            body: JSON.stringify(enderecoId)
        })

    }
   
    return {atualizarEndereco, buscaEnderecoById, cadastrarEndereco };
}

// cadastra assistencia
export function useAssistencia(){

    // Lista todas as assistencias
    const buscaAssistencias = async() =>{
        const request = await fetch(`${url}/assistencia`);
        const response = await request.json();

        return response;
    }

    // Busca assistencia pelo id
    const buscaAssistenciaById = async (id) =>{
        const request = await fetch(`${url}/assistencia/${id}`);
        const response = await request.json();
        return response;
    }

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

        // jogar para o context?
        localStorage.setItem("assistenciaId", id);

        // define o adm
        inserirAdministrador(id);
        inserirValidacaoAssistencia(id, true)
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

    const inserirValidacaoAssistencia = async (idAssistencia, isValido) => {

        fetch(`${url}/assistencia/${idAssistencia}`,{
            method: "PATCH",
            body: JSON.stringify({"isValido":isValido})
        })
    }

    return {
        buscaAssistencias,
        buscaAssistenciaById,
        inserirAssistencia,
        inserirValidacaoAssistencia
    };
}

export function useDemanda(){
    
    const userType = localStorage.getItem("userType");

    // atualiza status de demanda
    const atualizarStatusDemanda = async(idDemanda, novoStatus) =>{
        const status = {
            "status": novoStatus
        }

        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(status)
        });

        return request.ok;
    }

    // lista todas as demandas
    const buscaDemandas = async() =>{
        const request = await fetch(`${url}/demanda`);
        const response = await request.json();

        return response;
    }

    // busca demanda específica pelo id
    const buscaDemandaById = async(idDemanda) => {
        const request = await fetch(`${url}/demanda/${idDemanda}`);
        const response = await request.json();

        return response;
    }

    // busca dispositivo pelo id
    const buscaDispositivoById = async(idDispositivo)=>{
        const request = await fetch(`${url}/dispositivo/${idDispositivo}`);
        const response = await request.json();

        return response;
    }
    
    // cadastra dispositivo no sistema
    const cadastrarDispositivo = async (data) =>{
        
        const request = await fetch(`${url}/dispositivo`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        const response =  await request.json();

        // Define id de solicitante no dispositivo somente quando o mesmo emite a demanda com sua própria conta
        // caso adm estja emitindo demanda, id do solicitante presencial no dispositivo será definido em CadastroDemanda
        if(userType === "solicitante"){
            //definir dono do dispositivo
            defineIdSolicitante("dispositivo", response.id);
        }
        // retorna id Dispositivo para cadastrar em demanda
        return response.id;
    }

    // cadastrar demanda
    const cadastrarDemanda = async (data) => {
        
        const request = await fetch(`${url}/demanda`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        
        const response = await request.json();
        
        // define id emissor da demanda
        const isIdSolicitanteDefinido = await defineIdSolicitante("demanda", response.id);
        // define data e hora da emissao da demanda
        const isDataEmissaoDefinida = await defineDataEmissao(response.id);

        if(isIdSolicitanteDefinido && isDataEmissaoDefinida && request.ok){
            alert("Demanda cadastrada");
            return request.ok;
        }
    }

    // definir status da demanda como 'Cancelada'
    const cancelarDemanda = async (idDemanda) =>{
        const status = {
            "status":"Cancelada"
        }
        
        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(status)
        });

        if(request.ok){
            alert("Demanda cancelada");
            location.reload();
        }
    }

    // define id de assistencia como responsavel pela demanda quando adm aceita demanda atribuinda-a à uma de suas assistencias
    const defineIdAssistencia = async(idDemanda, idAssistencia)=>{
        
        const assistenciaResponsavel = {
            "assistencia": idAssistencia
        }

        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(assistenciaResponsavel)
        })

        return request.ok
    }
    
    // TODO ASSIM QUE KEVIN TERMINAR DE CRIAR O COMPONENTE PARA CRIAÇÃO DE DEMANDA COM SOLICITAÇÃO PRESENCIAL. demanda "emitida" pelo adm
    // VERIFICAR SE DEMADA É EMITIDA PELA ASSITENCIA EM ATENDIMENTO PRESENCIAL E DEFINIR ID DO SOLICITANTE NA LOJA, 
    // CRIADO NO ATO DA EMISSAO DA DEMDANDA COMO EMISSOR, E NÃO O ADM QUE CADASTRA
    // define o id do solicitante 
    const defineIdSolicitante = async (tabelaDestino, id) =>{
        // tabela Destino = dispositivo || demanda

        const solicitante = {
            "solicitante_id": userId || localStorage.getItem("userId")
        }

        const request = await fetch(`${url}/${tabelaDestino}/${id}`,{
            method: "PATCH",
            body: JSON.stringify(solicitante)
        })

        return request.ok;
    }

    // define data e hora emissao
    const defineDataEmissao = async (id) =>{
        const dataHoraAtual = new Date();

        const dia = dataHoraAtual.getDate();
        const mes = dataHoraAtual.getMonth() + 1; // Adicionar 1 porque Janeiro é 0
        const ano = dataHoraAtual.getFullYear();
        const hora = dataHoraAtual.getHours();
        const minutos = dataHoraAtual.getMinutes();
        const segundos = dataHoraAtual.getSeconds();

        // mudar formatacao da data para MM-DD-AAAA
        const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
        const horaFormatada = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        console.log(`Data Emissão: ${dataFormatada}`);
        console.log(`Hora Emissão: ${horaFormatada}`);

        // objeto que será incrementado
        const dataHoraEmissao ={
            "dataEmissao": dataFormatada,
            "horaEmissao": horaFormatada
        }

        const request = await fetch(`${url}/demanda/${id}`,{
            method: "PATCH",
            body: JSON.stringify(dataHoraEmissao)
        });

        return request.ok;
    }

    return {
        atualizarStatusDemanda,
        buscaDemandas,
        buscaDemandaById,
        buscaDispositivoById,
        cadastrarDemanda, 
        cadastrarDispositivo, 
        cancelarDemanda,
        defineIdAssistencia
    };
}