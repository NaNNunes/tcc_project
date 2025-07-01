const url = import.meta.env.VITE_API_URL;

export function useDemanda() {

    const aceitarOrcamento = async (idDemanda) =>{
        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify({"statusOrcamento":"Aceito"})
        });

        const isDataAceitacaoDefinida = await defineDataAceitacaoOrcamento(idDemanda);
        if(isDataAceitacaoDefinida){
            return request.ok
        }
    }

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

    const atualizarDadosDemanda = async(dados, idDemanda, responsavelDemanda)=>{
        // define dados do dispositivo
        // separando dados de demanda
        const infosDemanda = {
            "descProblema" : dados.descProblema,
            "observacoes": dados.observacoes,
            "assistencia": responsavelDemanda,
        };

        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(infosDemanda)
        });

        return request.ok;
    }

    const atualizarDadosDispositivo = async (dados, idDispositivo) => {
        // separando dados de dispositivo
        const dispositivo = {
            "categoria": dados.categoria,
            "marca": dados.marca,
            "fabricante": dados.fabricante,
            "modelo": dados.modelo,
            "numSerie": dados.numSerie, 
            "tensao": dados.tensao,
            "amperagem": dados.amperagem,
            "cor": dados.cor
        };

        const request = await fetch(`${url}/dispositivo/${idDispositivo}`,{
            method: "PATCH",
            body: JSON.stringify(dispositivo)
        });

        return request.ok;
    };

    const buscaDemandasPublicas = async () =>{
        const request = await fetch(`${url}/demanda`);
        const response = await request.json();

        const listaDemandasPublicas = [];

        response.map((demanda)=>{
            const isDemandaAberta = demanda.status === "Aberto";
            const isDemandaPublica = demanda.assistencia === "Público";
            if(isDemandaAberta && isDemandaPublica){
                listaDemandasPublicas.push(demanda);
            }
        })

        return listaDemandasPublicas;
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

    // busca demandas do solicitante
    const buscarDemandasDoSolicitante = async (idSolicitante) =>{
        const request = await fetch(`${url}/demanda`);
        const response = await request.json();

        const demandas = response.filter(demanda => demanda.idSolicitante === idSolicitante);

        return demandas;
    }

    const buscarDemandasComOrcamentoGerado = async (idSolicitante) =>{
        const request = await fetch(`${url}/demanda`);
        const response = await request.json();

        const demandasComOrcamento = response.filter(demanda => (
            demanda.idSolicitante === idSolicitante && 
            demanda.statusOrcamento === "Sem resposta" &&
            demanda.status === "Em atendimento"
        ));

        return demandasComOrcamento;
    }

    // buscar demandas solicitadas a assistencias do adm
    const buscaDemandasSolicitadasAssistencia = async (assistencias) =>{
        const request = await fetch(`${url}/demanda`);
        const response = await request.json();

        const demandasSolicitadas = response.filter(demada => {
            const isEmAtendimento = demada.status === "Aberto";
            const isVinculada = assistencias.some(assistencia => assistencia.id === demada.assistencia);
            return isEmAtendimento && isVinculada;
        });

        return demandasSolicitadas;
    }

    const buscaDemandaVinculadaAssistencia = async (assistencias) =>{
        const request = await fetch(`${url}/demanda`);
        const response = await request.json();

        const listaDemandasVinculadasAssistencia = [];

        // mapeia demandas e filtra demandas viculadas a ats
        response.map((demanda)=>{
            assistencias.map((assistencia)=>{
                if(demanda.assistencia === assistencia.id){
                    listaDemandasVinculadasAssistencia.push(demanda);
                }
            })
        })

        return listaDemandasVinculadasAssistencia;
    }

    // busca dispositivo pelo id
    const buscaDispositivoById = async(idDispositivo)=>{
        const request = await fetch(`${url}/dispositivo/${idDispositivo}`);
        const response = await request.json();

        return response;
    }

    const buscaDispositivoDeDemandaDaAt = async(demandasDaAssistencia)=>{
        const request = await fetch(`${url}/dispositivo/`);
        const response = await request.json();

        const listaDispositivos = [];

        response.map((dispositivo)=>{
            demandasDaAssistencia.map((demanda)=>{
                if(demanda.idDispositivo === dispositivo.id){
                    listaDispositivos.push(dispositivo);
                }
            })
        })

        return listaDispositivos;
    }
    
    // cadastra dispositivo no sistema
    const cadastrarDispositivo = async (data, idSolicitante) =>{
        // separando dados de dispositivo
        const dispositivo = {
            "categoria": data.categoria,
            "marca": data.marca,
            "fabricante": data.fabricante,
            "modelo": data.modelo,
            "numSerie": data.numSerie, 
            "tensao": data.tensao,
            "amperagem": data.amperagem,
            "cor": data.cor,
            "idSolicitante": idSolicitante
        };

        const request = await fetch(`${url}/dispositivo`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(dispositivo)
        })

        const response =  await request.json();

        return response.id;
    }

    // cadastrar demanda
    const cadastrarDemanda = async (data, idSolicitante, idDispositivo, responsavelDemanda) => {
        const userType = localStorage.getItem("userType");
        const statusPadrao = (userType === "solicitante") 
            ? "Aberto" 
            : "Em atendimento"
        
        // separando dados de demanda
        const infosDemanda = {
            "idDispositivo" : idDispositivo,
            "descProblema" : data.descProblema,
            "observacoes": data.observacoes,
            "status": statusPadrao,
            "assistencia": responsavelDemanda,
            "idSolicitante": idSolicitante
        };
        
        const request = await fetch(`${url}/demanda`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(infosDemanda)
        });
        
        const response = await request.json();
            
        // define data e hora da emissao da demanda
        const isDataEmissaoDefinida = await defineDataEmissao(response.id);

        if(isDataEmissaoDefinida){
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

    const concluirDemanda = async (idDemanda) => {
        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify({"status":"Concluído"})
        });

        return request.ok;
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

    const defineDataAceitacaoOrcamento = async(id) =>{
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

        // objeto que será incrementado
        const dataHoraEmissao ={
            "data_aceitacao_orcamento": dataFormatada,
            "hora_aceitacao_orcamento": horaFormatada
        }

        const request = await fetch(`${url}/demanda/${id}`,{
            method: "PATCH",
            body: JSON.stringify(dataHoraEmissao)
        });

        return request.ok;
    }

    // inserir dados de orcamento na demanda
    const inserirOrcamento = async (data, idDemanda, isCliente) =>{
        
        const dados = {
            ...data,
            statusOrcamento: (isCliente) ? "Aceito" : "Sem resposta"
        }

        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(dados)
        });

        return request.ok
    }

    const inserirIdAvaliacao = async (idDemanda, idAvaliacao) => {

        const avaliacao = {
            "idAvaliacao":idAvaliacao
        }

        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(avaliacao)
        });

        return request.ok;
    }

    const recusarOrcamento = async (idDemanda) =>{
        const status = {
            "status": "Aberto",
            "assistencia": "Público",
            "problema_identificado": "",
            "solucao": "",
            "pecaTrocada": "",
            "valorObra": "",
            "observacoesOrcamento": "",
            "statusOrcamento": "Recusado"
        }

        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(status)
        });

        return request.ok
    }

    // rejeitar demanda solicitada a at
    const rejeitarDemanda = async (id) => {
        const data = {
            "status": "Aberto",
            "assistencia": "Público",
        }

        const request = await fetch(`${url}/demanda/${id}`,{
            method: "PATCH",
            body: JSON.stringify(data)
        })

        if(request.ok){
            location.reload();
        };
    }

    return {
        aceitarOrcamento,
        atualizarDadosDispositivo,
        atualizarDadosDemanda,
        atualizarStatusDemanda,
        buscaDemandas,
        buscaDemandasPublicas,
        buscaDemandasSolicitadasAssistencia,
        buscarDemandasComOrcamentoGerado,
        buscaDemandaById,
        buscarDemandasDoSolicitante,
        buscaDemandaVinculadaAssistencia,
        buscaDispositivoById,
        buscaDispositivoDeDemandaDaAt,
        cadastrarDemanda, 
        cadastrarDispositivo, 
        cancelarDemanda,
        concluirDemanda,
        defineIdAssistencia,
        inserirIdAvaliacao,
        inserirOrcamento,
        recusarOrcamento,
        rejeitarDemanda
    };
}
