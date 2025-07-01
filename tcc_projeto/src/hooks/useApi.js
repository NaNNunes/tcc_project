import { useEffect, useState } from "react";

const url = import.meta.env.VITE_API_URL;

// verificador de cpf valido
export function useVerificadorDeCpf(cpfStr) {
  const verificador = () => {
    // Remove todos os não-números
    const cpf = cpfStr.replace(/\D/g, "");

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      console.log("CPF inválido (dígitos repetidos):", cpf);
      return false;
    }

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Cálculo dos dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito > 9) primeiroDigito = 0;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito > 9) segundoDigito = 0;

    // Compara com os dígitos informados
    return (
      primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10])
    );
  };

  return { verificador };
}

// verificador de cnpj
export function useVerificadorDeCnpj(cnpjStr = "00.000.000/0000-00") {
  const verificador = () => {
    // filtro de validação
    if (
      cnpjStr == "00.000.000/0000-00" ||
      cnpjStr == "11.111.111/1111-11" ||
      cnpjStr == "22.222.222/2222-22" ||
      cnpjStr == "33.333.333/3333-33" ||
      cnpjStr == "44.444.444/4444-44" ||
      cnpjStr == "55.555.555/5555-55" ||
      cnpjStr == "66.666.666/6666-66" ||
      cnpjStr == "77.777.777/7777-77" ||
      cnpjStr == "88.888.888/8888-88" ||
      cnpjStr == "99.999.999/9999-99"
    ) {
      return false;
    }

    let cnpjDigitos = [];
    let digitoVerificador = [];

    // não precisa entender, so confia
    let multiplicador = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let somaProdutos;
    let resto_somaProd;

    // passagem de valores
    for (let i = 0; i < cnpjStr.length; i++) {
      !isNaN(cnpjStr[i]) && cnpjDigitos.push(cnpjStr[i]);
    }

    // gambiar-... verificação de digitos validadores
    for (let i = 1; i >= 0; i--) {
      // restart de auxiliares
      somaProdutos = 0;
      resto_somaProd = 0;

      // motivo da estrutura do multiplicador
      // a multiplicação dos digitos do cnpj começa em cinco e desce até 2 depois reinicia em 9 até 2
      // para o segundo DV começa em 6 e vai até 2, depois reinicia em 9
      let inicio = i;

      // limite do laço
      // se primeiro DV 12 senao 13
      let limite = i == 1 ? 12 : 13;

      // soma dos produtos
      for (let c = 0; c < limite; c++) {
        somaProdutos += cnpjDigitos[c] * multiplicador[inicio];
        inicio++;
      }

      // resto da divisao entre soma dos produtos do digitos e 11
      resto_somaProd = somaProdutos % 11;
      // definiçao do DV
      digitoVerificador[i] =
        resto_somaProd == 0 || resto_somaProd == 1 ? 0 : 11 - resto_somaProd;
    }

    // devido a gambi.. ao laço ser decrescente a verificação é invertida
    return (
      digitoVerificador[0] == cnpjDigitos[cnpjDigitos.length - 1] &&
      digitoVerificador[1] == cnpjDigitos[cnpjDigitos.length - 2]
    );
  };

  return { verificador };
}

// compara dados de entrada de cadastro com dados cadastrados de users e pseudousers
export function useComparaDados() {

  // --- verificar cpf ---
  // verifica se cpf informado pelo user esta cadastrado em solicitantes
  const verificaCpfDeSolicitantes = async (cpf) => {

    const reqBuscaSolicitantes = await fetch(`${url}/solicitante`);
    const solicitantes = await reqBuscaSolicitantes.json();

    // procura cpf na lista de solicitantes
    const solicitante2Find = solicitantes
      .find(solicitante => solicitante.cpf === cpf);

    // true or false
    return solicitante2Find !== undefined;
  };

  // verifica se cpf informado pelo user já está cadastrado em adms
  const verificaCpfDeAdms = async (cpf) => {
    const reqBuscarAdministradores = await fetch(`${url}/administrador`);
    const administradores = await reqBuscarAdministradores.json();

    // procura cpf na lista de adms
    const adm2Find = administradores.find((adm) => {
      return adm.cpf === cpf;
    });

    // true or false
    return adm2Find !== undefined;
  };

  // --- verificar email ---
  // verifica se email informado pelo user esta cadastrado em solicitantes
  const verificaEmailDeSolicitantes = async (email) => {
    const reqBuscaSolicitantes = await fetch(`${url}/administrador`);
    const solicitantes = await reqBuscaSolicitantes.json();

    // procura email na lista de solicitantes
    const solicitante2Find = solicitantes.find((solicitante) => {
      return solicitante.email === email;
    });

    // true or false
    return solicitante2Find !== undefined;
  };

  // verifica se email informado pelo user já está cadastrado em adms
  const verificaEmailDeAdms = async (email) => {
    const reqBuscarAdministradores = await fetch(`${url}/administrador`);
    const administradores = await reqBuscarAdministradores.json();

    // procura email na lista de adms
    const adm2Find = administradores
      .find(adm => adm.email === email);

    // true or false
    return adm2Find !== undefined;
  };

  // verificar email de assistencias
  const verificaEmailDeAssistencia = async (email) => {

    const reqBuscarAssistencias = await fetch(`${url}/assistencia`);
    const assistencias = await reqBuscarAssistencias.json();

    // procura email na lista de assistencias
    const assistencia2Find = assistencias
      .find(assistencia=> assistencia.email === email);

    // true or false
    return assistencia2Find !== undefined;
  };

  // --- verificar cnpj ---
  const verificarCnpjDeAssistencias = async (cnpj) => {

    const reqBuscarAssistencias = await fetch(`${url}/assistencia`);
    const assistencias = await reqBuscarAssistencias.json();

    // procura cnpj na lista de adms
    const assistencia2Find = assistencias
      .find(assistencia => assistencia.cnpj === cnpj);

    // true or false
    return assistencia2Find !== undefined;
  };

  // --- verificar numero de telefone ---
  const verificarTelefoneSolicitantes = async (telefone) =>{
    const reqBuscaSolicitantes = await fetch(`${url}/solicitante`);
    const solicitantes = await reqBuscaSolicitantes.json();

      // procura telefone na lista de solicitantes
    const solicitante2Find = solicitantes
      .find(solicitante =>solicitante.userTelefone === telefone);
    
    // true or false
    return solicitante2Find !== undefined;
  }

  // --- verificar numero de telefone ---
  const verificarTelefoneAdministradores = async (telefone) =>{
    const reqBuscarAdministradores = await fetch(`${url}/administrador`);
    const administradores = await reqBuscarAdministradores.json();

      // procura cpf na lista de solicitantes
    const administrador2Find = administradores
      .find(administrador => administrador.userTelefone === telefone);

    // true or false
    return administrador2Find !== undefined;
  }

  // --- verificar numero de telefone ---
  const verificarTelefoneAssistencia = async (telefone) =>{
    const reqBuscarAssistencias = await fetch(`${url}/assistencia`);
    const assistencias = await reqBuscarAssistencias.json();

    // procura telefone na lista de assistencias
    const assistencia2Find = assistencias
      .find(assistencia => assistencia.userTelefone === telefone);

    // true or false
    return assistencia2Find !== undefined;
  }

  // --- verificar nome fantasia 
  const verificarNomeFantasia = async (nomeFantasia) => {
    const reqBuscarAssistencias = await fetch(`${url}/assistencia`);
    const assistencias = await reqBuscarAssistencias.json();

    // procura nome fantasia na lista de assistencias
    const assistencia2Find = assistencias
      .find(assistencia => assistencia.nomeFantasia === nomeFantasia);

    // true or false
    return assistencia2Find !== undefined;
  }

  // --- verificar razao social ---
  const verificarRazaoSocial = async (razaoSocial) => {
    const reqBuscarAssistencias = await fetch(`${url}/assistencia`);
    const assistencias = await reqBuscarAssistencias.json();

    // procura razao Social na lista de assistencias
    const assistencia2Find = assistencias
      .find(assistencia => assistencia.razaoSocial === razaoSocial);

    // true or false
    return assistencia2Find !== undefined;
  }

  return {
    useVerificadorDeCpf,

    verificaCpfDeSolicitantes,
    verificaCpfDeAdms,
    verificaEmailDeAdms,
    verificaEmailDeSolicitantes,
    verificaEmailDeAssistencia,
    verificarCnpjDeAssistencias,
    verificarTelefoneSolicitantes,
    verificarTelefoneAdministradores,
    verificarTelefoneAssistencia,
    verificarNomeFantasia,
    verificarRazaoSocial
  };
}
