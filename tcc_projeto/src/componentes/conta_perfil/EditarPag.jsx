// Importação de componentes do react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUser, useCadastroAssistencia } from '../../hooks/useApi';

const EditarPag = (props) => {
    const idAssistencia = props.id_assistencia;

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
        const confirmacao = confirm("Ação a seguir excluirá a sua conta, deseja prosseguir?");
        if(confirmacao){
            const inputSenha = prompt("Inisra sua senha para confirmar");
            const verificadorDeSenha = await verificaSenhaInformada(inputSenha);
            if(verificadorDeSenha){
                inserirValidacaoAssistencia(idAssistencia, false);
                location.reload();
            } 
        }
    }

    const onSubmit = async (data) => {
        
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
                <Col>
                    <Button
                        as="input"
                        value="Editar"
                        type="submit"
                        size="lg"
                    />
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