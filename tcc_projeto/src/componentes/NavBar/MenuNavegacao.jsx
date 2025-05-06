import React, { useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button"
import {Container, Nav, Navbar, Image} from "react-bootstrap";
import styles from "./MenuNavegacao.module.css"
import { useState } from 'react';

const MenuNavegacao = () => {
    const [hovered, setHovered] = useState(false); // useState do hover para Navbar.

  return (
    <div>
        <Navbar className={styles.navbar} collapseOnSelect expand="lg" 
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} // Função para quando o mouse entrar no Navbar mudar para true e quando sair mudar para false.
        >
            {/* Container com o icone ou logo da marca baseado no hover no Navbar. */}
            <Container className={styles.container}>
                <Navbar.Brand href="/Login" className={styles.brand}>
                    {/* Quando tiver o hover muda de icone para logo. */}
                    {hovered 
                        ? <Image style={{minWidth: "276px", paddingRight: "15px", paddingLeft: "15px"}} src="/logos/connectfix_logo.svg" fluid />
                        : <Image style={{width: "75px", position: "relative", top: "-1px", left: "0px"}} src="/logos/connectfix_icon.svg" fluid />
                    }
                </Navbar.Brand>
            
                <Navbar.Collapse className={styles.navegacao} id="responsive-navbar-nav">
                    <Nav className={styles.navegacao}>
                        <hr className={styles.separar}/>
                        {/* Mostra somente o icone quando estiver sem hover. Quando estiver com hover mostra o icone e o texto . */}
                        <Nav.Link className={styles.meuLink} href='/criar-Demanda'>
                            <Image className={styles.icone} src='../../../public/icons/Icon_pedido.svg' />
                            {hovered && <span className={styles.texto}>Cadastro pedido</span>}
                        </Nav.Link>

                        <Nav.Link className={styles.meuLink} href='/criar-Demanda'>
                            <Image className={styles.icone} src='../../../public/icons/Icon_consultar.svg'></Image>
                            {hovered && <span className={styles.texto}>Consultar pedidos</span>}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default MenuNavegacao