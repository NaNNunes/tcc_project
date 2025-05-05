export function verificadorCpf(cpfStr = "000.000.000-00"){
    // verifica se todos os digitos são repetidos | obs: da pra fazer um laço e comparar
    if (
        (cpfStr == "000.000.000-00") || (cpfStr == "111.111.111-11") || (cpfStr == "222.222.222-22") || 
        (cpfStr == "333.333.333-33") || (cpfStr == "444.444.444-44") || (cpfStr == "555.555.555-55") || 
        (cpfStr == "666.666.666-66") || (cpfStr == "777.777.777-77") || (cpfStr == "888.888.888-88") ||
        (cpfStr == "999.999.999-99") 
    ) {
        console.log("cpf não válido: ", cpfStr);
        return false;
    }
    let len = cpfStr.length - 1;

    let cpfDigitos = [];
    let verificador = [];
    // aux
    let multiplicador = 0;
    let somaProdutos = 0;
    let resto_somaProd = 0;
    // passando digitos
    for (let i = 0; i <= len; i++) {
        (cpfStr[i] != "." && cpfStr[i] != "-") ? cpfDigitos.push(Number(cpfStr[i])) : 0
    }
    // verificador
    for (let i = 0; i < 2; i++) {
        somaProdutos = 0;
        multiplicador = 10+i; // posicao do verificador no cpf

        for(let c = 0; c < 9+i ; c++){
            somaProdutos += (cpfDigitos[c] * multiplicador--);
        }

        resto_somaProd = somaProdutos % 11;
        verificador[i] = ((resto_somaProd == 0) || (resto_somaProd == 1) ? 0 : (11 - resto_somaProd));
    }
    return ((verificador[0] == cpfStr[9]) && (verificador[1] == cpfStr[10]));
}