import { useEffect, useRef, useState } from "react";
import CustomTable, { TableColumn } from "../Tabela";
import ConfirmationModal from "../Confirmacao";
import AttAddProduto from "../AttAddProduto";
import axios from "axios";

export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export default function ListaProdutos() {
  const productToDelete = useRef<IProduto>();
  const productToUpdate = useRef<IProduto>();

  const [isModalConfirmationOpen, SetIsModalConfirmationOpen] = useState(false);
  const [isModalAttAddOpen, SetIsModalAttAddOpenOpen] = useState(false);

  const [products, SetProducts] = useState<IProduto[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get<IProduto[]>(
        "http://localhost:3333/v1/produto"
      );

      SetProducts(res.data);
    }

    fetchData();
  }, []);

  async function RemoverItemTabela(produtoToDelete: IProduto) {
    SetProducts(
      products.filter((produto) => produto.id !== produtoToDelete.id)
    );
    
    await axios.delete(
      `http://localhost:3333/v1/produto/${produtoToDelete.id}`
    );
  }

  const columnsProducts: TableColumn<IProduto>[] = [
    { head: "ID", acessor: "id" },
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

  function AddProduto(produtoNew: IProduto) {
    SetProducts([...products, produtoNew]);
  }

  function AttProduto(produtoAtt: IProduto) {
    SetProducts(
      products.map((prod) => {
        return prod.id === produtoAtt.id ? produtoAtt : prod;
      })
    );
  }

  return (
    <div>
      <h1>Produtos</h1>
      <button
        onClick={() => {
          productToUpdate.current = undefined;
          SetIsModalAttAddOpenOpen(true);
        }}
      >
        Inserir Produto
      </button>

      <CustomTable data={products} columns={columnsProducts} />

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
