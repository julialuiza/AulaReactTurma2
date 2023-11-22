import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduto } from "../../services/produto.service";

interface IProdutosCarrinho {
  produto: IProduto;
  quantidade: number;
}

interface ICarrinho {
  produtosCarrinho: IProdutosCarrinho[];
  totalProdutos: number;
  totalValor: number;
}

const carrinhoInitialState: ICarrinho = {
  totalProdutos: 0,
  produtosCarrinho: [],
  totalValor: 0,
};

export const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState: carrinhoInitialState,
  reducers: {
    addCarrinho(state, action: PayloadAction<IProduto>) {
      const indexProduct = state.produtosCarrinho.findIndex(
        (prodCart) => prodCart.produto.id === action.payload.id
      );

      // ELE EXISTE
      if (indexProduct >= 0) {
        state.produtosCarrinho[indexProduct].quantidade += 1;
      } else {
        state.produtosCarrinho.push({ produto: action.payload, quantidade: 1 });
        state.totalProdutos += 1;
      }

      state.totalValor += action.payload.preco;
    },

    increment(state, action: PayloadAction<IProduto>) {
      const indexProduct = state.produtosCarrinho.findIndex(
        (prodCart) => prodCart.produto.id === action.payload.id
      );
      state.produtosCarrinho[indexProduct].quantidade += 1;
      state.totalValor += action.payload.preco;
    },

    decrease(state, action: PayloadAction<IProduto>) {
      const indexProduct = state.produtosCarrinho.findIndex(
        (prodCart) => prodCart.produto.id === action.payload.id
      );

      state.produtosCarrinho[indexProduct].quantidade -= 1;
      state.totalValor -= action.payload.preco;

      if (state.produtosCarrinho[indexProduct].quantidade === 0) {
        state.produtosCarrinho.splice(indexProduct, 1);
        state.totalProdutos -= 1;
      }
    },
    deleteProduct(state, action: PayloadAction<IProduto>) {
      const indexProduct = state.produtosCarrinho.findIndex(
        (prodCart) => prodCart.produto.id === action.payload.id
      );

      state.totalValor -=
        action.payload.preco * state.produtosCarrinho[indexProduct].quantidade;
      state.totalProdutos -= 1;
      state.produtosCarrinho.splice(indexProduct, 1);
    },
  },
});
export const { deleteProduct, addCarrinho, decrease, increment } =
  carrinhoSlice.actions;

export default carrinhoSlice.reducer;
