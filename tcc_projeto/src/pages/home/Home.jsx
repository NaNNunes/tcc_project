import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Image,
  Carousel,
} from "react-bootstrap";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Row>
            <Col md={12} className={styles.heroContent}>
              <Image
                className={styles.imgConnect}
                src="/logos/connectfix_logo.svg"
              />
              <h2>Confiança que gera conexões</h2>
              <p>
                Conectamos você às melhores assistências técnicas de forma
                rápida, segura e prática.
              </p>
              <div className={styles.buttons}>
                <Button className={styles.primaryButton}>
                  Encontrar Assistência
                </Button>
                <Button className={styles.secondaryButton}>
                  Seja um Parceiro
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sobre */}
      <section className={styles.aboutSection}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={styles.aboutSectionContent}>
                <h3>Sobre o ConnectFix</h3>
                <p>
                  Somos uma plataforma que conecta clientes a assistências
                  técnicas de diversos segmentos. Garantimos serviços de
                  qualidade, avaliações reais e um processo simples.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className={styles.card}>
                <h4>Por que escolher o ConnectFix?</h4>
                <ul className={styles.benefitsList}>
                  <li>✔️ Assistências verificadas</li>
                  <li>✔️ Avaliações de clientes reais</li>
                  <li>✔️ Suporte rápido e eficiente</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Como funciona */}
      <section className={styles.howItWorks}>
        <Container>
          <h3 className={styles.sectionTitle}>Como Funciona</h3>
          <div className={styles.rowWithGap}>
            <div className={styles.card}>
              <h4>🔍 Você busca</h4>
              <p>Digite o que precisa consertar e sua localização.</p>
            </div>
            <div className={styles.card}>
              <h4>💰 Receba orçamentos</h4>
              <p>Compare preços, avaliações e prazos.</p>
            </div>
            <div className={styles.card}>
              <h4>🛠️ Escolha e resolva</h4>
              <p>
                Agende, acompanhe e finalize seu serviço direto pelo ConnectFix.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Por que usar */}
      <section className={styles.why}>
        <Container>
          <h3 className={styles.sectionTitle}>Por que usar o ConnectFix?</h3>
          <Row>
            <Col md={6}>
              <ul className={styles.benefits}>
                <li>⏱️ Economia de tempo</li>
                <li>💸 Compare preços</li>
                <li>⭐ Serviços de qualidade</li>
                <li>🔒 Segurança garantida</li>
              </ul>
            </Col>
            <Col md={6} className={styles.imagePlaceholder}></Col>
          </Row>
        </Container>
      </section>

      {/* Carousel de testemunhos */}
      <section className={styles.testimonials}>
        <Container>
          <h3 className={styles.sectionTitleTestimonials}>
            O que dizem nossos clientes
          </h3>
          <Carousel indicators={false} controls={true}>
            <Carousel.Item>
              <Card className={styles.testimonialCard}>
                <Card.Body>
                  <Card.Text className={styles.testimonialText}>
                    "O ConnectFix salvou meu computador no momento que mais
                    precisei. Atendimento rápido e eficiente!"
                  </Card.Text>
                  <Card.Title className={styles.testimonialAuthor}>
                    — Ana Souza
                  </Card.Title>
                </Card.Body>
              </Card>
            </Carousel.Item>

            <Carousel.Item>
              <Card className={styles.testimonialCard}>
                <Card.Body>
                  <Card.Text className={styles.testimonialText}>
                    "Excelente plataforma! Encontrei o técnico ideal com preço
                    justo. Recomendo muito."
                  </Card.Text>
                  <Card.Title className={styles.testimonialAuthor}>
                    — Carlos Lima
                  </Card.Title>
                </Card.Body>
              </Card>
            </Carousel.Item>

            <Carousel.Item>
              <Card className={styles.testimonialCard}>
                <Card.Body>
                  <Card.Text className={styles.testimonialText}>
                    "Serviço impecável, desde a busca até a finalização.
                    Voltarei a usar sempre que precisar."
                  </Card.Text>
                  <Card.Title className={styles.testimonialAuthor}>
                    — Marina Ferreira
                  </Card.Title>
                </Card.Body>
              </Card>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 ConnectFix. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
