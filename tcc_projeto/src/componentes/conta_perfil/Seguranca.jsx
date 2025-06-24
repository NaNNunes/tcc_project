// botao para permitir visualizar senha
import {Form, FloatingLabel, Button, Row, Col} from "react-bootstrap";
import Container from 'react-bootstrap/Container'

import { useForm } from "react-hook-form";

// hooks
import { useUser } from "../../hooks/useUser.js";

// Importação do styles.
import styles from './conta_perfil.module.css';

const Seguranca = (props) => {
    
    const { register, handleSubmit, setValue, formState: {errors}} = useForm();

    const {verificaSenhaInformada, alteraSenhaUser} = useUser();

    const onSubmit = async (data) => {
        // verifica se senha atual é realmente a senha atual, comparar nova senha
        const isSenhaValida = await verificaSenhaInformada(data.senha);
        (isSenhaValida)
            ?  alert("Senha atual inválida ou vazia")
            : 
                (data.novaSenha == data.confirmaNovaSenha)
                    ? alteraSenhaUser(data.novaSenha)
                    : alert("senha e confirmar senha divergentes");
                        
    }

    const onError = (error) => {
        console.log(error)
    }

  return (
    <>
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <Container fluid className={styles.parteFormulario} style={{marginBottom: '20px'}}>
                {/* alterar senha */}
                <Row>
                    <Col xs={6}>
                        <h3>Dados de Segurança</h3>
                    </Col>
                </Row>
                <Row>
                    <Row>
                        <Col xs={4}>
                            <h5 style={{color:"gray"}}>Alterar senha</h5>
                        </Col>
                    </Row>
                    <Col>
                        <FloatingLabel
                            controlId="currentPssUserInput"
                            label="Senha Atual"
                            className="mb-3"    
                        >
                            <Form.Control
                                type="password"
                                placeholder=""
                                {
                                    ...register("senha")
                                }
                            />

                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="newPssUserInput"
                            label="Nova Senha"
                            className="mb-3"    
                        >
                            <Form.Control
                                type="password"
                                placeholder=""
                                {
                                    ...register("novaSenha")
                                }
                            />

                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="checkNewPssUSerInput"
                            label="Confirmar Senha"
                            className="mb-3"    
                        >
                            <Form.Control
                                type="password"
                                placeholder=""
                                {
                                    ...register("confirmaNovaSenha")
                                }
                            />

                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <Button
                            as="input"
                            value="Salvar"
                            type="submit"
                            size="lg"
                        />
                    </Col>
                </Row>
                {/* Pergunta de segurança */}
                <Row>
                    <Col sm={6}>
                        <h4>Pergunta de segurança</h4>
                    </Col>
                    <Row>
                        <p>Altere a pergunta de segurança que será usada para recuperar sua senha.</p>
                    </Row>
                    <Row>
                        <Col xs={5}>
                            <Button
                                as="input"
                                value="Alterar pergunta"
                                type="submit"
                                size="lg"
                            />
                        </Col>
                    </Row>
                </Row>
            </Container>
        </Form>
    </>
  )
}

export default Seguranca