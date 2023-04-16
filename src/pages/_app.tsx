import Image from 'next/image'
import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "@src/assets/logo.svg";
import { Container, Header } from "@src/styles/pages/app";
import { ShoppingCartButton } from '@src/components/ShoppingCartButton';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />

        <ShoppingCartButton size={24} variant="secondary" itemsCount={0} />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
