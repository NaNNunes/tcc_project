import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Login = () => {
  return (
    <>
      <Row className="justify-content-center">
        <Col xs={6}>
          <Form className='mt-5 rounded-3 bg-primary shadow'>
            <img src="#" alt="" className="m-5"/>
            <Form.Floating className="mb-3 mx-5">
              <Form.Control
                id="floatingInputCustom"
                type="email"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInputCustom">Email address</label>
            </Form.Floating>
            <Form.Floating className="mb-3 mx-5">
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
            <div className="d-grid gap-2">
              <Button
                as='input' value="Login" type='button' size='lg'
                className='mb-3 mx-5 border-light border-5 rounded-4 fw-bold fs-4'
              />
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login