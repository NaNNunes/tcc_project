import React, { useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button"
import {Container, Nav, Navbar, Image} from "react-bootstrap";
import styles from "./MenuNavegacao.module.css"
import { useState } from 'react';

// Importação de icons
import { TiArrowSortedDown } from "react-icons/ti";

const MenuNavegacao = () => {
    const [hovered, setHovered] = useState(false); // useState do hover para Navbar.

  return (
    <div>
        {/* <Navbar className={styles.navbar} collapseOnSelect expand="lg" 
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        >
            <Container className={styles.container}>
                <Navbar.Brand href="/login" className={styles.brand}>
                    {hovered 
                        ? <Image style={{minWidth: "276px", paddingRight: "15px", paddingLeft: "15px"}} src="/logos/connectfix_logo.svg" fluid />
                        : <Image style={{width: "75px", position: "relative", top: "-1px", left: "0px"}} src="/logos/connectfix_icon.svg" fluid />
                    }
                </Navbar.Brand>
            
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={styles.navegacao}>
                        <Nav.Link className={styles.meuLink} href='/criar-Demanda'>
                            <Image className={styles.icone} src='../../../public/icons/Icon_pedido.svg' />
                            {hovered && <span className={styles.texto}>Cadastro pedido</span>}
                        </Nav.Link>

                        <NavDropdown title="Demandas" className={styles.dropdown} style={{color: '#ffffff'}}>
                            <NavDropdown.Item menuVariant="danger" href='/criar-Demanda'>Cadastro pedido</NavDropdown.Item>
                            <NavDropdown.Item>Consultar pedidos</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> */}

        <Navbar className={styles.navbar}>
            <Container>
                <Navbar.Brand href='/login'>
                    <Image src="/logos/connectfix_logo.svg"></Image>
                </Navbar.Brand>

                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown title={<span className={styles.dropdown}>Demandas <TiArrowSortedDown color='white'/></span> } id="dropdown">
                            <NavDropdown.Item href='/criar-Demanda'>Cadastro pedido</NavDropdown.Item>
                            <NavDropdown.Item>Consultar pedidos</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default MenuNavegacao