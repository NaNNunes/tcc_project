import {Form, FloatingLabel, Button, Row, Col, Container, Image} from "react-bootstrap";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "../../componentes/cadastro-user/informacoes.module.css";

import { addAdm } from "../../hooks/crudUserApi";
import { verificadorCpf } from "../../functions/verificador_cpf";

const CadastroUser = () => {
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm();
  
    const onSubmit = (data) => {
  
      if(!verificadorCpf(data.cpf)){
        console.log("cpf inválido")
        return false;
      }
  
      console.log("dados: ", data);
      addAdm(data)
      navigate("/pergunta-seguranca")
    }
  
    const onError = (errors) => {
      console.log("Error: ", errors);
    }
  
    // to do renan : chamar funcao para registro na api local
  
    return (
      <Container className={styles.container}>
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
            <Col>
              <h6 className="text-white">
                Primeiro, queremos saber mais sobre você
              </h6>
              <hr className="mb-3 mx-5 text-white border-2" />
            </Col>
          </Row>
        </Row>
        <Form 
          className='px-4'
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Row>
            {/* E-mail */}
            <Col>
              <FloatingLabel
                id="userEmailInput"
                className="mb-3"
                label="Email"
              >
                <Form.Control
                  type="email"
                  placeholder=""
                  {
                    ...register("email")
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
  
          <Row className="">
            {/* CPF e Telefone */}
            <Col>
              <FloatingLabel
                id="userCpfInput"
                className="mb-3"
                label='CPF'
              >
                <Form.Control
                  type="text"
                  placeholder="000.000.000-00"
                  {
                    ...register("cpf")
                  }
                />
              </FloatingLabel>
            </Col>
  
            <Col>
              <FloatingLabel
                id="userTelInput"
                className="mb-3"
                label='Telefone'
              >
                <Form.Control
                  type="text"
                  placeholder="(00) 00000-0000"
                  {
                    ...register("telefone")
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
  
          {/* Nome e Sobrenome */}
          <Row className="">
            <Col className="">
              <FloatingLabel
                id="userNomeInput"
                className="mb-3"
                label="Nome"
              >
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  {
                    ...register("nome")
                  }
                />
              </FloatingLabel>
            </Col>
  
            <Col className="">
              <FloatingLabel
                id="userSobrenomeInput"
                className="mb-3"
                label="Sobrenome"
              >
                <Form.Control
                  type="text"
                  placeholder="Sobrenome"
                  {
                    ...register("sobrenome")
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
  
          <Row>
            {/* Senha */}
            <Col>
              <FloatingLabel
                id="userSenhaInput"
                className="mb-3"
                label="Senha"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("senha", 
                    /*{
                    required: "A senha é obrigatória",
                    minLength: {
                        value: 8,
                        message: "A senha deve ter pelo menos 8 caracteres",
                    },
                    maxLength: {
                        value: 20,
                        message: "A senha deve ter menos de 20 caracteres",
                    },
                    pattern: {
                        value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                            "A senha deve conter pelo menos uma letra maiúscula uma letra minúscula, um número e um caractere especial",
                    },
                    }*/)
                  }
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel 
                id="userConfirmaSenhaInput"
                className="mb-3"
                label="Confirmar Senha"
              >
                <Form.Control
                  type="password"
                  placeholder=""
                  {...register("confirmarSenha", {
                    required: "A confirmação de senha é obrigatória",
                    // Missão para @nata
                    // validate: (value) =>
                    //     value === watch("senha") || "As senhas não coincidem",
                })}
                />
              
              </FloatingLabel>
            </Col>
          </Row>
  
          <Row className="my-3">
            {/* Checkbox de termos de uso */}
            <Col sm={6}>
              <Form.Check
                className={styles.checkbox}
                type="checkbox"
                id="termsCheck"
                label="Li e aceito os termos de uso"
              />
            </Col>
          </Row>
  
            <Row>
              <Col>
                
                  <Button
                    as="input"
                    value="Avançar"
                    type="submit"
                    size="lg"
                    className={`${styles.Button}`}
                  />
              
              </Col>
            </Row>
  
            <hr className="mt-4 mx-5 text-white border-2"/>
            
            <Row className="mt-5">
              <Col>
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
    )
}

export default CadastroUser