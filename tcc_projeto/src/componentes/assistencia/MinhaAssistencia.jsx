
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import EditarPag from '../conta_perfil/EditarPag';
import Endereco from '../Endereco';

import { useParams } from 'react-router-dom';

const MinhaAssistencia = (props) => {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm();

    const listaAssistencias = props.assistencias;
    const admId = props.admId || localStorage.getItem("userId");
    const [idAssistencia, setIdAssistencia] = useState();
    const [enderecoAssistencia, setEnderecoAssistencia] = useState({});

    const onSubmit = (data) =>{

    }

    const onError = (error) =>{

    }

    const buscaEnderecoById = async (id_endereco) =>{
        const buscaEnderecoById = await fetch(`http://localhost:5001/endereco/${id_endereco}`);
        const respBuscaEnderecoById = await buscaEnderecoById.json();

        console.log(respBuscaEnderecoById);
        setEnderecoAssistencia(respBuscaEnderecoById);
    }

  return (
    <>
        <Form 
            className='border rounded-3 shadow mb-3 p-1'
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <Row className='p-1'>
                <Col className='m-1'>
                    <h3>Minha Assistencia</h3>
                </Col>
                <Col></Col>
                <Col sm={3} className='mx-2'>
                    <Button
                        as="input"
                        value="Adicionar"
                        type="submit"
                        size="lg" 
                    />
                </Col>
            </Row>
            <Row className='m-1'>
                <Col sm={4}>
                    {/* Fazer verificaão da quantidade de assistencias
                        cadastradas pelo user de acordo com seu id */}
                    <Form.Select 
                        className='mb-3 p-3'
                        // ao trocar opção do select, 
                        // cnpj é definido e assim as infos da assistencia carregarão nos campos abaixo
                        onChange={(e) =>{
                            const cnpjSelecionado = e.target.value;
                            
                            // procura assistencia com cnpj selecionado na lista de assitencias do user
                            const assistencia2find = listaAssistencias.find((assistencia) => {
                                return assistencia.cnpj === cnpjSelecionado; 
                            });
                            // props de edita pagamento
                            setIdAssistencia(assistencia2find.id);
                            const id_endereco_assistencia = assistencia2find.id_endereco;

                            // preenche campos com dados da assistencia encontrada
                            for(const [key,value] of Object.entries(assistencia2find)){
                                setValue(key, value);
                            }

                            // pega fk id endereco da assistencia
                            buscaEnderecoById(id_endereco_assistencia);
                        }}
                    >
                        <option> CNPJ </option>
                        {
                            // mapeia elemento option apenas com cnpjs vinculados ao user
                            listaAssistencias.map((assistencia) => (
                                (assistencia.administradorId === admId && assistencia.isValido === true)
                                    && <option key={assistencia.id}>{assistencia.cnpj}</option>
                            ))
                        }

                    </Form.Select>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId='assistenciaEmailInput'
                        label="Email"
                        className='mb-3'
                    >
                        <Form.Control
                            type="email"
                            placeholder=""
                            {
                                ...register("assistenciaEmail")
                            }
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col sm={4}>
                    <FloatingLabel
                        controlId='assistenciaTelInput'
                        label="Telefone"
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            placeholder=''
                            {
                                ...register("assistenciaTelefone")
                            }
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId='assistenciaNomeFantasiaInput'
                        label="Nome fantasia"
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            placeholder=''
                            {
                                ...register("nomeFantasia")
                            }
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className='m-1'>
                <Col>
                    <FloatingLabel
                        controlId='assistenciaRzSocialInput'
                        label="Razão Social"
                        className='mb-3'
                    >
                        <Form.Control
                            type='text'
                            placeholder=''
                            {
                                ...register("razaoSocial")
                            }
                        />
                    </FloatingLabel>
                </Col>
                <Col sm={3} className='mx-2 my-1'>
                    <Button
                        as="input"
                        value="Salvar"
                        type="submit"
                        size="lg" 
                    />
                </Col>
            </Row>
        </Form>
        
        
        <Endereco  endereco={enderecoAssistencia}/>
        {/* <EditarPag id_assistencia={idAssistencia}/> */}
    </>
  )
}

export default MinhaAssistencia