const url = import.meta.env.VITE_API_URL;

export function addAdm(administrador){
    async function fetchdata() {
        try {
            const response = await fetch(`${url}/adms`, {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(administrador)
            })

            const data = await response.json();
            console.log("adm cadastrado: ", data);
            
        } catch (error) {
            console.log("Erro ao cadastrar administrador: ", error)
        }
    }
    fetchdata();
}