// styles
import styles from "./cadastro.module.css";

// react bootstrap componentes
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

// hooks
import { useForm } from "react-hook-form";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {useUser, useEndereco} from "../../hooks/useApi";

const CadastroEndereco = () => {

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const {cadastrarEndereco} = useEndereco();
  const {inserirValidacao} = useUser();
  const navigate = useNavigate();

  const [endereco, setEndereco] = useState({
    city: "",
    neighborhood: "",
    street: "",
    state: ""
  })

  const userCategoria = localStorage.getItem("userCategoria");

  // enable input at the fields
  const [inputFieldEnable, setInputFieldEnable] = useState(false);

  // busca o cep informado na api e define valores da instancia do objeto nos campos
  const handleZipCodeBlur = async (e) =>{
    const zipCode = e.target.value.replace(/\D/g, "")    //cep informado
    
    // caso endereco invalido
    if (zipCode.length !== 8) {
      alert("CEP deve conter exatamente 8 números.");
      // desabilita alteração de campo
      setInputFieldEnable(false);
      //limpa campos
      for(const[key, value] of Object.entries(endereco)){
        setValue(key,value)
      }
      return false;
    }

    // consulta
  
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipCode}`);
      const data = await response.json();

      // consulta sem sucesso
      if (!(response.ok)) {
        // alerta de erro
        alert("Endereço não encontrado");
        //limpa campos
        for (const [key, value] of Object.entries(endereco)) {
          setValue(key, value)
        }
        return false;
      }

      // desabilita alteração de campo
      setInputFieldEnable(false);
      //define valores da instancia em seus determinados campos
      for (const [key, value] of Object.entries(data)) {
        setValue(key, value);
      }

    }
    catch (erro) {
      // Habilita alteração de campo
      setInputFieldEnable(true);
      alert("ops, algo deu errado")
      //limpa campos
      for (const [key, value] of Object.entries(endereco)) {
        setValue(key, value)
      }
    }
  }

  const onSubmit = (data) => {
    cadastrarEndereco(data)
    inserirValidacao(true);

    navigate("/login");
  };

  const formatarCEP = (cep) => {
    const numeros = cep.replace(/\D/g, "").slice(0, 8);
    if (numeros.length <= 5) return numeros;
    return numeros.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  };

  const cepValue = watch("zipcode") || "";

  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  return (
    <Container className={styles.containerEndereco}>
      {/* Parte de cima */}
      <Row>
        <Row className="mb-3">
          <Col>
            <Image
              className={styles.Image}
              src="/logos/connectfix_logo.svg"
              fluid
            />
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center">
            {/* modifica o texto de solicitação de endereco de acordo com o user */}
            <Card.Subtitle className="text-center text-white">
              Estamos quase lá!
              <br />
              {userCategoria == 2 &&
                <> Pra finalizar, coloque o endereço de seu negócio.</>
              }
            </Card.Subtitle>

            <hr className="mb-3 text-white border-2 w-75" />
          </Col>
        </Row>
      </Row>

      <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row className="">
          <Col>
            <FloatingLabel id="userCepInput" className="mb-3" label="CEP">
              <Form.Control
                type="text"
                placeholder="00000-000"
                maxLength={9}
                {...register("zipcode", {
                  validate: (value) => {
                    const numeros = value.replace(/\D/g, "");
                    if (numeros.length !== 8) return "Necessário 8 números";
                    return true;
                  },
                  onChange: (e) => {
                    const formatado = formatarCEP(e.target.value);
                    setValue("zipcode", formatado);
                  },
                  onBlur: handleZipCodeBlur
                })}
              />
              {errors.zipcode && (
                <p className={styles.error}>{errors.zipcode.message}</p>
              )}

            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel id="userCityInput" className="mb-3" label="Cidade">
  
              <Form.Control
                disabled={!inputFieldEnable}
                type="text"
                placeholder=" "
                {...register("city")}
              />
                  
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="">
          <Col className="">

            <FloatingLabel id="userBairroInput" className="mb-3" label="Bairro">

              <Form.Control
                disabled={!inputFieldEnable}
                type="text"
                placeholder="Bairro"
                {...register("neighborhood")}
              />

            </FloatingLabel>
          </Col>

          <Col className="">
            <FloatingLabel
              id="userLogradouroInput"
              className="mb-3"
              label="Logradouro"
            >
              <Form.Control
                disabled={!inputFieldEnable}
                type="text"
                placeholder="Logradouro"
                {...register("street")}
              />

            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel id="userUFInput" className="mb-3" label="UF">
              <Form.Control
                disabled={!inputFieldEnable}
                type="text"
                placeholder="UF"
                {...register("state")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel id="userNumInput" className="mb-3" label="Nº">
              <Form.Control
                type="text"
                placeholder=""
                {...register("number", {
                  required: "Necessário número de residência",
                  minLength: {
                    value: 2,
                    message: "Número necessário" //melhorar essa msg
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Somente números"
                  }
                })}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center mt-2">
            <Button
              as="input"
              value={(userCategoria == 1) ? "Finalizar" : "Seguir"}
              type="submit"
              size="lg"
              className={`${styles.Button}`}
            />
            <hr className="mb-3 text-white border-2 w-100" />
          </Col>
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center mt-2">
            <h6 className="text-white">
              Já possui conta?{" "}
              <Link to="/login" className={styles.link}>
                Login
              </Link>
            </h6>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CadastroEndereco;
