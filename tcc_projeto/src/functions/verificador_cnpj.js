export function verificadorCnpj(cnpjStr = "00.000.000/0000-00"){
    if(
        (cnpjStr == "00.000.000/0000-00") || (cnpjStr == "11.111.111/1111-11") || (cnpjStr == "22.222.222/2222-22") || 
        (cnpjStr == "33.333.333/3333-33") || (cnpjStr == "44.444.444/4444-44") || (cnpjStr == "55.555.555/5555-55") || 
        (cnpjStr == "66.666.666/6666-66") || (cnpjStr == "77.777.777/7777-77") || (cnpjStr == "88.888.888/8888-88") || 
        (cnpjStr == "99.999.999/9999-99")
    ){
        console.log("invalido")
        return false;
    }

    let cnpjDigitos = [];
    let verificador = [];


    let multiplicador = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let somaProdutos = 0;
    let resto_somaProd = 0;

    // passagem de valores
    for(let i = 0; i < cnpjStr.length; i++){
        if(isNaN(cnpjStr[i])){
            cnpjDigitos.push(Number(cnpjStr[i]));
            console.log(cnpjDigitos[i]);
        }
    }
    console.log("------------------------------------")
    // verificacao
    for(let i = 1; i >= 0; i--){
        let inicio = i;
        console.log("multiplicador inicial: ",multiplicador[inicio]);
        console.log("-------------------------------")
        for (let c = 0; c < 12+i; c++){
            console.log("digito: ",cnpjDigitos[c]);
            console.log("mult: ", multiplicador[inicio])
            somaProdutos += (cnpjDigitos[c] * multiplicador[inicio])
            console.log("soma: ", somaProdutos)
            inicio++;
        }

        resto_somaProd = (somaProdutos % 11);
        verificador[i] = ((resto_somaProd == 0) || (resto_somaProd == 1)) ? 0 : (11 - resto_somaProd)
        console.log(verificador[i]);
    }
}

let val = "58.577.114/0001-89";
verificadorCnpj(val)
