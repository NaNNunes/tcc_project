import {Form, FloatingLabel, Row, Col} from 'react-bootstrap';

const Encerrar = () => {
  return (
    <>
        <Form className='border rounded-3 shadow'>
            <Row>
                <h3>Encerrar conta</h3>
            </Row>
            <Row className='m-1'>
                <p className='text-sm-left'>
                    Encerrar sua conta, incluindo todas as informações pessoais.
                    O encerramento permanente da sua conta ocorrerá imediatamente
                    depois da confirmação.
                </p>
            </Row>
        </Form>
    </>
  )
}

export default Encerrar