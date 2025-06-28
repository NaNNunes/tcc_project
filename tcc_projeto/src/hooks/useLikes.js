const url = import.meta.env.VITE_API_URL;

// busca assistencias curtidas por um solicitante pelo id
const buscaLikesSolicitante = async (idSolicitante) =>{
    const request = await fetch(`${url}/assistencia_Fav_Solicitante`);
    const response = await request.json();

    const listaLikesSolicitante = [];
}

// lista todos os likes
const buscaAssistenciasFavoritas = async() =>{
    const request = await fetch(`${url}/assistencia_Fav_Solicitante`);
    const response = await request.json();

    return response;
}