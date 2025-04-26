import {Form, FloatingLabel, Row, Col, Button} from "react-bootstrap";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { getEnd_API, getEnd_local_API } from "../../hooks/useApi"; 

const Endereco = () => {

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
    console.log(data.cep);
    getEnd_API(data.cep);
  }

  // form sem exito no envio
  const onError = (error) => {
    console.log("erro:",error);
  }

  // não consigo pegar os valores de endereco e joga-los 
  // nos fields com exportacao de funcao para coleta de dados
  // resultado de valor retornado = undefined
  // const mostraDadosEndereco = (endereco) =>{
  //   console.log("-------------------------------------------")
  //   console.log("Mostra dados")
  //   console.log(endereco);
  // }

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
          <Row className="mb-3">
            <Col xs={3}>
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