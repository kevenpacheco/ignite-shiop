import Image from "next/image";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";
import { globalStyles } from "../styles/global";
import { Container, Header } from "@src/styles/pages/app";
import { store } from "@src/store";
import { ShoppingCartButton } from "@src/components/ShoppingCartButton";
import { ShoppingCart } from "@src/components/ShoppingCart";
import logoImg from "@src/assets/logo.svg";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [isVisibleShoppingCart, setIsVisibleShoppingCart] = useState(false);

  function toggleShoppingCartVisible() {
    setIsVisibleShoppingCart((prevState) => !prevState);
  }

  return (
    <Provider store={store}>
      <Container>
        <Header>
          <Image src={logoImg} alt="" />

          <ShoppingCartButton
            size={24}
            variant="header"
            onClick={toggleShoppingCartVisible}
          />
        </Header>

        <ShoppingCart
          isVisible={isVisibleShoppingCart}
          onClose={toggleShoppingCartVisible}
        />

        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}
