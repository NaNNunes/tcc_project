import {Form, FloatingLabel, Row, Col, Button} from 'react-bootstrap';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUser, useCadastroAssistencia } from '../../hooks/useApi';

const EditarPag = (props) => { // TO DO solicitar senha e definir assistencia como falsa
    const {register, handleSubmit, formState:{error}} = useForm();
    
    const {inserirValidacaoAssistencia} = useCadastroAssistencia();

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
        const validacao = confirm("Ação a seguir excluirá a sua conta, deseja prosseguir?");
        if(validacao){
            const inputSenha = prompt("Inisra sua senha para confirmar")
            verificaSenhaInformada(inputSenha) === true
                &&  inserirValidacaoAssistencia(props.id_assistencia, false);
        }
    }

    const onSubmit = async (data) => {
        // nao funciona
        // console.log(data);
        // (verificaSenhaInformada(data.senha))
        //     && inserirValidacao(false)
    }

    const onError = (error) => {
        console.log(error);
    }
  return (
    <>
        <Form 
            className='border rounded-3 shadow mb-3'
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <Row className='m-2 mt-3'>
                <Col sm={5}>
                    <h3>Editar pagamento</h3>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col>
                    <p className='mx-2 '>
                        Edite a data em que cobraremos sua mensalidade.
                        Você pode mudar a data de pagamento uma vez por ano.
                    </p>
                </Col>
            </Row>
            <Row className='m-1 d-flex justify-content-around'>
                <Col xs={3}>
                    <FloatingLabel
                        controlId="dtPagAssistenciaInput"
                        label="Data de pagamento"
                        className="mb-3"
                    >
                        <Form.Control
                            type="date"
                            placeholder=""
                        />
                    </FloatingLabel>
                </Col>

                <Col sm={3} className='mx-2 my-1'>
                    <Button
                        variant='danger'
                        as="input"
                        value="Encerrar"
                        type="submit"
                        size="lg"
                        onClick={()=>{exclusao()}}
                    />
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default EditarPag