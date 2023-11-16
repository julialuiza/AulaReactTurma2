import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IProduto } from "../../services/produto.service";
import CartItem from "./Components/CartItem";
import { FetchProductsCarrinho } from "../../services/carrinho.service";
import Checkout from "./Components/Checkout";

export default function Cart() {
  const [products, SetProducts] = useState<IProduto[]>();

  useEffect(() => {
    async function FetchData() {
      const res = await FetchProductsCarrinho();
      console.log(res);
      SetProducts(res);
    }

    FetchData();
  }, []);

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Card.Body>
        <h4>Produtos</h4>
        <Col lg={7} style={{ height: 400, width: "80%", overflow: "auto" }}>
          {products !== undefined ? (
            <>
              {products!.map((produto) => {
                return (
                  <CartItem key={produto.id} produto={produto} quantidade={1} />
                );
              })}
            </>
          ) : (
            "Loading..."
          )}
        </Col>
      </Card.Body>{" "}
      <Checkout />
    </Card>
  );
}
