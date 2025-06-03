import {Form, FloatingLabel, Row, Col, Button} from 'react-bootstrap';

import Card from 'react-bootstrap/Card';

import { useUser } from '../../hooks/useApi';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/userContext';
const Encerrar = () => {
    
    const {logout} = useContext(AuthContext);

    const {register, handleSubmit, formState:{error}} = useForm();
    
    const {inserirValidacao, verificaSenhaInformada} = useUser();
    const [liberaCampoSenha, setLiberaCampoSenha] = useState(false);

    
    const verificaCerteza = () => {
        // é um teste 
        if(confirm("Ação a seguir excluirá a sua conta, deseja prosseguir?")){
            setLiberaCampoSenha(true);
        }
        else{
            setLiberaCampoSenha(false);
        }
    }

    // alternativa   
    const exclusao = async () => {
        const confirmacao = confirm("Ação a seguir excluirá a sua conta, deseja prosseguir?");
        if(confirmacao){
            const inputSenha = prompt("Inisra sua senha para confirmar")
            verificaSenhaInformada(inputSenha)
                && 
                    inserirValidacao(false);
                    logout();
        }
    }

    const onSubmit = async (data) => {
        // nao funciona
        console.log(data);
        (verificaSenhaInformada(data.senha))
            && inserirValidacao(false)
    }

    const onError = (error) => {
        console.log(error);
    }

  return (
    <>
        <Card
            className='border rounded-3 shadow'
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <Row className='m-2 mt-3'>
                <Col xs={4}>
                    <h3>Encerrar conta</h3>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col>
                    <p className='mx-2 '>
                        Encerre sua conta, incluindo todas as informações pessoais.
                        O encerramento permanente da sua conta ocorrerá imediatamente
                        depois da confirmação.
                    </p>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={3} className='mx-2'>
                    <Button
                        variant='danger'
                        as="input"
                        value="Encerrar"
                        type="submit"
                        size="lg"
                        onClick={()=>{verificaCerteza()}}
                    />
                </Col>
                {
                    // nao funciona
                    (liberaCampoSenha)
                        &&
                            <Form
                                onSubmit={handleSubmit(onSubmit, onError)}
                            >
                                <Col xs={3}>
                                    <FloatingLabel
                                        controlId='senhaExclusao'
                                        label='senha'
                                        className='mb-3'
                                    >
                                        <Form.Control
                                            type='password'
                                            placeholder=''
                                            {
                                                ...register("senha")
                                            }
                                        />
                                    </FloatingLabel>
                                    <Button
                                        as='input'
                                        value="confirmar"
                                        type='button'
                                        onClick={()=>{exclusao()}}
                                    />
                                </Col>
                            </Form>      
                }
            </Row>
        </Card>
    </>
  )
}

export default Encerrar