import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IProduto } from "../../../../services/produto.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import {
  decrease,
  deleteProduct,
  increment,
} from "../../../../redux/slices/carrinho.slice";

export interface PropsCardItem {
  produto: IProduto;
  quantidade: number;
}

export default function CartItem(props: PropsCardItem) {
  const dispatch = useDispatch<AppDispatch>();

  function DeleteProduct(productToDelete: IProduto) {
    dispatch(deleteProduct(productToDelete));
  }

  function IncrementProduct(product: IProduto) {
    dispatch(increment(product));
  }

  function DecreaseProduct(product: IProduto) {
    dispatch(decrease(product));
  }

  return (
    <Card style={{ padding: "0px" }}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row align-items-center">
            <img
              src="https://coyote.ca/wp/wp-content/uploads/2013/09/generic_brands_web_700x650.jpg"
              className="img-fluid rounded-3"
              alt="Shopping item"
              style={{ width: "65px" }}
            />
          </div>
          <div className="ms-3">
            <h5>{props.produto.nome}</h5>
          </div>
          <div className="d-flex flex-row align-items-center">
            <a href="#" style={{ color: "#cecece" }}>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => IncrementProduct(props.produto)}
              />
            </a>
            <div style={{ width: "40px" }}>
              <h5 className="fw-normal mb-0">{props.quantidade}</h5>
            </div>
            <a href="#" style={{ color: "#cecece" }}>
              <FontAwesomeIcon
                icon={faMinus}
                onClick={() => DecreaseProduct(props.produto)}
              />
            </a>

            <div style={{ width: "80px" }}>
              <h5 className="mb-0">{props.produto.preco * props.quantidade}</h5>
            </div>
            <a href="#" style={{ color: "#cecece" }}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => DeleteProduct(props.produto)}
              />
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
