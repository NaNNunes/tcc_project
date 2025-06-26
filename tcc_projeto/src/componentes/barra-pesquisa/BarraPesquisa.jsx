// Importação do react-bootstrap.
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormFloating from "react-bootstrap/FormFloating";
import FormSelect from 'react-bootstrap/FormSelect';
import Dropdown from 'react-bootstrap/Dropdown';

import { useEffect, useState } from "react";

// Importação dos estilos.
import styles from './BarraPesquisa.module.css';

const BarraPesquisa = ({props}) => {
    const [textoBusca, setTextoBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
    const [stausSelecionado, setStausSelecionado] = useState("Todos");

    console.log("Texto: ", textoBusca);
    console.log("categoria: ", categoriaSelecionada);
    console.log("status: ", stausSelecionado);

    const dropdownCategorias = (
        <>
            <Dropdown onSelect={(value) => setCategoriaSelecionada(value)}>
                <Dropdown.Toggle className={styles.botaoDropdown}>
                    {categoriaSelecionada}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.menuDropdown}>
                    <Dropdown.Item eventKey="Todas categorias">Todas categorias</Dropdown.Item>
                    <Dropdown.Item eventKey="Celular">Celular</Dropdown.Item>
                    <Dropdown.Item eventKey="Tablet">Tablet</Dropdown.Item>
                    <Dropdown.Item eventKey="Notebook">Notebook</Dropdown.Item>
                    <Dropdown.Item eventKey="Desktop">Desktop</Dropdown.Item>
                    <Dropdown.Item eventKey="Periferico">Periférico</Dropdown.Item>
                    <Dropdown.Item eventKey="Outros">Outros</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )

    const dropdownStatus = (
        <>
            <Dropdown onSelect={(value) => setStausSelecionado(value)}>
                <Dropdown.Toggle className={styles.botaoDropdown}>
                    {stausSelecionado}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.menuDropdown}>
                    <Dropdown.Item eventKey="Todos status">Todas status</Dropdown.Item>
                    <Dropdown.Item eventKey="Em atendimento">Em atendimento</Dropdown.Item>
                    <Dropdown.Item eventKey="Concluido">Concluido</Dropdown.Item>
                    <Dropdown.Item eventKey="Cancelada">Cancelada</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );

  return (
    <div>
        <Container className={styles.caixaBotaoFiltro}>
            <Row>
                <Col>
                    {dropdownCategorias}
                    {dropdownStatus}
                </Col>

                <Col>
                    <Form.Control 
                        type="text"
                        placeholder="Procurar..."
                        style={{border: '0'}}
                        value={textoBusca}
                        onChange={(e) => setTextoBusca(e.target.value)}
                    />
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default BarraPesquisa