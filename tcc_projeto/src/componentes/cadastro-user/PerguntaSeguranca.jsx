import {Form, FloatingLabel, Button, Row, Col, Container, Image} from "react-bootstrap";
import { useForm } from "react-hook-form";

const PerguntaSeguranca = (props) => {

    const {register, handleSubmit, formState:{errors}} = useForm();
    console.log("--------------------------------------")
    console.log(props);
    return (
        <Container>
            {/* <Form onSubmit={handleSubmit(onSubmit, onError)}>
                
            </Form> */}
            
        </Container>
    )
}

export default PerguntaSeguranca