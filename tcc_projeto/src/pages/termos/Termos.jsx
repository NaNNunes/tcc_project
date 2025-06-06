import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router";
import styles from "./termos.module.css"

const Termos = () => {
    return (
        <div>
            <Container fluid className={styles.containerTermos}>
                <Row className="justify-content-center">
                    <Col md={10} lg={12}>
                        <Card className={styles.card}>
                            <Card.Body>
                                <Card.Title className={styles.title}>
                                    Termos e Condições de Uso
                                </Card.Title>
                                <Card.Subtitle className={styles.subtitle}>
                                    1. Aceitação dos Termos
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>

                                    Ao acessar e utilizar a plataforma, você concorda em cumprir e
                                    estar legalmente vinculado aos presentes Termos e Condições de
                                    Uso. Se você não concordar com qualquer parte destes termos, não
                                    deverá utilizar nossos serviços.

                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    2. Descrição da Plataforma
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>

                                    A plataforma tem como objetivo conectar{" "}
                                    <strong>assistências técnicas</strong> e <strong>usuários</strong>
                                    .
                                    <ul>
                                        <li>
                                            <strong>Assistências Técnicas</strong>: Empresas ou
                                            profissionais que se cadastram para divulgar seus serviços de
                                            reparo de dispositivos eletrônicos.
                                        </li>
                                        <li>
                                            <strong>Usuários</strong>: Pessoas físicas que se cadastram para
                                            solicitar orçamentos e serviços de manutenção, cadastrando seus
                                            dispositivos eletrônicos que necessitam de conserto.
                                        </li>
                                    </ul>
                                    <p>
                                        A plataforma atua exclusivamente como um intermediador entre as
                                        partes, não realizando os serviços diretamente.
                                    </p>
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    3. Cadastro de Usuários e Assistências
                                </Card.Subtitle>
                                <Card.Subtitle className={styles.subsubtitle}>
                                    3.1. Elegibilidade
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    <ul>
                                        <li>Ter pelo menos 18 anos de idade;</li>
                                        <li>
                                            Fornecer informações verdadeiras, completas e atualizadas no
                                            momento do cadastro.
                                        </li>
                                    </ul>
                                </Card.Text>
                                <Card.Subtitle className={styles.subsubtitle}>
                                    3.2. Responsabilidades
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    <ul>
                                        <li>
                                            Cada usuário e assistência técnica é responsável pela veracidade
                                            das informações fornecidas.
                                        </li>
                                        <li>
                                            A assistência técnica se compromete a fornecer informações
                                            precisas sobre seus serviços, prazos, qualificações e condições
                                            comerciais.
                                        </li>
                                    </ul>
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    4. Uso da Plataforma
                                </Card.Subtitle>
                                <Card.Subtitle className={styles.subsubtitle}>
                                    4.1. Para Usuários
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    <ul>
                                        <li>
                                            Cadastrar seus dispositivos eletrônicos, informando marca,
                                            modelo, defeitos ou necessidades.
                                        </li>
                                        <li>
                                            Solicitar orçamentos e contratar assistências cadastradas.
                                        </li>
                                        <li>Avaliar e comentar sobre os serviços prestados.</li>
                                    </ul>
                                </Card.Text>
                                <Card.Subtitle className={styles.subsubtitle}>
                                    4.2. Para Assistências Técnicas
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    <ul>
                                        <li>
                                            Divulgar seus serviços de reparo, manutenção ou diagnóstico.
                                        </li>
                                        <li>Responder orçamentos e propostas.</li>
                                        <li>
                                            Cumprir os prazos, valores e condições acordadas diretamente com
                                            os usuários.
                                        </li>
                                    </ul>
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    5. Responsabilidades da Plataforma
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    <ul>
                                        <li>
                                            Facilitar a conexão entre usuários e assistências técnicas.
                                        </li>
                                        <li>
                                            Disponibilizar ferramentas de cadastro, comunicação e gestão dos
                                            pedidos.
                                        </li>
                                        <li>
                                            Não se responsabiliza pela qualidade, execução, prazos ou
                                            resultados dos serviços prestados pelas assistências técnicas.
                                        </li>
                                    </ul>
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    6. Obrigações dos Usuários e Assistências
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    <ul>
                                        <li>Utilizar a plataforma de forma ética e legal.</li>
                                        <li>
                                            Não praticar atos que possam prejudicar a plataforma, outros
                                            usuários ou assistências.
                                        </li>
                                        <li>
                                            Respeitar as leis vigentes, especialmente relacionadas a
                                            direitos do consumidor, propriedade intelectual, privacidade e
                                            segurança.
                                        </li>
                                    </ul>
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    7. Privacidade e Proteção de Dados
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    As informações fornecidas pelos usuários e assistências serão
                                    tratadas de acordo com nossa <Link to={"/politica-de-privacidade"} className={styles.link}>Política de Privacidade</Link>, em
                                    conformidade com a{" "}
                                    <a
                                        href="https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.link}
                                    >
                                        Lei Geral de Proteção de Dados (LGPD) – Lei nº 13.709/2018.
                                    </a>.
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    8. Propriedade Intelectual
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    Todos os elementos da plataforma, incluindo textos, marcas,
                                    logotipos, designs e funcionalidades, são protegidos por direitos
                                    autorais e de propriedade intelectual. É proibido seu uso não
                                    autorizado.

                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    9. Suspensão e Cancelamento de Contas
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    A plataforma se reserva o direito de suspender ou cancelar contas
                                    que violem estes termos, causem prejuízo a terceiros ou utilizem a
                                    plataforma de forma indevida.
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    10. Alterações dos Termos
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    Estes termos podem ser alterados a qualquer momento, sendo
                                    responsabilidade do usuário e das assistências técnicas
                                    consultá-los periodicamente.
                                </Card.Text>
                                <Card.Subtitle className={styles.subtitle}>
                                    11. Foro
                                </Card.Subtitle>
                                <Card.Text className={styles.text}>
                                    Fica eleito o foro da comarca de Vitória, Espírito Santo, para dirimir quaisquer dúvidas ou conflitos oriundos
                                    destes Termos, com renúncia expressa a qualquer outro.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default Termos;
