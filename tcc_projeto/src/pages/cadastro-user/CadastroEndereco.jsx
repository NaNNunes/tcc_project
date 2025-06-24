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
import { useNavigate } from "react-router-dom";

import { useEndereco } from "../../hooks/useEndereco.js";
import { useUser } from "../../hooks/useUser.js";

import { useContext } from "react";
import { AuthContext } from "../../context/userContext.jsx";

const CadastroEndereco = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const {setType} = useContext(AuthContext);

  const user = localStorage.getItem("tipoUsuario");
  console.log(user);
  const { cadastrarEndereco } = useEndereco();
  const { inserirValidacao } = useUser();
  const navigate = useNavigate();

  // enable input at the fields
  const [inputFieldEnable, setInputFieldEnable] = useState(false);

  // endereco
  const [endereco, setEndereco] = useState({
    uf: "",
    localidade: "",
    bairro: "",
    logradouro: "",
  });

  // busca o cep informado na api e define valores da instancia do objeto nos campos
  const handleZipCodeBlur = async (e) => {
    const zipCode = e.target.value.replace(/\D/g, ""); //cep informado

    // caso endereco invalido
    if (zipCode.length !== 8) {
      alert("CEP deve conter exatamente 8 números.");
      // desabilita alteração de campo
      setInputFieldEnable(false);
      //limpa campos
      for (const [key, value] of Object.entries(endereco)) {
        setValue(key, value);
      }
      return false;
    }

    // consulta

    try {
      // brasilApi
      // const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipCode}`);

      // viaCep
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      const data = await response.json();

      if (data.erro) {
        // alerta de erro
        alert("Endereço não encontrado");
        setInputFieldEnable(true);

        //limpa campos
        for (const [key] of Object.entries(endereco)) {
          setValue(key, "");
        }
        return false;
      }

      // desabilita alteração de campo
      setInputFieldEnable(false);
      //define valores da instancia em seus determinados campos
      for (const [key, value] of Object.entries(data)) {
        setValue(key, value);
      }
    } catch (erro) {
      // Habilita alteração de campo
      setInputFieldEnable(true);
      alert("ops, algo deu errado");
      //limpa campos
      for (const [key] of Object.entries(endereco)) {
        setValue(key, "");
      }
    }
  };

  const onSubmit = async (data) => {
    cadastrarEndereco(data);
    const isUserValido = await inserirValidacao(true);
    if(isUserValido){
      setType(user);
      navigate("/inicio");
    }
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

      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Image
            className={styles.Image}
            src="/logos/connectfix_logo.svg"
            fluid
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="d-flex flex-column align-items-center justify-content-center">
          {/* modifica o texto de solicitação de endereco de acordo com o user */}
          <Card.Subtitle className="text-center text-white mb-1">
            Estamos quase lá!
            <br />
            {user == 2 && (
              <> Pra finalizar, coloque o endereço de seu negócio.</>
            )}
          </Card.Subtitle>
          <hr className={styles.dividerLine} />
        </Col>
      </Row>

      <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row className="">
          <Col>
            <FloatingLabel id="userCepInput" className="mb-3" label="CEP">
              <Form.Control
                type="text"
                placeholder="00000-000"
                maxLength={9}
                isInvalid={!!errors.zipcode}
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
                  onBlur: handleZipCodeBlur,
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
                {...register("localidade")}
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
                {...register("bairro")}
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
                {...register("logradouro")}
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
                {...register("uf")}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel id="userNumInput" className="mb-3" label="Nº">
              <Form.Control
                type="text"
                placeholder=""
                isInvalid={!!errors.number}
                {...register("number", {
                  required: "Número é obrigatório",
                  minLength: {
                    value: 2,
                    message: "Digite pelo menos 2 dígitos",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Somente números",
                  },
                })}
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
        </Row>

        <Row>
          <Col className="d-flex flex-column align-items-center mt-3 mb-3">
            <Button
              as="input"
              value="Cadastrar"
              type="submit"
              size="lg"
              className={`${styles.Button}`}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CadastroEndereco;
