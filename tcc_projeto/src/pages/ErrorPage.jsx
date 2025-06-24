import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Row className="text-center">
        <Col>
          <h1
            style={{ fontSize: "6rem", fontWeight: "bold", color: "#034C8C" }}
          >
            404
          </h1>
          <h2 className="mb-3">Página não encontrada</h2>
          <p className="mb-4">
            A página que você está tentando acessar não existe <br /> ou você
            não possui permissão para visualizá-la.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg" className="px-4">
            Voltar para Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
