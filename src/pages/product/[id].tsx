import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Stripe from "stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@src/styles/pages/product";
import { Button } from "@src/styles/components/Button";
import { stripe } from "@src/lib/stripe";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { addProduct } from "@src/store/shoppingCartSlice";
import { ProductType } from "@src/@types/Product";
import { formatCurrency } from "@src/utils/formatCurrency";

interface ProductTypePage extends ProductType {
  description: string;
  defaultPriceId: string;
}

interface ProductProps {
  product: ProductTypePage;
}

export default function Product({ product }: ProductProps) {
  const dispatch = useAppDispatch();

  async function handleAddProductInShoppingCart() {
    const { id, imageUrl, name, price, defaultPriceId } = product;
    dispatch(addProduct({ id, imageUrl, name, price, defaultPriceId }));
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={540} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatCurrency(product.price)}</span>
          <p>{product.description}</p>

          <Button onClick={handleAddProductInShoppingCart}>
            Colocar na sacola
          </Button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId || "", {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount || 0,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
