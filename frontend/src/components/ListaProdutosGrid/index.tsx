import { Button, Card } from "react-bootstrap";
import { IProduto } from "../../services/produto.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

interface GridViewProps {
  data: IProduto[];
  onProductClicked: (produto: IProduto) => void;
}

export default function ProductListGrid(props: GridViewProps) {
  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        {props.data.map((produto) => {
          const avaliable = produto.estoque > 0;

          return (
            <div key={produto.id} className="col">
              <Card
                className={`shadow-sm h-100 ${avaliable ? "" : "disabled"}`}
                style={{
                  width: 200,
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://coyote.ca/wp/wp-content/uploads/2013/09/generic_brands_web_700x650.jpg"
                  alt="Produto"
                />
                <Card.Body className="bg-light">
                  <Card.Title>{produto.nome}</Card.Title>
                  <Card.Text className="text-secondary">
                    R$ {produto.preco}
                  </Card.Text>

                  <Button
                    variant="primary"
                    className="d-block"
                    style={{ width: "100%" }}
                    disabled={!avaliable}
                    onClick={() => {
                      if (avaliable) {
                        props.onProductClicked(produto);
                      }
                    }}
                  >
                    {avaliable ? (
                      <FontAwesomeIcon icon={faCartArrowDown} />
                    ) : (
                      "Indisponivel"
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
