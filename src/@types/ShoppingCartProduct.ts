import { ProductType } from "./Product";

export interface ShoppingCartProduct extends ProductType {
  quantity: number;
}