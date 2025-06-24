import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "./termos.module.css";

const PoliticaPrivacidade = () => {
  return (
    <div>
      <Container fluid className={styles.containerTermos}>
        <Row className="justify-content-center">
          <Col md={10} lg={12}>
            <Card className={styles.card}>
              <Card.Body>
                <Card.Title className={styles.title}>
                  Política de Privacidade
                </Card.Title>

                <Card.Subtitle className={styles.subtitle}>
                  1. Introdução
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  Esta Política de Privacidade descreve como a <strong>ConnectFix</strong> coleta, utiliza, armazena e protege os dados pessoais de seus usuários, sejam eles assistências técnicas ou clientes (usuários finais). Nosso compromisso é garantir a privacidade e a segurança das informações, em conformidade com a  <a
                    href="https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Lei Geral de Proteção de Dados (LGPD) – Lei nº 13.709/2018.
                  </a>.
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  2. Dados Coletados
                </Card.Subtitle>
                <Card.Subtitle className={styles.subsubtitle}>
                  2.1. Dados de Cadastro
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  <ul>
                    <li>Nome completo ou razão social</li>
                    <li>CPF ou CNPJ</li>
                    <li>Endereço</li>
                    <li>E-mail</li>
                    <li>Número de telefone</li>
                    <li>Dados de login (usuário e senha)</li>
                  </ul>
                </Card.Text>

                <Card.Subtitle className={styles.subsubtitle}>
                  2.2. Dados dos Dispositivos (Usuário)
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  <ul>
                    <li>Marca, modelo, número de série e descrição dos defeitos dos dispositivos cadastrados.</li>
                  </ul>
                </Card.Text>

                <Card.Subtitle className={styles.subsubtitle}>
                  2.3. Dados de Serviços (Assistências Técnicas)
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  <ul>
                    <li>Informações sobre os serviços prestados, orçamentos enviados, avaliações e comunicações realizadas na plataforma.</li>
                  </ul>
                </Card.Text>

                <Card.Subtitle className={styles.subsubtitle}>
                  2.4. Dados de Navegação
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  <ul>
                    <li>Endereço IP</li>
                    <li>Dados de geolocalização (quando autorizado)</li>
                    <li>Cookies e informações sobre o dispositivo, navegador e interações na plataforma</li>
                  </ul>
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  3. Finalidade do Uso dos Dados
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  <ul>
                    <li>Permitir a criação e manutenção de sua conta</li>
                    <li>Intermediar o contato entre usuários e assistências técnicas</li>
                    <li>Gerenciar solicitações de orçamento e serviços</li>
                    <li>Realizar comunicações importantes sobre sua conta ou serviços contratados</li>
                    <li>Melhorar a experiência na plataforma, por meio de análises e aperfeiçoamentos</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                  </ul>
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  4. Compartilhamento de Dados
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  <ul>
                    <li>Com assistências técnicas, quando você solicita um serviço ou orçamento</li>
                    <li>Com usuários, no caso de assistências técnicas, para possibilitar contato e contratação</li>
                    <li>Com fornecedores de tecnologia, meios de pagamento, hospedagem e suporte, sempre resguardando a confidencialidade e segurança</li>
                    <li>Mediante requisição de autoridades legais ou judiciais, conforme exigido pela legislação</li>
                  </ul>
                  Nunca vendemos seus dados pessoais.
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  5. Armazenamento e Segurança dos Dados
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  Seus dados são armazenados em ambientes seguros, com acesso restrito e criptografia quando aplicável. Aplicamos medidas técnicas e administrativas adequadas para proteger contra acessos não autorizados, destruição, perda, alteração ou divulgação indevida.
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  6. Seus Direitos como Titular dos Dados
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  Nos termos da LGPD, você tem direito a:
                  <ul>
                    <li>Confirmar a existência de tratamento dos seus dados</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                    <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários</li>
                    <li>Solicitar a portabilidade dos dados para outro fornecedor de serviço</li>
                    <li>Revogar o consentimento a qualquer momento, quando aplicável</li>
                    <li>Solicitar a exclusão dos seus dados, exceto quando houver obrigação legal de armazenamento</li>
                  </ul>
                  Para exercer seus direitos, entre em contato pelo e-mail: [inserir e-mail de contato].
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  7. Uso de Cookies
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  Utilizamos cookies e tecnologias semelhantes para:
                  <ul>
                    <li>Melhorar sua experiência na navegação</li>
                    <li>Guardar preferências de acesso</li>
                    <li>Realizar análises de tráfego e comportamento na plataforma</li>
                  </ul>
                  Você pode desativar os cookies nas configurações do seu navegador, embora isso possa impactar algumas funcionalidades da plataforma.
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  8. Alterações na Política de Privacidade
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  Esta política pode ser atualizada periodicamente. Recomendamos que você revise-a regularmente. Alterações significativas serão comunicadas por meio dos canais da plataforma.
                </Card.Text>

                <Card.Subtitle className={styles.subtitle}>
                  9. Contato
                </Card.Subtitle>
                <Card.Text className={styles.text}>
                  Se tiver dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade ou ao tratamento de seus dados pessoais, entre em contato:
                  <ul>
                    <li>E-mail: contato@connectfix.com</li>
                    <li>Telefone: (27)99999-9999</li>
                    <li>Endereço: Av. Mal. Mascarenhas de Moraes, 2235 - Bento Ferreira, Vitória - ES, 29052-121</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PoliticaPrivacidade;
