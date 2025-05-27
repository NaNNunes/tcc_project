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

    // Aqui vai ficar o context para pegar o usuario.
    const perfilUsuario = "solicitante"

    // Content para navegação de cada perfil. Obs: sem o botão para visualizar perfil.
    const ContentNavSolicitante = (
        <>
            <div className={styles.divNavdropdown}>
                <NavDropdown 
                    id="dropdown-demandas-solicitante"
                    show={openDropdown === "demandas-solicitante"}
                    // Verifca se o NavDropdown está ativo ou não.
                    onToggle={(isOpen) => setOpenDropdown(isOpen ? 'demandas-solicitante' : null)} 
                    className={`${openDropdown === 'demandas-solicitante' ? styles.dropDownActive : ''}`} 
                    title={
                        <span className={styles.dropDownTitle}>
                            {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                            Demandas {openDropdown === 'demandas-solicitante' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </span>
                    }
                >
                    <NavDropdown.Item 
                        as={Link} 
                        to='/criar-Demanda' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/Icon_pedido.svg' />Cadastro pedido
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        as={Link}
                        to='#'
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/Icon_consultar.svg'/>Consultar pedidos
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </>
        
    )

    const ContentNavADM = (
        <>
            <div className={styles.divNavdropdown}>
                <NavDropdown 
                    id="dropdown-demandas-adm"
                    show={openDropdown === "demandas-adm"}
                    // Verifca se o NavDropdown está ativo ou não.
                    onToggle={(isOpen) => setOpenDropdown(isOpen ? 'demandas-adm' : null)} 
                    className={`${openDropdown === 'demandas-adm' ? styles.dropDownActive : ''}`} 
                    title={
                        <span className={styles.dropDownTitle}>
                            {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                            Demandas {openDropdown === 'demandas-adm' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </span>
                    }
                >
                    <NavDropdown.Item 
                        as={Link} 
                        to='#' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/zoom_in.svg' />Procurar demandas
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        as={Link}
                        to='#'
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/pending_actions.svg'/>Demandas abertas
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        as={Link}
                        to='#'
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/history.svg'/>Histórico de demandas
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
                    
            <div className={styles.divNavdropdown}>
                <NavDropdown 
                    id="dropdown-operador"
                    show={openDropdown === "operador"}
                    // Verifca se o NavDropdown está ativo ou não.
                    onToggle={(isOpen) => setOpenDropdown(isOpen ? 'operador' : null)} 
                    className={`${openDropdown === 'operador' ? styles.dropDownActive : ''}`} 
                    title={
                        <span className={styles.dropDownTitle}>
                            {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                            Operador {openDropdown === 'operador' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </span>
                    }
                >
                    <NavDropdown.Item 
                        as={Link} 
                        to='#' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/person_add_alt.svg' />Adicionar operador
                    </NavDropdown.Item>

                    <NavDropdown.Item
                        as={Link}
                        to='#'
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/person_search.svg'/>Consultar operadores
                    </NavDropdown.Item>
                </NavDropdown>
            </div>

            <div className={styles.divNavdropdown}>
                <NavDropdown 
                    id="dropdown-assistencia"
                    show={openDropdown === "assistencia"}
                    // Verifca se o NavDropdown está ativo ou não.
                    onToggle={(isOpen) => setOpenDropdown(isOpen ? 'assistencia' : null)} 
                    className={`${openDropdown === 'assistencia' ? styles.dropDownActive : ''}`} 
                    title={
                        <span className={styles.dropDownTitle}>
                            {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                            Minha assistência {openDropdown === 'assistencia' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </span>
                    }
                >
                    <NavDropdown.Item 
                        as={Link} 
                        to='#' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/add_location_alt.svg' />Cadastrar local
                    </NavDropdown.Item>

                    <NavDropdown.Item 
                        as={Link}
                        to='#'
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/location_on.svg'/>Consultar locais
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </>
    )

    const ContentNavDeslogado = (
        <>
            <div>
                vou fazer chegando no senai, estou atrasado por causa do menu. Muito obrigado a todos os participantes.
            </div>
        </>
    )

    // Faz associação de perfil com o conteúdo do menu.
    const menus = {
        solicitante: ContentNavSolicitante,
        adm: ContentNavADM
    };

    // Menu de acordo com o perfil de usuário.
    const mainNav = menus[perfilUsuario] ?? ContentNavDeslogado;

    const perfilNavSolicitante = (
        <div className={styles.navdropdownPerfil}>
            <NavDropdown
                align='end'
                title={
                    <Image 
                        src='/icons/person.svg'
                        width={30}
                        height={30}
                        alt='Perfil'
                    />
                }
                id='dropdown-perfil'
            >
                <NavDropdown.Item
                    as={Link}
                    to='#'
                >   
                    Meu perfil
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    )

  return (
    <div>
        <Navbar className={styles.navbar} expand='lg'>
            <Container fluid className={styles.containerNavegacao}>
                <Navbar.Brand href='/home' className={styles.navbarBrand}>
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
                    {/* Nav com os dropdowns para navegação. */}
                    <Nav>
                        {mainNav}
                    </Nav>

                    {/* Nav com o dropdown para navegação no perfil. */}
                    <Nav className="ms-auto">
                        {perfilNavSolicitante}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default MenuNavegacao