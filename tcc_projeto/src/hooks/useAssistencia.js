

const url = import.meta.env.VITE_API_URL;

// cadastra assistencia
export function useAssistencia() {
  // Lista todas as assistencias
  const buscaAssistencias = async () => {
    const request = await fetch(`${url}/assistencia`);
    const response = await request.json();

    return response;
  };

  // Busca assistencia pelo id
  const buscaAssistenciaById = async (id) => {
    const request = await fetch(`${url}/assistencia/${id}`);
    const response = await request.json();
    return response;
  };

  // insere assistencia
  const inserirAssistencia = async (data) => {
    const request = await fetch(`${url}/assistencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    const id = await response.id;

    // jogar para o context?
    localStorage.setItem("assistenciaId", id);
    
    //para quando o 
    if(data.administradorId === undefined){
      const isAdmInserido = await inserirAdministrador(id);
      const isAssistenciaValida = await inserirValidacaoAssistencia(id, true);

      return (isAdmInserido && isAssistenciaValida ) && request.ok;
    }
    else{
      const isAssistenciaValida = await inserirValidacaoAssistencia(id, true);
      return (isAssistenciaValida) && id;
    }
  };

  // insere o adm da assistencia
  const inserirAdministrador = async (id) => {
    const administrador = {
      administradorId: localStorage.getItem("userId"),
    };
    await fetch(`${url}/assistencia/${id}`, {
      method: "PATCH",
      body: JSON.stringify(administrador),
    });
  };

  const inserirValidacaoAssistencia = async (idAssistencia, isValido) => {
    fetch(`${url}/assistencia/${idAssistencia}`, {
      method: "PATCH",
      body: JSON.stringify({ isValido: isValido }),
    });
  };

  return {
    buscaAssistencias,
    buscaAssistenciaById,
    inserirAssistencia,
    inserirValidacaoAssistencia,
  };
}