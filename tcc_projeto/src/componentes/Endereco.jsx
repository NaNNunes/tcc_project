import {Form, FloatingLabel, Row, Col, Button} from "react-bootstrap";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { getEnd_API, getEnd_local_API} from "../hooks/useApi"; 

const Endereco = () => {
  // pega enderecos na api local
  const enderecos = getEnd_local_API();
  
  // useForm para gerenciamento do form
  // register para registrar campus do form
  // hndlsub para envio de form
  // formstate contem estado do form, erros inclusos
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  // form enviado com sucesso
  const onSubmit = (data) =>{
    getEnd_API(data.cep);
    console.log("---- mostrar dados ----")
    mostraDadosEndereco(data.cep)
  }

  // form sem exito no envio
  const onError = (error) => {
    console.log("erro:",error);
  }

  const mostraDadosEndereco = (cepInput) =>{
    let endereco_encontrado = {};
    
    enderecos.map((endereco)=>{
      console.log("endereco encontrado: ",endereco)
      console.log("cep inputado: ", cepInput);
    })
    console.log("---------------------------")

    // encontrar endereco na lista de enderecos na api local pelo cep inserido
    // para isso necessario pegar o vetor e localizar a instancia do obj no array
  }

  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");

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
                  placeholder=""
                  {
                    ...register("cep")
                  }
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="emailUserInput"
                label="Cidade"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  value={""}
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
                  type="text"
                  placeholder=""
                  value={""}
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
                  type="text"
                  placeholder=""
                  value={""}
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
                  type="text"
                  placeholder=""
                  value={""}
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
                  value={""}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="m-1 mb-3">
            <Col>
              <FloatingLabel
                controlId="numResidUserInput"
                label="Complemento"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  value={""}
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