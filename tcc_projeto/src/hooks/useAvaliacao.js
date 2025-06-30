const url = import.meta.env.VITE_API_URL;

export function useAvaliacao() {

    const buscaAvaliacaoById = async (id) => {
        const request = await fetch(`${url}/avaliacao/${id}`);
        const response = await request.json();

        return response;
    }

    // insere avaliacao de demanda
    const inserirAvaliacao = async (data, idAssistencia, idDemanda, idSolicitante) =>{
        const dados = {
            ...data,
            "idDemanda": idDemanda,
            "idAssistencia": idAssistencia,
            "idSolicitante": idSolicitante
        }

        const request = await fetch(`${url}/avaliacao`,{
            method: "POST",
            body: JSON.stringify(dados)
        });

        const response = await request.json();

        return response.id;
    };

    return{
        buscaAvaliacaoById,
        inserirAvaliacao
    }
}