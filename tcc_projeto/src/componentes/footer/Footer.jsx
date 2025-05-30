import Image from "react-bootstrap/Image";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Footer = () => {
  return (
    <div className={styles.footer}>
        <Container style={{maxWidth: '90%', padding: '0'}}>
          {/* MEXER NISSO AQUI PARA CENTRALIZAR TODA A LINHA NO CENTRO, ESTÁ 12px PARA A DIREITA */}
            <Row className="ms-auto">
                {/* Logo do ConnectFix com as redes sociais. */}
                <Col className={styles.coluna}>
                    <Image className={styles.logo} src="/logos/connectfix_icon.svg" alt="Logo ConnectFix"></Image>

                    <span className={styles.sigaRedes}>Siga nossas redes:</span>

                    <Container className={styles.iconContainer}>
                        <a href="https://www.instagram.com"><FaInstagram className={styles.iconSocial}/></a>
                        <a href="https://www.facebook.com"><FaFacebook className={styles.iconSocial}/></a>
                    </Container>
                </Col>
                
                {/* Navegação no footer. */}
                <Col className={styles.coluna} style={{display: 'flex', flexDirection: 'column'}} lg={4} md={12} sm={12} xs={12}>
                    <h4 className={styles.tituloFooter}>Funcionalidades</h4>
                    <a className={styles.linkFooter} href="/home">Início</a>
                    <a className={styles.linkFooter} href="/sobre">Quem somos</a>
                    <a className={styles.linkFooter} href="/demandas">Demandas</a>
                </Col>

                {/* Fale Conosco. */}
                <Col className={styles.coluna} lg={4} md={12} sm={12} xs={12}>
                    <h4 className={styles.tituloFooter}>Fale Conosco</h4>
                    <p className={styles.paragrafoFooter}><strong>Telefone:</strong> 4002-8922</p>
                    <p className={styles.paragrafoFooter}><strong>Whatsapp:</strong> 4002-8922</p>
                </Col>
            </Row>
            <hr className=" text-white border-2 w-100"/>
            <div style={{display: 'flex', alignItems: 'left', justifyContent: 'left'}}>
              <p style={{ marginTop: "1rem" }}>
                © 2025 ConnectFix. Todos os direitos reservados.
              </p>
            </div>
        </Container>
    </div>
    // <div className={styles.divtudo}>
    //   <div className={styles.footer}>
    //     <div className={styles.containerFooter}>
    //       {/* Coluna Logo e Redes */}
    //       <div className={styles.coluna}>
    //         <div className={styles.colunaLogo}>
    //           <Image
    //             className={styles.logo}
    //             src="/logos/connectfix_icon.svg"
    //             alt="Logo"
    //           />
    //           <span className={styles.sigaRedes}>Siga nossas redes:</span>
    //           <div className={styles.iconContainer}>
    //             <a href="https://www.instagram.com/" target="_blank">
    //               <FaInstagram size={28} className={styles.iconSocial} />
    //             </a>
    //             <a href="https://www.facebook.com/" target="_blank">
    //               <FaFacebook size={28} className={styles.iconSocial} />
    //             </a>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Coluna Funcionalidades */}
    //       <div className={styles.coluna}>
    //         <h4 className={styles.tituloFooter}>Funcionalidades</h4>
    //         <a className={styles.linkFooter} href="/home">
    //           Início
    //         </a>
    //         <a className={styles.linkFooter} href="/sobre">
    //           Quem somos
    //         </a>
    //         <a className={styles.linkFooter} href="/demandas">
    //           Demandas
    //         </a>
    //       </div>

    //       {/* Coluna Fale Conosco */}
    //       <div className={styles.coluna}>
    //         <h4 className={styles.tituloFooter}>Fale Conosco</h4>
    //         <p className={styles.paragrafoFooter}>
    //           <strong>Telefone:</strong> 0800-102-0880
    //         </p>
    //         <p className={styles.paragrafoFooter}>
    //           <strong>Whatsapp:</strong> 27 99841-2270
    //         </p>
    //       </div>
    //     </div>
    //     <hr className="mb-3 mx-5 text-white border-2 w-75" />
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "left",
    //         justifyContent: "left",
    //       }}
    //     >
    //       <p style={{ marginTop: "1rem" }}>
    //         © 2025 ConnectFix. Todos os direitos reservados.
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Footer;
