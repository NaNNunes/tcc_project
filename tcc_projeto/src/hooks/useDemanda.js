const url = import.meta.env.VITE_API_URL;

export function useDemanda() {

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

        // lista para armazenas demandas 
        const listaDemandasDoSolicitante = [];

        // mapeia demandas identificando e saperando demandas do solicitante pelo id
        response.map((demanda)=>{
            if(demanda.idSolicitante === idSolicitante){
                listaDemandasDoSolicitante.push(demanda);
            }
        });

        return listaDemandasDoSolicitante;
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

        const request = await fetch(`${url}/dispositivo`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        const response =  await request.json();
       
        const isIdDefinido = await defineIdSolicitanteNoDispositivo(response.id, idSolicitante);
        
        if(isIdDefinido){
            return response.id;
        }
    }

    // cadastrar demanda
    const cadastrarDemanda = async (data, idSolicitante) => {
        
        const request = await fetch(`${url}/demanda`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        
        const response = await request.json();
        
        // define id emissor da demanda
        const isIdSolicitanteDefinido = await defineIdSolicitanteNaDemanda(response.id, idSolicitante);
            
        // define data e hora da emissao da demanda
        const isDataEmissaoDefinida = await defineDataEmissao(response.id);

        if(isIdSolicitanteDefinido && isDataEmissaoDefinida){
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
    
    // define o id do solicitante 
    const defineIdSolicitanteNaDemanda = async (idDemanda, idSolicitante) =>{

        const idDoSolicitante = {
            "idSolicitante": idSolicitante
        }

        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(idDoSolicitante)
        })

        return request.ok;
    }

    const defineIdSolicitanteNoDispositivo = async (idDispositivo, idSolicitante) =>{

        const idDoSolicitante = {
            "idSolicitante": idSolicitante
        }

        const request = await fetch(`${url}/dispositivo/${idDispositivo}`,{
            method: "PATCH",
            body: JSON.stringify(idDoSolicitante)
        });

        return request.ok;
    };

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

    // inserir dados de orcamento na demanda
    const inserirOrcamento = async (data, idDemanda) =>{
        const request = await fetch(`${url}/demanda/${idDemanda}`,{
            method: "PATCH",
            body: JSON.stringify(data)
        });
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
        atualizarStatusDemanda,
        buscaDemandas,
        buscaDemandasPublicas,
        buscaDemandaById,
        buscarDemandasDoSolicitante,
        buscaDemandaVinculadaAssistencia,
        buscaDispositivoById,
        buscaDispositivoDeDemandaDaAt,
        cadastrarDemanda, 
        cadastrarDispositivo, 
        cancelarDemanda,
        defineIdAssistencia,
        inserirOrcamento,
        rejeitarDemanda
    };
}
