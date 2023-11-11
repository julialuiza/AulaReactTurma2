import { useEffect, useState } from "react";
import { IProduto } from "../ListaProdutos";
import { Button, Form, Modal } from "react-bootstrap";

interface AttAddProdutoProps {
  isShow: boolean;
  onClose: () => void;
  productUpdate: IProduto | undefined;
  onAddProduct?: (prod: IProduto) => void;
  onAttProduct?: (prod: IProduto) => void;
}

export default function AttAddProduto(props: AttAddProdutoProps) {
  const [nameProduct, SetNameProduct] = useState<string>("");
  const [precoProduct, SetPrecoProduct] = useState<number>(0);
  const [estoqueProduct, SetEstoqueProduct] = useState<number>(0);

  useEffect(() => {
    if (props.productUpdate !== undefined) {
      SetNameProduct(props.productUpdate.nome);
      SetEstoqueProduct(props.productUpdate.estoque);
      SetPrecoProduct(props.productUpdate.preco);
    }
  }, []);

  function changeProduct() {
    const inpProduct: IProduto = {
      id: 0,
      estoque: estoqueProduct,
      nome: nameProduct,
      preco: precoProduct,
    };

    if (props.productUpdate) {
      inpProduct.id = props.productUpdate.id;
      props.onAttProduct!(inpProduct);
    } else {
      inpProduct.id = Math.random() * 100;
      props.onAddProduct!(inpProduct);
    }

    props.onClose();
  }

  return (
    <Modal show={props.isShow} onHide={props.onClose} centered>
      <Modal.Header closeButton={true}>
        <Modal.Title>
          {props.productUpdate ? "Atualizar Produto" : "Novo Produto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nomeProduto">Produto</Form.Label>
            <Form.Control
              type="text"
              required
              value={nameProduct}
              onChange={(e) => SetNameProduct(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="precoProduto">Preço</Form.Label>
            <Form.Control
              type="number"
              required
              value={precoProduct}
              onChange={(e) => SetPrecoProduct(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="estoqueProduto">Estoque</Form.Label>
            <Form.Control
              type="number"
              required
              value={estoqueProduct}
              onChange={(e) => SetEstoqueProduct(Number(e.target.value))}
            />
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="success"
              type="button"
              onClick={() => changeProduct()}
            >
              {props.productUpdate ? "Atualizar Produto" : "Cadastrar Produto"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
