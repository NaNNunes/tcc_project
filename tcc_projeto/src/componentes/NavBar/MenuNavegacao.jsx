import React, { useEffect } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button"
import styles from "./MenuNavegacao.module.css"
import { useState } from 'react';

// Importação de icons
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";   
import { IoMenu } from "react-icons/io5";

const MenuNavegacao = () => {
    const [open, setOpen] = useState(false); // useState para se o dropdown esta aberto ou não.

  return (
    <div>
        {/* data-bs-theme='dark' */}
        <Navbar className={styles.navbar} expand='lg'>
            <Container fluid className={styles.containerNavegacao}>
                <Navbar.Brand href='/login' className={styles.navbarBrand}>
                    <Image className={styles.imgConnect} src="/logos/connectfix_logo.svg"></Image>
                </Navbar.Brand>

                <Navbar.Toggle 
                    aria-controls='minha-nav'  
                    className={styles.botaoToggle}
                >
                    <IoMenu size={'40px'} color='white'/>
                </Navbar.Toggle>
                
                <Navbar.Collapse>
                    <Nav>
                        <NavDropdown 
                            title={
                                <span className={styles.dropDownTitle}>
                                    {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                                    Demandas {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                                </span>
                            }
                            // Verifca se o NavDropdown está ativo ou não.
                            className={`${open ? styles.dropDownActive : ''}`} 
                            id="collasible-nav-dropdown"
                            onToggle={(isOpen) => setOpen(isOpen)} 
                        >
                            <NavDropdown.Item href='/criar-Demanda' className={styles.dropdownItem}><Image className={styles.icone} src='/icons/Icon_pedido.svg' />Cadastro pedido</NavDropdown.Item>
                            <NavDropdown.Item className={styles.dropdownItem}><Image className={styles.icone} src='/icons/Icon_consultar.svg'/>Consultar pedidos</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown 
                            title={
                                <span className={styles.dropDownTitle}>
                                    {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                                    TESTE {open ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                                </span>
                            }
                        >
                            <NavDropdown.Item>opa</NavDropdown.Item>
                        </NavDropdown>

                        <Button>opa</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default MenuNavegacao