import { Handbag } from "@phosphor-icons/react";
import { ShoppingCartButtonContainer } from "@src/styles/components/ShoppingCartButton";

interface ShoppingCartButtonProps {
  size: number;
  variant?: "default" | "secondary";
  itemsCount?: number;
}

export function ShoppingCartButton({
  size = 32,
  variant = "default",
  itemsCount = 0,
}: ShoppingCartButtonProps) {
  return (
    <ShoppingCartButtonContainer
      type="button"
      data-items-count={itemsCount}
      variant={variant}
      showItemsCount={itemsCount > 0}
    >
      <Handbag size={size} weight="bold" />
    </ShoppingCartButtonContainer>
  )
}