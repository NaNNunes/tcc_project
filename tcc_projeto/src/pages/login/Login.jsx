import {Row, Col, Button, Form, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import styles from "./login.module.css"
const Login = () => {
  return (
    <Container className="justify-content-center">
      
      <Col>
        <Form className='mt-5 rounded-3 bg-primary shadow'>
        <Image className={styles.Image} src="../../public/connectfix_logo.svg" fluid/>
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
    </Container>
  )
}

export default Login