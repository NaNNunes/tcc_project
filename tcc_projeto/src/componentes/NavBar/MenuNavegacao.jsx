// Importação do react-bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button"

// Importação dos estilos CSS.
import styles from "./MenuNavegacao.module.css"

// Importação do useState para verificar se o dropdown está aberto.
import { useState, useContext } from 'react';

// Importação de contexto
import { AuthContext } from '../../context/userContext';

// Importação do Link para fazer conexões entre telas.
import { Link } from 'react-router-dom';

// Importação de icons
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";   
import { IoMenu } from "react-icons/io5";

const MenuNavegacao = () => {
    const {logout} = useContext(AuthContext);

    const [openDropdown, setOpenDropdown] = useState(null); // useState para verificar se o dropdown esta aberto ou não.

    // AQUI VAI FICAR O CONTEXT PARA DEFINIR O USUÁRIO.
    const perfilUsuario = localStorage.getItem("userType");

    // Content para navegação de cada perfil. Obs: sem o botão para visualizar perfil.
    const contentNavSolicitante = (
        <>
            <div className={styles.divNavdropdown}>
                {/* NavDropdown de "Demandas" */}
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
                    {/* Items que estarão dentro do navdropdown */}
                    {/* Cadastro pedido */}
                    <NavDropdown.Item 
                        as={Link} 
                        to='/criar-Demanda' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/Icon_pedido.svg' />Cadastro pedido
                    </NavDropdown.Item>
                    
                    {/* Consultar pedidos */}
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

    const contentNavADM = (
        <>
            <div className={styles.divNavdropdown}>
                {/* NavDropdown de "Demandas" */}
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
                    {/* Items que estarão dentro do navdropdown */}
                    {/* Procurar demandas */}
                    <NavDropdown.Item 
                        as={Link} 
                        to='#' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/zoom_in.svg' />Procurar demandas
                    </NavDropdown.Item>
                    
                    {/* Demandas abertas */}
                    <NavDropdown.Item 
                        as={Link}
                        to='#'
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/pending_actions.svg'/>Demandas abertas
                    </NavDropdown.Item>

                    {/* Histórico de demandas */}
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
                {/* NavDropdown de "Operador" */}
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
                    {/* Adicionar operador */}
                    <NavDropdown.Item 
                        as={Link} 
                        to='#' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/person_add_alt.svg' />Adicionar operador
                    </NavDropdown.Item>

                    {/* Consultar operadores */}
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
                {/* NavDropdown de "Minha assistência" */}
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
                    {/* Cadastrar local */}
                    <NavDropdown.Item 
                        as={Link} 
                        to='#' 
                        className={styles.dropdownItem}
                    >
                        <Image className={styles.icone} src='/icons/add_location_alt.svg' />Cadastrar local
                    </NavDropdown.Item>

                    {/* Consultar locais */}
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

    const contentNavDeslogado = (
        <>
            <div>
                vou fazer chegando no senai, estou atrasado por causa do menu. Muito obrigado a todos os participantes.
            </div>
        </>
    )

    // Faz associação do perfil do usuário com o conteúdo do menu.
    const menus = {
        solicitante: contentNavSolicitante,
        adm: contentNavADM
    };

    // Menu de acordo com o perfil de usuário. Se tiver deslogado mostra o nav para usuários deslogados.
    const mainNav = menus[perfilUsuario] ?? contentNavDeslogado;

    // Perfis para solicitante, adm e usuário deslogado.
    const perfilNavSolicitante = (
        <>
            <div className={styles.navdropdownPerfil}>
                {/* NavDropdown com as informações de perfil. */}
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
                    id='dropdown-perfil-solicitante'
                >
                    {/* envia user para a tela de gestao da conta/perfil */}
                    <NavDropdown.Item
                        as={Link}
                        to='/conta'
                    >   
                        Meu perfil
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </>
    )

    const perfilNavAdm = (
        <>
            <div className={styles.navdropdownPerfil}>
                {/* NavDropdown com as informações de perfil. */}
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
                    id='dropdown-perfil-adm'
                >
                    <NavDropdown.Item
                        as={Link}
                        to='/conta'
                    >   
                        Meu perfil
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </>
    )

    const perfilNavDeslogado = (
        <>
            <div>
                ta deslogado padrinho
            </div>
        </>
    )

    // Faz associação do perfil do usuário com o conteúdo que haverá no perfil.
    const perfis = {
        solicitante: perfilNavSolicitante,
        adm: perfilNavAdm
    }

    // Perfil de acordo com o perfil do usuário. Se tiver deslogado mostra o botão para entrar.
    const mainPerfil = perfis[perfilUsuario] ?? perfilNavDeslogado;

  return (
    <div>
        <Navbar className={styles.navbar} expand='lg'>
            <Container fluid className={styles.containerNavegacao}>
                {/* Logo ConnectFix. */}
                <Navbar.Brand href='/home' className={styles.navbarBrand}>
                    <img className={styles.imgConnect} src="/logos/connectfix_logo.svg" alt='Logo ConnectFix'></img>
                </Navbar.Brand>

                {/* Menu hamburguer. */}
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
                        {mainPerfil}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default MenuNavegacao