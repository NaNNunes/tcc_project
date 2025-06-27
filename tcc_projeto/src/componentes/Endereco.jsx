
import { Form, FloatingLabel, Row, Col, Button } from "react-bootstrap";

import Container from "react-bootstrap/Container";

import { use, useState } from "react";
import { useForm } from "react-hook-form";

// hooks
import { useEndereco } from "../hooks/useEndereco.js";

// Importação do estilo.
import styles from "./conta_perfil/conta_perfil.module.css";

const Endereco = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // para cadastro de um novo endereco
  const { cadastrarEndereco, atualizarEndereco } = useEndereco();

  //
  const endereco = props.endereco;

  // preenche campos de endereco // mudar para onload

  for (const [key, value] of Object.entries(endereco)) {
    setValue(key, value);
  }


  // enable input at the fields
  // !false para fazer teste de alteração
  const [inputFieldEnable, setInputFieldEnable] = useState(!false);

  // busca o cep informado na api e define valores da instancia do objeto nos campos
  const handleZipCodeBlur = async (e) =>{
    
    const zipCode = e.target.value    //cep informado


    // caso endereco invalido
    if (zipCode.length !== 8) {
      alert("CEP deve conter exatamente 8 números.");
      // desabilita alteração de campo
      setInputFieldEnable(false);
      //limpa campos
      for (const [key, value] of Object.entries(endereco)) {
        setValue(key, "");
      }
      return false;
    }

    // consulta

    try {
      const request = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${zipCode}`
      );
      const response = await request.json();

      // consulta sem sucesso
      if (!response.ok) {
        // alerta de erro
        alert("Endereço não encontrado");
        //limpa campos
        for (const [key] of Object.entries(endereco)) {
          setValue(key, "");
        }
        return false;
      }

      // desabilita alteração de campo
      setInputFieldEnable(false);
      //define valores da instancia em seus determinados campos
      for (const [key, value] of Object.entries(response)) {
        setValue(key, value);
      }
    } catch (erro) {
      // Habilita alteração de campo
      setInputFieldEnable(true);

      alert("ops, algo deu errado 2");
      //limpa campos
      for (const [key] of Object.entries(endereco)) {
        setValue(key, "");
      }
    }
  };

  // form enviado com sucesso
  const onSubmit = (data) => {
    console.log(data);

    // verifica se o cep foi alterado
    data.zipcode == endereco.zipcode
      ? cadastrarEndereco(data)
      : atualizarEndereco(endereco.id, data);
  };

  // form sem exito no envio
  const onError = (error) => {
    console.log("erro:", error);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container
          fluid
          className={styles.parteFormulario}
          style={{ marginBottom: "20px" }}
        >
          {/* Titulo */}
          <Row style={{ paddingBottom: "1%" }}>
            <Col md={12} xs={12}>
              <h3 className={styles.titleh3}>Endereço</h3>
            </Col>
          </Row>
          <Row>
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
                    onBlur: handleZipCodeBlur,
                  })}
                />
                {errors.zipcode && (
                  <p className="text-danger">{errors.zipcode.message}</p>
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
                  {...register("localidade")}
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
                  {...register("bairro")}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
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
                  {...register("logradouro")}
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
                  {...register("uf")}
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
                  {...register("number")}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="complementoUserInput"
                label="Complemento"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register("complemento")}
                />
              </FloatingLabel>
            </Col>
            <Col sm={3} className="my-1">
              <Button as="input" value="Salvar" type="submit" size="lg" />
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default Endereco;
