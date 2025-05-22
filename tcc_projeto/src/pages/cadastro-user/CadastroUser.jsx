//react bootstrap componentes
import Card  from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

//navegação by router dom
import { Link, useNavigate } from "react-router-dom";

// form
import { useForm } from "react-hook-form";

//styles
import styles from "./cadastro.module.css";

//hooks
import { useVerificadorDeCpf } from "../../hooks/useApi";

const CadastroUser = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {verificador} = useVerificadorDeCpf();
  const onSubmit = (data) => {
    
    // há maneira melhor de definir essa limitaçãp
    if(data.userCategoria != 1 && data.userCategoria != 2){
      alert("Defina um tipo de user");
      return false;
    }

    // verifica se cpf informado é válido
    if (!verificador(data.userCpf)) {
      return false;
    }
    // console.log(data);
    
    // jogar infos para o localStorage
    localStorage.setItem("userEmail",data.userEmail);
    localStorage.setItem("userSenha",data.senha);
    localStorage.setItem("userCategoria",data.userCategoria)
    localStorage.setItem("userCpf",data.userCpf);
    localStorage.setItem("userNome",data.userNome);
    localStorage.setItem("userSobrenome",data.userSobrenome);
    localStorage.setItem("userTelefone",data.userTelefone);
    localStorage.setItem("userTermos",data.userTermos);

    navigate("/pergunta-seguranca");
  };

  const senha = watch("senha");
  const onError = (errors) => {
    console.log("Error: ", errors);
  };

  return (
    <Container>
      <Card className={styles.container}>
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
            <Col className="d-flex align-items-center justify-content-center">
              <h6 className="text-white">
                Primeiro, queremos saber mais sobre você
              </h6>
              
            </Col>
            <hr className="mb-3 mx-5 text-white border-2" />
          </Row>
        </Row>
        <Form className="px-4" onSubmit={handleSubmit(onSubmit, onError)}>
          <Row>
            {/* E-mail */}
            <Col>
              <FloatingLabel id="userEmailInput" className="mb-3" label="Email">
                <Form.Control
                  type="email"
                  placeholder=""
                  {...register("userEmail",{/*require */})}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* CPF e Telefone */}
          <Row className="">
            <Col>
              <FloatingLabel id="userCpfInput" className="mb-3" label="CPF">
                <Form.Control
                  type="text"
                  placeholder="000.000.000-00"
                  {...register("userCpf",{
                    required:"CPF necessário",
                    minLength: {
                      value: 11,
                      message:"Necessário 11 dígitos"
                    },
                    maxLength:{ 
                      value: 11,
                      message:"Necessário 11 dígitos"
                    },
                    /* regex para apenas números */
                  })}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                id="userTelInput"
                className="mb-3"
                label="Telefone"
              >
                <Form.Control
                  type="text"
                  placeholder="(00) 00000-0000"
                  {...register("userTelefone",{/*require */})}
                />
              </FloatingLabel>
            </Col>
          </Row>
          {/* Nome e Sobrenome */}
          <Row className="">
            <Col className="">
              <FloatingLabel id="userNomeInput" className="mb-3" label="Nome">
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  {...register("userNome")}
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
                  {...register("userSobrenome")}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            {/* Senha */}
            <Col>
              <FloatingLabel id="userSenhaInput" className="mb-3" label="Senha">
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  isInvalid={!!errors.senha}
                  {...register("senha", {
                    required: "A senha é obrigatória",
                    minLength: {
                      value: 8,
                      message: "A senha deve ter pelo menos 8 caracteres",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.senha?.message}
                </Form.Control.Feedback>
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
                  placeholder="Confirmar Senha"
                  isInvalid={!!errors.confirmarSenha}
                  {...register("confirmarSenha", {
                    required: "A confirmação de senha é obrigatória",
                    validate: (value) =>
                      value === senha || "As senhas não coincidem",
                  })}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* checkbox */}
          <Form.Check
            className={styles.checkbox}
            type="checkbox"
            id="termsCheck"
            value={true}
            {...register("termos", {
              required: "Termos necessários",
            })}
            label={
              <>
                Li e aceito os{" "}
                <Link
                  to="/termos-de-uso"
                  className={styles.link}
                  style={{ fontSize: "13px" }}
                >
                  termos de uso
                </Link>
              </>
            }
          />

          <Row>
            <Col className="d-flex align-items-center justify-content-center mt-3">
              <Button
                as="input"
                value="Avançar"
                type="submit"
                size="lg"
                className={`${styles.Button}`}
              />
            </Col>
          </Row>
          <hr className="mt-3 mx-5 text-white border-2" />
          
          <Row className="mt-3">
            <Col className="d-flex align-items-center justify-content-center mb-2">
              <h6 className="text-white">
                Já possui conta?{" "}
                <Link
                  to="/login"
                  className={styles.link}
                  style={{ fontSize: "16px" }}
                >
                  Login
                </Link>
              </h6>
            </Col>
          </Row>

          {/* select temporario temporario */}
          <Form.Group>
            <Form.Select as="select" aria-label {...register("userCategoria")}>
              <option >Escolha seu nivel de user</option>
              <option value={1}>Solicitante</option>
              <option value={2}>ADM</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};

export default CadastroUser;
