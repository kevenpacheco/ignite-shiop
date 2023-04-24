import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductType } from '@src/@types/Product';
import { ShoppingCartProduct } from '@src/@types/ShoppingCartProduct';

interface ShoppingCartState {
  products: ShoppingCartProduct[];
};

const initialState: ShoppingCartState = {
  products: []
};

export const shoppingCartSlice = createSlice({
  name: 'shppingCart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      const indexCurrentProduct = state.products.findIndex(product => product.id === action.payload.id);

      if (indexCurrentProduct >= 0) {
        state.products[indexCurrentProduct].quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

    },
    removeProduct: (state, action: PayloadAction<ProductType['id']>) => {
      const indexCurrentProduct = state.products.findIndex(product => product.id === action.payload);

      if (state.products[indexCurrentProduct].quantity > 1) {
        state.products[indexCurrentProduct].quantity -= 1
      } else {
        state.products.splice(indexCurrentProduct, 1);
      }
    },
  },
});

export const { addProduct, removeProduct } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;