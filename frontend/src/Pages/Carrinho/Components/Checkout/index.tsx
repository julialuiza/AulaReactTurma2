import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcMastercard,
  faCcVisa,
  faCcDiscover,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect } from "react";

export default function Checkout() {
  const products = useSelector((state: RootState) => state.carrinho);

  async function RealizarCompra() {}

  useEffect(() => {
    console.log(products);
  }, []);

  return (
    <Col lg={5}>
      <Card bg="primary" text="white" className="rounded-3">
        <Card.Body>
          <p className="small mb-2">Cartões Aceitos</p>
          <div
            style={{
              width: 200,
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
              gap: 10,
              padding: "10px",
            }}
          >
            <FontAwesomeIcon size="2x" icon={faCcVisa} />
            <FontAwesomeIcon size="2x" icon={faCcMastercard} />
            <FontAwesomeIcon size="2x" icon={faCcDiscover} />
          </div>

          <Form>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                id="typeName"
                size="lg"
                placeholder="Cardholder's Name"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                id="typeText"
                size="lg"
                placeholder="1234 5678 9012 3457"
              />
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="typeExp"
                    placeholder="MM/YYYY"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <hr className="my-4" />

          <div className="d-flex justify-content-between mb-4">
            <p className="mb-2">Total(Incl. taxas)</p>
            <p className="mb-2">R$ {products.totalValor}</p>
          </div>

          <Button variant="info" size="lg" onClick={() => RealizarCompra()}>
            <div className="d-flex justify-content-between">
              <span>Pagar</span>
            </div>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
