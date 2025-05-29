import Image from "react-bootstrap/Image";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.containerFooter}>
        {/* Coluna Logo e Redes */}
        <div className={styles.coluna}>
          <div className={styles.colunaLogo}>
            <Image
              className={styles.logo}
              src="/logos/connectfix_icon.svg"
              alt="Logo"
            />
            <span className={styles.sigaRedes}>Siga nossas redes:</span>
            <div className={styles.iconContainer}>
              <a href="https://www.instagram.com/" target="_blank">
                <FaInstagram size={28} className={styles.iconSocial} />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FaFacebook size={28} className={styles.iconSocial} />
              </a>
            </div>
          </div>
        </div>

        {/* Coluna Funcionalidades */}
        <div className={styles.coluna}>
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
        </div>

        {/* Coluna Fale Conosco */}
        <div className={styles.coluna}>
          <h4 className={styles.tituloFooter}>Fale Conosco</h4>
          <p className={styles.paragrafoFooter}>
            <strong>Telefone:</strong> 0800-102-0880
          </p>
          <p className={styles.paragrafoFooter}>
            <strong>Whatsapp:</strong> 27 99841-2270
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>© 2025 ConnectFix. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Footer;
