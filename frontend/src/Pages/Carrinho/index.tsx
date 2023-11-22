import { Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CartItem from "./Components/CartItem";
import Checkout from "./Components/Checkout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

export default function Cart() {
  const products = useSelector((state: RootState) => state.carrinho);

  useEffect(() => {
    console.log(products);
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
          {products.produtosCarrinho !== undefined ? (
            <>
              {products.produtosCarrinho.map((produtoCarrinho) => {
                return (
                  <CartItem
                    key={produtoCarrinho.produto.id}
                    produto={produtoCarrinho.produto}
                    quantidade={produtoCarrinho.quantidade}
                  />
                );
              })}
              {products.produtosCarrinho.length === 0 ? "Carrinho Vazio" : null}
            </>
          ) : (
            "Carregando..."
          )}
        </Col>
      </Card.Body>{" "}
      <Checkout />
    </Card>
  );
}
