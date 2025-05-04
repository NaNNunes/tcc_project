import {Form, FloatingLabel, Button, Row, Col, Container, Image} from "react-bootstrap";
import { useForm } from "react-hook-form";

const PerguntaSeguranca = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>

            </Form>
        </Container>
    )
}

export default PerguntaSeguranca