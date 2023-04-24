import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "@src/lib/stripe";
import { ImagesContainer, SuccessContainer } from "@src/styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    images: string[];
    quantity: number;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const totalProducts = products.reduce((acc, product) => {
    return (acc += product.quantity);
  }, 0);

  let message = "";

  if (totalProducts === 1) {
    message = `seu produto, <strong>${products[0].name}</strong> já estão a caminho da sua casa.`;
  } else {
    message = `seus <strong>${totalProducts} produtos</strong> já estão a caminho da sua casa.`;
  }

  return (
    <>
      <Head>
        <title>Success | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImagesContainer>
          {products.map((product) => (
            <div key={product.id}>
              <Image src={product.images[0]} width={120} height={110} alt="" />
            </div>
          ))}
        </ImagesContainer>

        <p
          dangerouslySetInnerHTML={{
            __html: `Uhuul <strong>${customerName}</strong>, ${message}`,
          }}
        />

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  console.log(session.line_items?.data);
  const customerName = session.customer_details?.name;
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;

    return {
      ...product,
      quantity: item.quantity,
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
