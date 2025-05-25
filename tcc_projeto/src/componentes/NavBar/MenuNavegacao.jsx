// Importação do react-bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button"

// Importação dos estilos CSS
import styles from "./MenuNavegacao.module.css"

import { useState } from 'react';

import { Link } from 'react-router-dom';

// Importação de icons
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";   
import { IoMenu } from "react-icons/io5";

const MenuNavegacao = () => {
    const [openDropdown, setOpenDropdown] = useState(null); // useState para se o dropdown esta aberto ou não.

  return (
    <div>
        <Navbar className={styles.navbar} expand='lg'>
            <Container fluid className={styles.containerNavegacao}>
                <Navbar.Brand href='/login' className={styles.navbarBrand}>
                    <img className={styles.imgConnect} src="/logos/connectfix_logo.svg" alt='Logo ConnectFix'></img>
                </Navbar.Brand>

                <Navbar.Toggle 
                    aria-controls='minha-nav'
                    aria-label="Abrir menu"
                    className={styles.botaoToggle}
                >
                    <IoMenu size={'40px'} color='white'/>
                </Navbar.Toggle>
                
                <Navbar.Collapse>
                    <Nav>
                        <div className={styles.divNavdropdown}>
                            <NavDropdown 
                                id="dropdown-demandas"
                                // Verifca se o NavDropdown está ativo ou não.
                                onToggle={(isOpen) => setOpenDropdown(isOpen ? 'demandas' : null)} 
                                className={`${openDropdown === 'demandas' ? styles.dropDownActive : ''}`} 
                                title={
                                    <span className={styles.dropDownTitle}>
                                        {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                                        Demandas {openDropdown === 'demandas' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                                    </span>
                                }
                            >
                                <NavDropdown.Item as={Link} to='/criar-Demanda' className={styles.dropdownItem}><Image className={styles.icone} src='/icons/Icon_pedido.svg' />Cadastro pedido</NavDropdown.Item>
                                <NavDropdown.Item className={styles.dropdownItem}><Image className={styles.icone} src='/icons/Icon_consultar.svg'/>Consultar pedidos</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                                
                        <div className={styles.divNavdropdown}>
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
                        </div>
                        

                        <Button>opa</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default MenuNavegacao