import {Form, Row, Col, Button} from 'react-bootstrap';
import styles from "./categoriaDispositivo.module.css"
import { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const categoriaDispositivo = () => {
    const [value, setValue] = useState(["Celular", "Periferico"]);
    const handleChange = (val) => setValue(val);

  return (
    <div>
        <Form>
            <Row>
                {/* Titulo */}
                <Col>
                    <h3>Categoria do dispositivo</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                </Col>
            </Row>
        </Form>
    </div>
  )
}

export default categoriaDispositivo