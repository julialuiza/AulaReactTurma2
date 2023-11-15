import { useEffect, useRef, useState } from "react";
import CustomTable, { TableColumn } from "../../components/Tabela";
import ConfirmationModal from "../../components/Modals/Confirmacao";
import AttAddProduto from "../../components/AttAddProduto";
import {
  CreateProduct,
  DeleteProduct,
  EditProduct,
  FetchProducts,
  IProduto,
} from "../../services/produto.service";
import { User } from "../../services/login.service";
import ProductListGrid from "../../components/ListaProdutosGrid";
import { Button } from "react-bootstrap";
import "../../App.css";

export default function ListaProdutos() {
  const productToDelete = useRef<IProduto>();
  const productToUpdate = useRef<IProduto>();

  const [isModalConfirmationOpen, SetIsModalConfirmationOpen] = useState(false);
  const [isModalAttAddOpen, SetIsModalAttAddOpenOpen] = useState(false);

  const [products, SetProducts] = useState<IProduto[]>([]);
  const [user, SetUser] = useState<User>();

  useEffect(() => {
    async function fetchData() {
      const res = await FetchProducts();

      SetProducts(res);
    }

    fetchData();

    const userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage !== undefined && userLocalStorage !== null) {
      SetUser(JSON.parse(userLocalStorage));
    }
  }, []);

  async function RemoverItemTabela(produtoToDelete: IProduto) {
    SetProducts(
      products.filter((produto) => produto.id !== produtoToDelete.id)
    );

    await DeleteProduct(produtoToDelete.id);
  }

  const columnsProducts: TableColumn<IProduto>[] = [
    { head: "Nome", acessor: "nome" },
    { head: "Estoque", acessor: "estoque" },
    { head: "R$ Preço", acessor: "preco" },
    {
      head: "Remover",
      isActionButton: true,
      onActionClick: (obj) => {
        productToDelete.current = obj;
        SetIsModalConfirmationOpen(true);
        //RemoverItemTabela(obj);
      },
    },
    {
      head: "Editar",
      isActionButton: true,
      onActionClick: (obj) => {
        productToUpdate.current = obj;
        SetIsModalAttAddOpenOpen(true);
      },
    },
  ];

  async function AddProduto(produtoNew: IProduto) {
    SetProducts([...products, produtoNew]);
    await CreateProduct(produtoNew);
  }

  async function AttProduto(produtoAtt: IProduto) {
    SetProducts(
      products.map((prod) => {
        return prod.id === produtoAtt.id ? produtoAtt : prod;
      })
    );

    await EditProduct(produtoAtt);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      {user?.isAdmin ? (
        <div style={{ width: "80%" }}>
          {/* Button Inserir */}
          <div style={{ marginRight: "0", padding: 10 }}>
            <Button
              variant="success"
              onClick={() => {
                productToUpdate.current = undefined;
                SetIsModalAttAddOpenOpen(true);
              }}
            >
              Inserir Produto
            </Button>
          </div>

          {/* Tabela para Edição de Produtos */}
          <CustomTable data={products} columns={columnsProducts} />
        </div>
      ) : (
        <ProductListGrid
          data={products}
          onProductClicked={(obj) => {
            console.log(obj);
          }}
        />
      )}

      <AttAddProduto
        isShow={isModalAttAddOpen}
        onClose={() => {
          SetIsModalAttAddOpenOpen(false);
        }}
        productUpdate={productToUpdate.current}
        onAddProduct={(produto) => {
          AddProduto(produto);
        }}
        onAttProduct={(produto) => {
          AttProduto(produto);
        }}
      />

      <ConfirmationModal
        isShow={isModalConfirmationOpen}
        message="Deseja excluir esse produto?"
        title="Alerta"
        onCancel={() => {
          SetIsModalConfirmationOpen(false);
        }}
        onConfirm={() => {
          RemoverItemTabela(productToDelete.current!);
          SetIsModalConfirmationOpen(false);
        }}
      />
    </div>
  );
}
