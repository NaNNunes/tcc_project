const url = import.meta.env.VITE_API_URL;

export function addAdm(administrador){
    async function fetchdata() {
        try {
            const response = await fetch(`${url}/adms`, {
                method: "POST",
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(administrador)
            })

            if (response.status != 201){
                return false;
            }

            const data = await response.json();
            console.log("adm cadastrado: ", data);

            return true;

        } catch (error) {
            console.log("Erro ao cadastrar administrador: ", error)
        }
    }
    fetchdata();
}