import { instance } from "../utils/http";
import { FetchProduct, IProduto } from "./produto.service";

export async function AddCarrinho(id: number, quant: number) {
  await instance.http.post(`/compra/${id}/${quant}`);
}

export async function FetchProductsCarrinho(): Promise<IProduto[]> {
  const res = await instance.http.get("/compra");

  const arrayProdutosCarrinho: IProduto[] = [];

  for (const item of res.data) {
    const produto = await FetchProduct(item["id"]);
    arrayProdutosCarrinho.push(produto);
  }

  return arrayProdutosCarrinho;
}

export async function FinalizarCompra() {
  await instance.http.post(`/compra`);
}
