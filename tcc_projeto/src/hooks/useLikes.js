const url = import.meta.env.VITE_API_URL;

export function useLikes() {

    // lista todos os likes
    const buscaLikes = async() =>{
        const request = await fetch(`${url}/assistencia_Fav_Solicitante`);
        const response = await request.json();

        return response;
    }

    // busca assistencias curtidas por um solicitante pelo id
    const buscaLikesSolicitante = async (idSolicitante) =>{
        const request = await fetch(`${url}/assistencia_Fav_Solicitante`);
        const response = await request.json();
        const likes = response.filter(like => like.idSolicitante === idSolicitante);
        return likes;
    }

    const buscarAssistenciasFavoritas = async(idSolicitante)=>{
        const request = await fetch(`${url}/assistencia_Fav_Solicitante`);
        const response = await request.json();

        const idAssistencias = response
            .filter(like => like.idSolicitante === idSolicitante)
            .map(like => like.idAssistencia)

        return idAssistencias;
    };

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
    
    return {
        buscarAssistenciasFavoritas,
        buscaLikes,
        buscaLikesSolicitante,
        favoritarAssistencia,
        removerAssistenciaDeFavoritos
    }
}






