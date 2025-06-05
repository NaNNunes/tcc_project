// alteração nao funciona, complicado viu
import {Form, FloatingLabel, Row, Col, Button} from "react-bootstrap";

import { use, useState } from "react";
import { useForm } from "react-hook-form";

// hooks
import { useEndereco } from "../hooks/useApi";

const Endereco = (props) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm();

  // para cadastro de um novo endereco
  const {cadastrarEndereco, atualizarEndereco} = useEndereco();

  // 
  const endereco = props.endereco;

  // preenche campos de endereco // mudar para onload
  for(const [key, value] of Object.entries(endereco)){
    setValue(key, value);
  }

  // enable input at the fields
    // !false para fazer teste de alteração
  const [inputFieldEnable, setInputFieldEnable] = useState(!false);

  // busca o cep informado na api e define valores da instancia do objeto nos campos
  const handleZipCodeBlur = async (e) =>{
    
    const zipCode = e.target.value    //cep informado
    
    // nao funciona
    // console.log((zipCode != props.endereco.zipcode))
    // if(zipCode != props.endereco.zipcode)
    // {
    //     for(const [key, value] of Object.entries(props.endereco)){
    //       if(props.endereco.key != "zipcode"){
    //         setValue(key, "");
    //       }
    //       else{
    //         setValue(key, zipCode)
    //       }
    //     }
    // }

    // caso endereco invalido
    if (zipCode.length !== 8) {
      alert("CEP deve conter exatamente 8 números.");
      // desabilita alteração de campo
      setInputFieldEnable(false);
      //limpa campos
      for(const[key, value] of Object.entries(endereco)){
        setValue(key,"")
      }
      return false;
    }

    // consulta
  
    try {
      const request = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipCode}`);
      const response = await request.json();

      // consulta sem sucesso
      if (!(response.ok)) {
        // alerta de erro
        alert("Endereço não encontrado");
        //limpa campos
        for (const [key] of Object.entries(endereco)) {
          setValue(key, "")
        }
        return false;
      }

      // desabilita alteração de campo
      setInputFieldEnable(false);
      //define valores da instancia em seus determinados campos
      for (const [key, value] of Object.entries(response)) {
        setValue(key, value);
      }

    }
    catch (erro) {
      // Habilita alteração de campo
      setInputFieldEnable(true);
      
      alert("ops, algo deu errado 2")
      //limpa campos
      for (const [key] of Object.entries(endereco)) {
        setValue(key, "")
      }
    }
  }
  
  // form enviado com sucesso
  const onSubmit = (data) =>{
    console.log(data);
    
    // verifica se o cep foi alterado
    console.log(data.zipcode == endereco.zipcode);
    (data.zipcode == endereco.zipcode)
      ? cadastrarEndereco(data)
      : atualizarEndereco(endereco.id ,data)

  }

  // form sem exito no envio
  const onError = (error) => {
    console.log("erro:",error);
  }

  return (
    <>
        <Form 
          className="border rounded-3 shadow mb-3" 
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Row className="m-2 mt-3">
            <Col xs={3}>
              <h3>Endereco</h3>
            </Col>
          </Row>
          <Row className="m-1">
            <Col>
              <FloatingLabel
                controlId="cepUserInput"
                label="CEP"
                className="mb-3"
              >
               <Form.Control
                 type="text"
                 placeholder="00000-000"
                 maxLength={9}
                 {...register("zipcode", {
                  //  validate: (value) => {
                  //    const numeros = value.replace(/\D/g, "");
                  //    if (numeros.length !== 8) return "Necessário 8 números";
                  //    return true;
                  //  },
                  //  onChange: (e) => {
                  //    const formatado = formatarCEP(e.target.value);
                  //    setValue("zipcode", formatado);
                  //  },
                   onBlur: handleZipCodeBlur
                 })}
               />
               {errors.zipcode && (
                 <p className='text-danger'>{errors.zipcode.message}</p>
               )}
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="cityUserInput"
                label="Cidade"
                className="mb-3"
              >
                <Form.Control
                  disabled={inputFieldEnable}
                  type="text"
                  placeholder=""
                  {
                    ...register("localidade")
                  }
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="bairroUserInput"
                label="Bairro"
                className="mb-3"
              >
                <Form.Control
                  disabled={inputFieldEnable}
                  type="text"
                  placeholder=""
                  {
                    ...register("bairro")
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="m-1">
            <Col>
              <FloatingLabel
                controlId="logradouroUserInput"
                label="Logradouro"
                className="mb-3"
              >
                <Form.Control
                  disabled={inputFieldEnable}
                  type="text"
                  placeholder=""
                  {
                    ...register("logradouro")
                  }
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="ufUserInput"
                label="UF"
                className="mb-3"
              >
                <Form.Control
                  disabled={inputFieldEnable}
                  type="text"
                  placeholder=""
                  {
                    ...register("uf")
                  }
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="numResidUserInput"
                label="Nº"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  {
                    ...register("number")
                  }
                  
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="m-1 mb-3">
            <Col>
              <FloatingLabel
                controlId="complementoUserInput"
                label="Complemento"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  {
                    ...register("complemento")
                  }
                  
                />
              </FloatingLabel>
            </Col>
            <Col sm={3} className="my-1">
              <Button
                as="input"
                value="Salvar"
                type="submit"
                size="lg"
              />
            </Col>
          </Row>
        </Form>
    </>
  )
}

export default Endereco