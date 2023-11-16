import { instance } from "../utils/http";

export async function AddCarrinho(id: number, quant: number) {
  await instance.http.post(`/compra/${id}/${quant}`);
}
