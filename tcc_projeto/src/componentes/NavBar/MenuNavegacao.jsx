import React, { useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button"
import {Container, Nav, Navbar, Image} from "react-bootstrap";
import styles from "./MenuNavegacao.module.css"
import { useState } from 'react';

const MenuNavegacao = () => {
    const [hovered, setHovered] = useState(false); // useState do hover para Navbar.

  return (
    <>
        <Navbar className={styles.navbar} collapseOnSelect expand="lg" 
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} // Função para quando o mouse entrar no Navbar mudar para true e quando sair mudar para false.
        >
            {/* Container com o icone ou logo da marca baseado no hover no Navbar. Também volta para a Home.*/}
            <Container className={styles.containerMarca}>
                <Navbar.Brand href="/Login" style={{width: "100%"}}>
                    {hovered 
                        ? <Image style={{minWidth: "236px"}} src="/logos/connectfix_logo.svg" fluid />
                        : <Image style={{width: "66px", position: "relative", top: "-8px", left: "0px"}} src="/logos/connectfix_icon.svg" fluid />
                    }
                </Navbar.Brand>
            </Container>

            <Container className={styles.containerNav}>
                <Navbar.Collapse className={styles.navegacao} id="responsive-navbar-nav">
                    <Nav className={styles.navegacao}>
                        <Nav.Link className={styles.meuLink} href='/criar-Demanda'>Cadastro pedido</Nav.Link>
                        <Nav.Link className={styles.meuLink} href='/criar-Demanda'>Consultar pedidos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default MenuNavegacao