import React from 'react'

// Importação do react-boostrap.
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel  from 'react-bootstrap/FloatingLabel';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

// Importação do useForm para mexer com o formulário.
import { useForm } from "react-hook-form";

// Importação do estilo.
import stylesCad from '../demanda/cadastro-demanda/CadastroDemanda.module.css'

const OrcamentoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = async (dados) => {
    console.log(dados);
  };

  const onError = (errors) => {
    console.log("Erros: ", errors);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className={stylesCad.formulario}>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Container 
            fluid 
            className={stylesCad.parteFormulario} 
            style={{
              paddingBottom: '1.7rem', marginBottom: '20px'
            }}
          >
            <div>
              {/* Titulo Escolha uma demanda. */}
              <Row>
                <Col md={12} xs={12}>
                  <h3 className={stylesCad.titleh3} style={{marginBottom: '5px'}}>Escolha uma demanda</h3>
                </Col>
              </Row>

              {/* Frase explicando para escolher uma demanda. */}
              <Row>
                <Col>
                  <p className='paragrafo'>Escolha uma das demandas listadas abaixo para que seja possível gerar o orçamento referente à mesma.</p>
                </Col>
              </Row>

              {/* Select das demandas. */}
              <Row>
                <Col md={4} xs={12} className={stylesCad.campo} style={{paddingBottom: '0px'}}>
                  <FloatingLabel
                    controlId='DemandaSelect'
                    label='Demanda'
                  >
                    <Form.Select>
                      <option value="">Demanda 1</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            {/* Divisão */}
            <hr 
              style={{
                border: 'none', 
                borderTop: '2px solid #cacaca', 
                margin: '30px 0', 
                width: '100%', 
                opacity: '1'
              }}
            />
            
            <div>
              {/* Titulo Informações da demanda. */}
              <Row style={{paddingBottom: '1%'}}>
                <Col md={12} xs={12}>
                  <h3 className={stylesCad.titleh3}>Informações da demanda</h3>
                </Col>
              </Row>

              {/* Linha com categoria, marca, fabricante e modelo. */}
              <Row>
                {/* Categoria. */}
                <Col>
                  <span><strong>Categoria: </strong>CATEGORIA</span>
                </Col>

                {/* Marca. */}
                <Col>
                  <span><strong>Marca: </strong>MARCA</span>
                </Col>

                {/* Fabricante. */}
                <Col>
                  <span><strong>Fabricante: </strong>FABRICANTE</span>
                </Col>

                {/* Modelo. */}
                <Col>
                  <span><strong>Modelo: </strong>MODELO</span>
                </Col>
              </Row>

              {/* Linha com tensão, amperagem e cor. */}
              <Row>
                {/* Tensão. */}
                <Col>
                  <span><strong>Tensão: </strong>TENSÃO</span>
                </Col>

                {/* Amperagem. */}
                <Col>
                  <span><strong>Amperagem: </strong>AMPERAGEM</span>
                </Col>

                {/* Cor. */}
                <Col>
                  <span><strong>Cor: </strong>COR</span>
                </Col>
              </Row>

              {/* Linha com descrição do problema. */}
              <Row>
                <Col>
                  <span><strong>Descrição do problema: </strong>DESCRIÇÃO</span>
                </Col>
              </Row>

              {/* Linha observações. */}
              <Row>
                <Col>
                  <span><strong>Observações: </strong>OBSERVAÇÕES</span>
                </Col>
              </Row>
            </div>

            {/* Divisão */}
            <hr 
              style={{
                border: 'none', 
                borderTop: '2px solid #cacaca', 
                margin: '30px 0', 
                width: '100%', 
                opacity: '1'
              }}
            />

            <div>
              {/* Titulo Orçamento da demanda */}
              <Row style={{paddingBottom: '1%'}}>
                <Col md={12} xs={12}>
                  <h3 className={stylesCad.titleh3}>Orçamento da demanda</h3>
                </Col>
              </Row>

              {/* Linha problema identificado e possivel solução */}
              <Row>
                {/* Problema identificado */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId='ProblemaIdentificadoInput'
                    label='Problema identificado'
                  >
                    <Form.Control
                      as='textarea'
                      style={{height: "100px", resize: "none"}}
                      {...register ("problema_identificado", {
                        required: "O problema identificado é obrigatório."
                      })}
                    />
                  </FloatingLabel>
                  {errors.problema_identificado && (
                    <span className='error'>
                      {errors.problema_identificado.message}
                    </span>
                  )}
                </Col>
                
                {/* Possivel solução */}
                <Col md={6} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId='PossivelSolucaoInput'
                    label='Possível solução'
                  >
                    <Form.Control
                      as='textarea'
                      style={{height: "100px", resize: "none"}}
                      {...register ("solucao", {
                        required: "A solução é obrigatória."
                      })}
                    />
                  </FloatingLabel>
                  {errors.solucao && (
                    <span className='error'>
                      {errors.solucao.message}
                    </span>
                  )}
                </Col>
              </Row>
              
              {/* Linha peça a ser trocada, valor da mão de obra e observações */}
              <Row>
                {/* Peça a ser trocada */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="PecaTrocadaInput"
                    label="Peça a ser trocada"
                  >
                    <Form.Control
                      type='text'
                      placeholder=''
                      {...register("pecaTrocada", {
                        required: "A peça a ser trocada é obrigatória."
                      })}
                    />
                    {errors.pecaTrocada && (
                      <span className='error'>
                        {errors.pecaTrocada.message}
                      </span>
                    )}
                  </FloatingLabel>
                </Col>
                
                {/* Valor da mão de obra */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="ValorObraInput"
                    label="Valor da mão de obra"
                  >
                    <Form.Control
                      type='text'
                      placeholder=''
                      {...register("valorObra", {
                        required: "O valor da mão de obra é obrigatório."
                      })}
                    />
                    {errors.valorObra && (
                      <span className='error'>
                        {errors.valorObra.message}
                      </span>
                    )}
                  </FloatingLabel>
                </Col>
                
                {/* Observações */}
                <Col md={4} xs={12} className={stylesCad.campo}>
                  <FloatingLabel
                    controlId="observacoesOrcamentoInput"
                    label="Observações"
                  >
                    <Form.Control
                      type='text'
                      placeholder=''
                      {...register("observacoes")}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </div>

            <div>
              {/* Botão para prosseguir*/}
              <Row>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Button
                    as='input'
                    value='Avançar'
                    type='submit'
                    className={stylesCad.botaoSubmit}
                  />
                </Col>
              </Row>
            </div>
          </Container>
        </Form>
      </div>
    </div>
  )
}

export default OrcamentoForm