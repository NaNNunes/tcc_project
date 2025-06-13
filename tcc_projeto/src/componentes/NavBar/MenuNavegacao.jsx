// Importação do react-bootstrap
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

// Importação dos estilos CSS.
import styles from "./MenuNavegacao.module.css";

// Importação do useState para verificar se o dropdown está aberto.
import { useState, useContext } from "react";

// Importação de contexto
import { AuthContext } from "../../context/userContext";

// Importação do Link para fazer conexões entre telas.
import { Link, useNavigate } from "react-router-dom";

// Importação de icons
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoMenu } from "react-icons/io5";

const MenuNavegacao = () => {
  const navigate = useNavigate();

  const { logout, usuarioNome } = useContext(AuthContext);

  const [openDropdown, setOpenDropdown] = useState(null); // useState para verificar se o dropdown esta aberto ou não.

  // AQUI VAI FICAR O CONTEXT PARA DEFINIR O USUÁRIO.
  // pega info do context por sincronia evitando que ao recarregar page o user seja deslogado
  const tipoUser = localStorage.getItem("userType");
  const perfilUsuario =
  tipoUser !== "Visitante" && localStorage.getItem("userType");

  // Content para navegação de cada perfil. Obs: sem o botão para visualizar perfil.
  const contentNavSolicitante = (
      <>
          {/* demandas */}
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
                      to='/criar-pedido' 
                      className={styles.dropdownItem}
                  >
                      <Image className={styles.icone} src='/icons/Icon_pedido.svg' />Cadastro pedido
                  </NavDropdown.Item>
                  
                  {/* Consultar pedidos */}
                  <NavDropdown.Item 
                      as={Link}
                      to={`/procurar-demandas/minhas-demandas`}
                      className={styles.dropdownItem}
                  >
                      <Image className={styles.icone} src='/icons/Icon_consultar.svg'/>Consultar pedidos
                  </NavDropdown.Item>
              </NavDropdown>
          </div>
          {/* assistencias */}
          <div className={styles.divNavdropdown}>
              {/* NavDropdown de "assistencias" */}
              <NavDropdown 
                  id="dropdown-assistencias-solicitante"
                  show={openDropdown === "assistencias-solicitante"}
                  // Verifca se o NavDropdown está ativo ou não.
                  onToggle={(isOpen) => setOpenDropdown(isOpen ? 'assistencias-solicitante' : null)} 
                  className={`${openDropdown === 'assistencias-solicitante' ? styles.dropDownActive : ''}`} 
                  title={
                      <span className={styles.dropDownTitle}>
                          {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
                          Assistências{openDropdown === 'assistencias-solicitante' ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                      </span>
                  }
              >
                  {/* Items que estarão dentro do navdropdown */}
                  {/* Encontrar Assistências */}
                  <NavDropdown.Item 
                      as={Link} 
                      to={`/buscar-assistencias/todas`} 
                      className={styles.dropdownItem}
                      onClick={()=>{
                        setTimeout(() => {
                          location.reload();
                        }, 1);
                      }}
                  >
                      <Image className={styles.icone} src='#' />Encontrar Assistências
                  </NavDropdown.Item>
                  
                  {
                      /* 
                          ACREDITO QUE NÃO HÁ NECESSIDADE DE TER ESSE LINK 
                          POIS PARA VER ASSITENCIAS FAVS BASTA UM FILTRO, bem simples, 
                          NA PAGINAS DE ENCONTRAR ASSISTENCIAS
                      */
                  }
                  {/* Consultar assistencias favoritas */}
                  <NavDropdown.Item 
                      as={Link}
                      to={`/buscar-assistencias/favoritas`} 
                      className={styles.dropdownItem}

                      onClick={()=>{
                        setTimeout(() => {
                          location.reload();
                        }, 1);
                      }}
                  >
                      <Image className={styles.icone} src='#'/>Assistências Favoritas
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
          onToggle={(isOpen) => setOpenDropdown(isOpen ? "demandas-adm" : null)}
          className={`${
            openDropdown === "demandas-adm" ? styles.dropDownActive : ""
          }`}
          title={
            <span className={styles.dropDownTitle}>
              {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
              Demandas{" "}
              {openDropdown === "demandas-adm" ? (
                <TiArrowSortedUp />
              ) : (
                <TiArrowSortedDown />
              )}
            </span>
          }
        >
          {/* Items que estarão dentro do navdropdown */}
          {/* Procurar demandas */}
          <NavDropdown.Item
            as={Link}
            to={`/procurar-demandas/abertas`}
            className={styles.dropdownItem}
            // espera a tela carregar para atualizar a tela e ocorrer a renderização das demandas
            onClick={()=>{
              setTimeout(() => {
                location.reload()
              }, 1);
            }}
          >
            <Image className={styles.icone} src="/icons/zoom_in.svg" />
            Procurar demandas
          </NavDropdown.Item>

          {/* Cadastro pedido */}
          <NavDropdown.Item 
              as={Link} 
              to='/criar-pedido' 
              className={styles.dropdownItem}
          >
              <Image className={styles.icone} src='/icons/Icon_pedido.svg' />Cadastro pedido
          </NavDropdown.Item>

          {/* Demandas abertas */}
          <NavDropdown.Item 
            as={Link} 
            to={`/procurar-demandas/aceitas`} 
            className={styles.dropdownItem}
            // espera a tela carregar para atualizar a tela e ocorrer a renderização das demandas
            onClick={()=>{
              setTimeout(() => {
                location.reload()
              }, 1);
            }}
          >
            <Image className={styles.icone} src="/icons/pending_actions.svg" />
            Demandas abertas
          </NavDropdown.Item>

          {/* Histórico de demandas */}
          <NavDropdown.Item 
            as={Link} 
            to="/procurar-demandas/historico" 
            className={styles.dropdownItem}
          >
            <Image className={styles.icone} src="/icons/history.svg" />
              Histórico de demandas
            </NavDropdown.Item>
        </NavDropdown>
      </div>

      <div className={styles.divNavdropdown}>
        {/* NavDropdown de "Operador" */}
        <NavDropdown
          id="dropdown-operador"
          show={openDropdown === "operador"}
          // Verifca se o NavDropdown está ativo ou não.
          onToggle={(isOpen) => setOpenDropdown(isOpen ? "operador" : null)}
          className={`${
            openDropdown === "operador" ? styles.dropDownActive : ""
          }`}
          title={
            <span className={styles.dropDownTitle}>
              {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
              Operador{" "}
              {openDropdown === "operador" ? (
                <TiArrowSortedUp />
              ) : (
                <TiArrowSortedDown />
              )}
            </span>
          }
        >
          {/* Adicionar operador */}
          <NavDropdown.Item as={Link} to="#" className={styles.dropdownItem}>
            <Image className={styles.icone} src="/icons/person_add_alt.svg" />
            Adicionar operador
          </NavDropdown.Item>

          {/* Consultar operadores */}
          <NavDropdown.Item as={Link} to="#" className={styles.dropdownItem}>
            <Image className={styles.icone} src="/icons/person_search.svg" />
            Consultar operadores
          </NavDropdown.Item>
        </NavDropdown>
      </div>

      <div className={styles.divNavdropdown}>
        {/* NavDropdown de "Minha assistência" */}
        <NavDropdown
          id="dropdown-assistencia"
          show={openDropdown === "assistencia"}
          // Verifca se o NavDropdown está ativo ou não.
          onToggle={(isOpen) => setOpenDropdown(isOpen ? "assistencia" : null)}
          className={`${
            openDropdown === "assistencia" ? styles.dropDownActive : ""
          }`}
          title={
            <span className={styles.dropDownTitle}>
              {/* Verifica se o NavDropdown está ativo ou não, trocando o icone. */}
              Minha assistência{" "}
              {openDropdown === "assistencia" ? (
                <TiArrowSortedUp />
              ) : (
                <TiArrowSortedDown />
              )}
            </span>
          }
        >
          {/* Cadastrar local */}
          <NavDropdown.Item as={Link} to="#" className={styles.dropdownItem}>
            <Image className={styles.icone} src="/icons/add_location_alt.svg" />
            Cadastrar local
          </NavDropdown.Item>

          {/* Consultar locais */}
          <NavDropdown.Item 
            as={Link} 
            to={`/buscar-assistencias/administrador`}  
            className={styles.dropdownItem}
            // espera a tela carregar para atualizar a tela e ocorrer a renderização e assistencias
            onClick={()=>{
              setTimeout(() => {
                location.reload()
              }, 1);
            }}
          >
            <Image className={styles.icone} src="/icons/location_on.svg" />
            Consultar locais
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </>
  );

  const contentNavDeslogado = (
    <>
      <div className={styles.divNavdropdown}>
        <Nav.Link className={styles.navText} href="/home">
          Início
        </Nav.Link>
      </div>

      <div className={styles.divNavdropdown}>
        <Nav.Link className={styles.navText} href="/sobre">
          Quem somos
        </Nav.Link>
      </div>
    </>
  );

  // Faz associação do perfil do usuário com o conteúdo do menu.
  const menus = {
    solicitante: contentNavSolicitante,
    administrador: contentNavADM,
  };

  // Menu de acordo com o perfil de usuário. Se tiver deslogado mostra o nav para usuários deslogados.
  const mainNav = menus[perfilUsuario] ?? contentNavDeslogado;

  // Perfis para solicitante, adm e usuário deslogado.
  const perfilNavSolicitante = (
    <>
      <div className={styles.navdropdownPerfil}>
        {/* NavDropdown com as informações de perfil. */}
        {/* MUDAR O CSS PORQUE ESTÁ FICANDO MUITO COLADO NO MENU. */}
        <NavDropdown
          align="end"
          id="dropdown-perfil-solicitante"
          title={
            <Image
              src="/icons/person.svg"
              width={29}
              height={29}
              alt="Perfil"
            />
          }
          className={styles.dropDownActive}
        >
          <NavDropdown.Header className={styles.navHeaderText}>
            {/* SÓ BOTAR O NOME DO CABA AQUI */}
            {usuarioNome}
          </NavDropdown.Header>

          <NavDropdown.Divider
            style={{
              borderTop: "2px solid rgb(255, 255, 255)",
              margin: "4px 0",
            }}
          />

          <NavDropdown.Item
            as={Link}
            to="/conta"
            className={styles.dropdownItem}
          >
            <Image
              className={styles.icone}
              width={34}
              height={24}
              src="/icons/person.svg"
            />
            Meu perfil
          </NavDropdown.Item>

          <NavDropdown.Item
            // AQUI ENTRA O CÓDIGO PARA DESLOGAR
            as={Button}
            href="/login"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className={styles.dropdownItem}
          >
            <Image className={styles.icone} src="/icons/sair.svg" />
            Sair
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </>
  );

  const perfilNavAdm = (
    <>
      <div className={styles.navdropdownPerfil}>
        {/* NavDropdown com as informações de perfil. */}
        {/* MUDAR O CSS PORQUE ESTÁ FICANDO MUITO COLADO NO MENU. */}
        <NavDropdown
          align="end"
          id="dropdown-perfil-adm"
          title={
            <Image
              src="/icons/person.svg"
              width={29}
              height={29}
              alt="Perfil"
            />
          }
          className={styles.dropDownActive}
        >
          <NavDropdown.Header className={styles.navHeaderText}>
            {usuarioNome}
          </NavDropdown.Header>

          <NavDropdown.Divider
            style={{
              borderTop: "2px solid rgb(255, 255, 255)",
              margin: "4px 0",
            }}
          />

          <NavDropdown.Item
            as={Button}
            href="/conta"
            className={styles.dropdownItem}
          >
            <Image
              className={styles.icone}
              width={34}
              height={24}
              src="/icons/person.svg"
            />
            Meu perfil
          </NavDropdown.Item>

          <NavDropdown.Item
            as={Button}
            // AQUI ENTRA O CÓDIGO PARA DESLOGAR
            href="/login"
            onClick={() => {
              logout();
            }}
            className={styles.dropdownItem}
          >
            <Image className={styles.icone} src="/icons/sair.svg" />
            Sair
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </>
  );

  const perfilNavDeslogado = (
    <>
      <div>
        <a href="/login" className={styles.navEntrar}>
          <img
            src="/icons/person.svg"
            style={{ height: "45px" }}
            alt="Icon de perfil"
          />
          <p className={styles.navEntrarText}>Entrar</p>
        </a>
      </div>
    </>
  );

  // Faz associação do perfil do usuário com o conteúdo que haverá no perfil.
  const perfis = {
    solicitante: perfilNavSolicitante,
    administrador: perfilNavAdm,
  };

  // Perfil de acordo com o perfil do usuário. Se tiver deslogado mostra o botão para entrar.
  const mainPerfil = perfis[perfilUsuario] ?? perfilNavDeslogado;

  const handleLogoClick = () => {
    if (usuarioNome != "Visitante") {
      navigate("/inicio");
    } else {
      navigate("/home");
    }
  };

  return (
    <div>
      <Navbar className={styles.navbar} expand="lg">
        <Container fluid className={styles.containerNavegacao}>
          {/* Logo ConnectFix. */}
          <Navbar.Brand
            onClick={handleLogoClick}
            className={styles.navbarBrand}
            style={{ cursor: "pointer" }}
          >
            <img
              className={styles.imgConnect}
              src="/logos/connectfix_logo.svg"
              alt="Logo ConnectFix"
            ></img>
          </Navbar.Brand>

          {/* Menu hamburguer. */}
          <Navbar.Toggle
            aria-controls="minha-nav"
            aria-label="Abrir menu"
            className={styles.botaoToggle}
          >
            <IoMenu size={"37px"} color="white" />
          </Navbar.Toggle>

          <Navbar.Collapse>
            {/* Nav com os dropdowns para navegação. */}
            <Nav className={styles.navbarE}>{mainNav}</Nav>

            {/* Nav com o dropdown para navegação no perfil. */}
            <Nav className="ms-auto">{mainPerfil}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MenuNavegacao;
