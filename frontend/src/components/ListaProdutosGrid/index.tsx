import { Button, Card, Container } from "react-bootstrap";
import { IProduto } from "../../services/produto.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./index.css"; // Importe seu arquivo CSS aqui

interface GridViewProps {
  data: IProduto[];
  onProductClicked: (produto: IProduto) => void;
}

export default function ProductListGrid({
  data,
  onProductClicked,
}: GridViewProps) {
  return (
    <Container className="product-grid-container">
      {data.map((produto) => {
        const avaliable = produto.estoque > 0;
        const cardClass = avaliable ? "custom-card" : "custom-card disabled";

        return (
          <div key={produto.id} className={cardClass}>
            <Card>
              <Card.Img
                variant="top"
                src="https://coyote.ca/wp/wp-content/uploads/2013/09/generic_brands_web_700x650.jpg"
                alt="Produto"
              />
              <Card.Body>
                <Card.Title>{produto.nome}</Card.Title>
                <Card.Text>R$ {produto.preco}</Card.Text>
                <Button
                  variant="primary"
                  className="w-100"
                  disabled={!avaliable}
                  onClick={() => avaliable && onProductClicked(produto)}
                  aria-disabled={!avaliable}
                >
                  {avaliable ? (
                    <>
                      Carrinho
                      <FontAwesomeIcon
                        icon={faCartArrowDown}
                        className="icon-spacing"
                      />
                    </>
                  ) : (
                    "Indisponível"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </Container>
  );
}
