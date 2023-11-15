import { useEffect, useRef, useState } from "react";
import CustomTable, { TableColumn } from "../Tabela";
import ConfirmationModal from "../Confirmacao";
import AttAddProduto from "../AttAddProduto";
import axios from "axios";
import {
  CreateProduct,
  DeleteProduct,
  EditProduct,
  IProduto,
} from "../../services/produto.service";
import { User } from "../../services/login.service";
import ProductListGrid from "../ListaProdutosGrid";

export default function ListaProdutos() {
  const productToDelete = useRef<IProduto>();
  const productToUpdate = useRef<IProduto>();

  const [isModalConfirmationOpen, SetIsModalConfirmationOpen] = useState(false);
  const [isModalAttAddOpen, SetIsModalAttAddOpenOpen] = useState(false);

  const [products, SetProducts] = useState<IProduto[]>([]);
  const [user, SetUser] = useState<User>();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get<IProduto[]>(
        "http://localhost:3333/v1/produto"
      );

      SetProducts(res.data);
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
    { head: "Preco", acessor: "preco" },
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
    <div>
      <h1>Produtos</h1>
      {user?.isAdmin ? (
        <button
          onClick={() => {
            productToUpdate.current = undefined;
            SetIsModalAttAddOpenOpen(true);
          }}
        >
          Inserir Produto
        </button>
      ) : null}

      {user?.isAdmin ? (
        <CustomTable data={products} columns={columnsProducts} />
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
