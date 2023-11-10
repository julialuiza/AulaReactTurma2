import { useState } from "react";

interface IProduto {
  nome: string;
  preco: number;
  estoque: number;
}

export default function ListaProdutos() {
  const [nameProduct, SetNameProduct] = useState<string>("");
  const [precoProduct, SetPrecoProduct] = useState<number>(0);
  const [estoqueProduct, SetEstoqueProduct] = useState<number>(0);

  //   const [products, SetProducts] = useState<string[]>([]);
  const [products, SetProducts] = useState<IProduto[]>([]);

  function AddProductArray() {
    const jsonProduto: IProduto = {
      nome: nameProduct,
      estoque: estoqueProduct,
      preco: precoProduct,
    };

    SetProducts([...products, jsonProduto]);
  }

  return (
    <div>
      <h1>Produtos</h1>
      <input
        type="text"
        value={nameProduct}
        placeholder="Nome do Produto"
        onChange={(e) => SetNameProduct(e.target.value)}
      />
      <input
        type="text"
        value={precoProduct}
        placeholder="Preco do Produto"
        onChange={(e) => SetPrecoProduct(parseFloat(e.target.value))}
      />
      <input
        type="text"
        value={estoqueProduct}
        placeholder="Estoque do Produto"
        onChange={(e) => SetEstoqueProduct(parseInt(e.target.value))}
      />
      <button onClick={() => AddProductArray()}>Inserir Produto</button>

      {products.map((produto, index) => {
        return (
          <div key={index}>
            <h3>Nome: {produto.nome}</h3>
            <h4>Preco: {produto.preco}</h4>
            <h5>Estoque: {produto.estoque}</h5>
          </div>
        );
      })}
    </div>
  );
}
