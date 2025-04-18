import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const ContaePerfil = () => {
  return (
    <Form >
        <Row className="justify-content-center border rounded-3 shadow" xs={10}>
            <label htmlFor="" className="justify-content-">Minhas Infos</label>
            <Col xs={4}>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
            </Col>
            <Col xs={6}>
                <Form.Floating className="mb-3">
                
                    <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
            </Col>
        </Row>
        <Row className="justify-content-center border rounded-3 shadow mt-3" xs={10}>
            <label htmlFor="" className="justify-content-">Minhas Infos</label>
            <Col xs={4}>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
            </Col>
            <Col xs={6}>
                <Form.Floating className="mb-3">
                
                    <Form.Control
                        id="floatingInputCustom"
                        type="email"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
            </Col>
        </Row>
     </Form>
  )
}

export default ContaePerfil