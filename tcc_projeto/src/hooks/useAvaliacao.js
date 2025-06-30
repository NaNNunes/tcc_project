import { SiAutomattic, SiZomato } from "react-icons/si";

const url = import.meta.env.VITE_API_URL;

export function useAvaliacao() {

    const buscarAvaliacaoById = async (id) => {
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

    const buscarAvaliacoesDaAssistencia = async (idAssistencia) => {
        const request = await fetch(`${url}/avaliacao`);
        const response = await request.json();

        const avaliacoes = response.filter(avaliacao => avaliacao.idAssistencia === idAssistencia);
        console.log(idAssistencia, avaliacoes);
    }

    const mediaAvaliacaoAssistencia = async (idAssistencia) => {
        const request = await fetch(`${url}/avaliacao`);
        const response = await request.json();

        const notas = response
            .filter(avaliacao => avaliacao.idAssistencia === idAssistencia)
            .map(avaliacao => avaliacao.notaAvaliacao);

        const quantidadeNotas = notas.length;
        const soma = notas.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const mediaNotas = soma / quantidadeNotas
        
        return mediaNotas;
    }

    return{
        buscarAvaliacaoById,
        buscarAvaliacoesDaAssistencia,
        inserirAvaliacao,
        mediaAvaliacaoAssistencia
    }
}