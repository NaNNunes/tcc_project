import {Form, FloatingLabel, Button, Row, Col, Container, Image} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const PerguntaSeguranca = () => {
    const location = useLocation();
    const dadosUser = location.state;

    const {register, handleSubmit, formState:{errors}} = useForm();
    
    return (
        <Container>

        </Container>
    )
}

export default PerguntaSeguranca