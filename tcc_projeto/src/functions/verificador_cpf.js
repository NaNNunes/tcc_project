export function verificadorCpf(cpfStr = "00000000000"){
    // verifica se todos os digitos são repetidos | obs: da pra fazer um laço e comparar
    if (
        (cpfStr == "00000000000") || (cpfStr == "11111111111") || (cpfStr == "22222222222") || 
        (cpfStr == "33333333333") || (cpfStr == "44444444444") || (cpfStr == "55555555555") || 
        (cpfStr == "66666666666") || (cpfStr == "77777777777") || (cpfStr == "88888888888") ||
        (cpfStr == "99999999999") 
    ) {
        console.log("cpf não válido: ", cpfStr);
        return false;
    }

    let cpfDigitos = [];
    let verificador = [];
    // aux
    let multiplicador = 0;
    let somaProdutos = 0;
    let resto_somaProd = 0;
    // passando digitos
    for (let i = 0; i < cpfStr.length; i++) {
        (!(isNaN(cpfStr[i]))) && cpfDigitos.push(cpfStr[i]);
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
   
    return ((verificador[0] == cpfStr[cpfStr.length - 2]) && (verificador[1] == cpfStr[cpfStr.length - 1]));
}