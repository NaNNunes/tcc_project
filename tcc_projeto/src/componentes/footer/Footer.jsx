import Image from "react-bootstrap/Image";
import { FaInstagram, FaFacebook, FaArrowUp } from "react-icons/fa";
import styles from "./footer.module.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Função que observa o scroll
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Ativa o listener quando o componente monta
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Faz scroll suave para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.footer}>
      <Container style={{ maxWidth: "90%", padding: "0" }}>
        <Row className={styles.linhaFooter}>
          {/* Logo do ConnectFix com as redes sociais. */}
          <Col className={styles.coluna}>
            <Image
              className={styles.logo}
              src="/logos/connectfix_icon.svg"
              alt="Logo ConnectFix"
            ></Image>

            <span className={styles.sigaRedes}>Siga nossas redes:</span>

            <Container className={styles.iconContainer}>
              <a href="https://www.instagram.com">
                <FaInstagram className={styles.iconSocial} />
              </a>
              <a href="https://www.facebook.com">
                <FaFacebook className={styles.iconSocial} />
              </a>
            </Container>
          </Col>

          {/* Navegação no footer. */}
          <Col
            className={styles.coluna}
            style={{ display: "flex", flexDirection: "column" }}
            lg={4}
            md={12}
            sm={12}
            xs={12}
          >
            <h4 className={styles.tituloFooter}>Funcionalidades</h4>
            <a className={styles.linkFooter} href="/home">
              Início
            </a>
            <a className={styles.linkFooter} href="/sobre">
              Quem somos
            </a>
            <a className={styles.linkFooter} href="/demandas">
              Demandas
            </a>
          </Col>

          {/* Fale Conosco. */}
          <Col className={styles.coluna} lg={4} md={12} sm={12} xs={12}>
            <h4 className={styles.tituloFooter}>Fale Conosco</h4>
            <p className={styles.paragrafoFooter}>
              <strong>Telefone:</strong> 4002-8922
            </p>
            <p className={styles.paragrafoFooter}>
              <strong>Whatsapp:</strong> 4002-8922
            </p>
          </Col>
        </Row>
        <hr className=" text-white border-2 w-100" />
        <div
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
          }}
        >
          <p style={{ marginTop: "1rem" }}>
            © 2025 ConnectFix. Todos os direitos reservados.
          </p>

          {isVisible && (
            <button onClick={scrollToTop} className={styles.btnTopo}>
              <FaArrowUp />
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
