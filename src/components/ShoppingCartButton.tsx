import { ButtonHTMLAttributes } from "react";
import { Handbag } from "@phosphor-icons/react";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { ShoppingCartButtonContainer } from "@src/styles/components/ShoppingCartButton";

interface ShoppingCartButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
  variant?: "default" | "header";
}

export function ShoppingCartButton({
  size = 32,
  variant = "default",
  ...rest
}: ShoppingCartButtonProps) {
  const itemsCount = useAppSelector((state) =>
    state.shoppingCart.products.reduce((acc, product) => {
      return (acc += product.quantity);
    }, 0)
  );

  const isShowItemsCount = variant === "header" && itemsCount > 0;

  return (
    <ShoppingCartButtonContainer
      type="button"
      data-items-count={itemsCount}
      variant={variant}
      isShowItemsCount={isShowItemsCount}
      {...rest}
    >
      <Handbag size={size} weight="bold" />
    </ShoppingCartButtonContainer>
  );
}
