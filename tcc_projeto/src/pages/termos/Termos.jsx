import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

const Termos = () => {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Termos e Condições de Uso</h1>
                        <h2>1. Aceitação dos Termos</h2>
                        <p>Ao acessar e utilizar a plataforma, você concorda em cumprir e estar legalmente vinculado aos presentes Termos e Condições de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.</p>
                        <h2>2. Descrição da Plataforma</h2>
                        <p>A plataforma tem como objetivo conectar <strong>assistências técnicas</strong> e <strong>usuários</strong>.</p>
                        <ul>
                            <li><strong>Assistências Técnicas</strong>: Empresas ou profissionais que se cadastram para divulgar seus serviços de reparo de dispositivos eletrônicos.</li>
                            <li><strong>Usuários</strong>: Pessoas físicas que se cadastram para solicitar orçamentos e serviços de manutenção, cadastrando seus dispositivos eletrônicos que necessitam de conserto.</li>
                        </ul>
                        <p>A plataforma atua exclusivamente como um intermediador entre as partes, não realizando os serviços diretamente.</p>
                        <h2>3. Cadastro de Usuários e Assistências</h2>
                        <h3>3.1. Elegibilidade</h3>
                        <ul>
                            <li>Ter pelo menos 18 anos de idade;</li>
                            <li>Fornecer informações verdadeiras, completas e atualizadas no momento do cadastro.</li>
                        </ul>
                        <h3>3.2. Responsabilidades</h3>
                        <ul>
                            <li>Cada usuário e assistência técnica é responsável pela veracidade das informações fornecidas.</li>
                            <li>A assistência técnica se compromete a fornecer informações precisas sobre seus serviços, prazos, qualificações e condições comerciais.</li>
                        </ul>

                        <h2>4. Uso da Plataforma</h2>
                        <h3>4.1. Para Usuários</h3>
                        <ul>
                            <li>Cadastrar seus dispositivos eletrônicos, informando marca, modelo, defeitos ou necessidades.</li>
                            <li>Solicitar orçamentos e contratar assistências cadastradas.</li>
                            <li>Avaliar e comentar sobre os serviços prestados.</li>
                        </ul>
                        <h3>4.2. Para Assistências Técnicas</h3>
                        <ul>
                            <li>Divulgar seus serviços de reparo, manutenção ou diagnóstico.</li>
                            <li>Responder orçamentos e propostas.</li>
                            <li>Cumprir os prazos, valores e condições acordadas diretamente com os usuários.</li>
                        </ul>
                        <h2>5. Responsabilidades da Plataforma</h2>
                        <ul>
                            <li>Facilitar a conexão entre usuários e assistências técnicas.</li>
                            <li>Disponibilizar ferramentas de cadastro, comunicação e gestão dos pedidos.</li>
                            <li>Não se responsabiliza pela qualidade, execução, prazos ou resultados dos serviços prestados pelas assistências técnicas.</li>
                        </ul>
                        <h2>6. Obrigações dos Usuários e Assistências</h2>
                        <ul>
                            <li>Utilizar a plataforma de forma ética e legal.</li>
                            <li>Não praticar atos que possam prejudicar a plataforma, outros usuários ou assistências.</li>
                            <li>Respeitar as leis vigentes, especialmente relacionadas a direitos do consumidor, propriedade intelectual, privacidade e segurança.</li>
                        </ul>
                        <h2>7. Privacidade e Proteção de Dados</h2>
                        As informações fornecidas pelos usuários e assistências serão tratadas de acordo com nossa Política de Privacidade, em conformidade com a <a
                            href="https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lei Geral de Proteção de Dados (LGPD)
                        </a>.
                        <h2>8. Propriedade Intelectual</h2>

                        <h2>9. Suspensão e Cancelamento de Contas</h2>

                        <h2>10. Alterações dos Termos</h2>

                        <h2>11. Foro</h2>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Termos
