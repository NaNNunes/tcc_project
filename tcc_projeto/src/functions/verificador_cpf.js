let cpfStr = "133.127.937-26" // recebe o valor como str
let cpfDigitos = [];
let verificador = [];

// aux
let multiplicador = 0;
let somaProdutos = 0;
let resto_somaProd = 0;

// passando numeros
for (let i = 0; i < cpfStr.length; i++) {
    (cpfStr[i] != "." && cpfStr[i] != "-") ? cpfDigitos.push(cpfStr[i]) : 0
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
    console.log(verificador[i]);
}