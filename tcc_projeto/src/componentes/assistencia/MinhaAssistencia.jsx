// Importação do react-boostrap.
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Importação do styles.
import styles from "../conta_perfil/conta_perfil.module.css";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import EditarPag from "../conta_perfil/EditarPag";
import Endereco from "../Endereco";

import { useParams } from "react-router-dom";

const MinhaAssistencia = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const listaAssistencias = props.assistencias;
  const admId = props.admId || localStorage.getItem("userId");
  const [idAssistencia, setIdAssistencia] = useState();
  const [enderecoAssistencia, setEnderecoAssistencia] = useState({});

  const onSubmit = (data) => {};

  const onError = (error) => {};

  const buscaEnderecoById = async (id_endereco) => {
    const buscaEnderecoById = await fetch(
      `http://localhost:5001/endereco/${id_endereco}`
    );
    const respBuscaEnderecoById = await buscaEnderecoById.json();

    console.log(respBuscaEnderecoById);
    setEnderecoAssistencia(respBuscaEnderecoById);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Container
          fluid
          className={styles.parteFormulario}
          style={{ marginBottom: "20px" }}
        >
          {/* Título */}
          <Row style={{ paddingBottom: "1%" }}>
            {/* Título */}
            <Col md={10} xs={10}>
              <h3 className={styles.titleh3}>Minha Assistencia</h3>
            </Col>

            <Col md={2} xs={2}>
              <Button type="submit" className={styles.botaoSalvar}>
                Adicionar
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Fazer verificaão da quantidade de assistencias
                            cadastradas pelo user de acordo com seu id */}
              <Form.Select
                className="mb-3 p-3"
                // ao trocar opção do select,
                // cnpj é definido e assim as infos da assistencia carregarão nos campos abaixo
                onChange={(e) => {
                  const cnpjSelecionado = e.target.value;

                  // procura assistencia com cnpj selecionado na lista de assitencias do user
                  const assistencia2find = listaAssistencias.find(
                    (assistencia) => {
                      return assistencia.cnpj === cnpjSelecionado;
                    }
                  );
                  // props de edita pagamento
                  setIdAssistencia(assistencia2find.id);
                  const id_endereco_assistencia = assistencia2find.id_endereco;

                  // preenche campos com dados da assistencia encontrada
                  for (const [key, value] of Object.entries(assistencia2find)) {
                    setValue(key, value);
                  }

                  // pega fk id endereco da assistencia
                  buscaEnderecoById(id_endereco_assistencia);
                }}
              >
                <option> CNPJ </option>
                {
                  // mapeia elemento option apenas com cnpjs vinculados ao user
                  listaAssistencias.map(
                    (assistencia) =>
                      assistencia.administradorId === admId &&
                      assistencia.isValido === true && (
                        <option key={assistencia.id}>{assistencia.cnpj}</option>
                      )
                  )
                }
              </Form.Select>
            </Col>

            <Col>
              <FloatingLabel
                controlId="assistenciaEmailInput"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder=""
                  {...register("assistenciaEmail")}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                controlId="assistenciaTelInput"
                label="Telefone"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register("assistenciaTelefone")}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel
                controlId="assistenciaNomeFantasiaInput"
                label="Nome fantasia"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register("nomeFantasia")}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col>
              <FloatingLabel
                controlId="assistenciaRzSocialInput"
                label="Razão Social"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register("razaoSocial")}
                />
              </FloatingLabel>
            </Col>

            <Col sm={3}>
              <Button as="input" value="Salvar" type="submit" size="lg" />
            </Col>
          </Row>
        </Container>
      </Form>

      <Endereco endereco={enderecoAssistencia} />
      {/* <EditarPag id_assistencia={idAssistencia}/> */}
    </>
  );
};

export default MinhaAssistencia;
