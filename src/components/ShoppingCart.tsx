import Image from "next/image";
import { useState } from "react";
import { Handbag, X } from "@phosphor-icons/react";
import axios from "axios";
import { ProductType } from "@src/@types/Product";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { removeProduct } from "@src/store/shoppingCartSlice";
import { formatCurrency } from "@src/utils/formatCurrency";
import { Button } from "@src/styles/components/Button";
import {
  ShoppingCartCloseButton,
  ShoppingCartContainer,
  ShoppingCartEmpty,
  ShoppingCartItem,
  ShoppingCartSummary,
} from "@src/styles/components/ShoppingCart";

interface ShoppingCart {
  isVisible: boolean;
  onClose: () => void;
}

export function ShoppingCart({ isVisible, onClose }: ShoppingCart) {
  const products = useAppSelector((state) => state.shoppingCart.products);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const dispatch = useAppDispatch();

  function handleRemoveProduct(productId: ProductType["id"]) {
    return function () {
      dispatch(removeProduct(productId));
    };
  }

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false);

      alert("Falha ao redirecionar ao checkout!");
    }
  }

  const total = products?.reduce((acc, product) => {
    return (acc += product.price * product.quantity);
  }, 0);

  const itemsCount = products?.reduce((acc, product) => {
    return (acc += product.quantity);
  }, 0);

  return (
    <ShoppingCartContainer className={isVisible ? "show" : ""}>
      <ShoppingCartCloseButton type="button" onClick={onClose}>
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

              <div className="details">
                <h3>{product.name}</h3>

                <div>
                  <strong>{formatCurrency(product.price)}</strong>
                  {product.quantity > 1 && (
                    <span>{`${product.quantity}x`}</span>
                  )}
                </div>

                <button type="button" onClick={handleRemoveProduct(product.id)}>
                  Remover
                </button>
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
        <span>{`${itemsCount} itens`}</span>

        <span>Valor total</span>
        <span>{formatCurrency(total || 0)}</span>
      </ShoppingCartSummary>

      <Button
        type="button"
        onClick={handleBuyProducts}
        disabled={isCreatingCheckoutSession}
      >
        Finalizar compra
      </Button>
    </ShoppingCartContainer>
  );
}
