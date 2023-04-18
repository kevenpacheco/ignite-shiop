import { Handbag, X } from "@phosphor-icons/react";
import { ProductType } from "@src/@types/Product";
import { Button } from "@src/styles/components/Button";
import {
  ShoppingCartCloseButton,
  ShoppingCartContainer,
  ShoppingCartEmpty,
  ShoppingCartItem,
  ShoppingCartSummary,
} from "@src/styles/components/ShoppingCart";
import { formatCurrency } from "@src/utils/formatCurrency";
import Image from "next/image";

interface ShoppingCart {
  products: ProductType[];
}

export function ShoppingCart({ products }: ShoppingCart) {
  const total = products?.reduce((acc, product) => {
    return (acc += product.price);
  }, 0);

  return (
    <ShoppingCartContainer>
      <ShoppingCartCloseButton>
        <X size={24} weight="bold" />
      </ShoppingCartCloseButton>

      <h2>Sacola de compras</h2>

      {products?.length > 0 ? (
        <ul>
          {products.map((product) => (
            <ShoppingCartItem key={product.id}>
              <figure>
                <Image src={product.imageUrl} width={95} height={95} alt="" />
              </figure>

              <div>
                <h3>{product.name}</h3>
                <strong>{formatCurrency(product.price)}</strong>

                <button type="button">Remover</button>
              </div>
            </ShoppingCartItem>
          ))}
        </ul>
      ) : (
        <ShoppingCartEmpty>
          <Handbag weight="bold" />
        </ShoppingCartEmpty>
      )}

      <ShoppingCartSummary>
        <span>Quantidade</span>
        <span>{`${products?.length || 0} itens`}</span>

        <span>Valor total</span>
        <span>{formatCurrency(total || 0)}</span>
      </ShoppingCartSummary>

      <Button>Finalizar compra</Button>
    </ShoppingCartContainer>
  );
}
