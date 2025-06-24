const url = import.meta.env.VITE_API_URL;

export function useDemanda() {
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
        
        // verifica se demanda ja tem id
        if(userType === "solicitante"){
            // define id emissor da demanda
            const isIdSolicitanteDefinido = await defineIdSolicitante("demanda", response.id);
            
            // define data e hora da emissao da demanda
            const isDataEmissaoDefinida = await defineDataEmissao(response.id);
    
            if(isIdSolicitanteDefinido && isDataEmissaoDefinida && request.ok){
                alert("Demanda cadastrada");
                return request.ok;
            }
        }
        // verifica se demanda ja tem id
        if(userType === "administrador"){            
            // define data e hora da emissao da demanda
            const isDataEmissaoDefinida = await defineDataEmissao(response.id);
    
            if(isDataEmissaoDefinida && request.ok){
                alert("Demanda cadastrada");
                return request.ok;
            }
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
    const defineIdSolicitante = async (tabelaDestino, id) =>{
        // tabela Destino = dispositivo || demanda

        const solicitante = {
            "solicitante_id": localStorage.getItem("userId")
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
        buscaDemandaById,
        buscaDispositivoById,
        cadastrarDemanda, 
        cadastrarDispositivo, 
        cancelarDemanda,
        defineIdAssistencia,
        rejeitarDemanda
    };
}
