import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  KeenSliderHooks,
  KeenSliderInstance,
  useKeenSlider,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Stripe from "stripe";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { HomeContainer, Product, SliderControl } from "@src/styles/pages/home";
import { stripe } from "@src/lib/stripe";
import { ProductType } from "@src/@types/Product";
import { formatCurrency } from "@src/utils/formatCurrency";
import { addProduct } from "@src/store/shoppingCartSlice";
import { ShoppingCartButton } from "@src/components/ShoppingCartButton";

interface HomeProps {
  products: ProductType[];
}

export default function Home({ products }: HomeProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [controlsVisibility, setControlsVisibility] = useState({
    left: false,
    right: false,
  });

  function controlVisibilityOfSliderControls(
    slider: KeenSliderInstance<{}, {}, KeenSliderHooks>
  ) {
    const activeItemIndex = slider.track.details.abs;
    const maxIndex = slider.track.details.maxIdx;
    const minIndex = slider.track.details.minIdx;

    if (activeItemIndex === minIndex) {
      setControlsVisibility({ left: false, right: true });
      return;
    }

    if (activeItemIndex === maxIndex) {
      setControlsVisibility({ left: true, right: false });
      return;
    }

    if (activeItemIndex > minIndex && activeItemIndex < maxIndex) {
      setControlsVisibility({ left: true, right: true });
      return;
    }
  }

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
    created: controlVisibilityOfSliderControls,
    slideChanged: controlVisibilityOfSliderControls,
  });

  function handleMoveSlideToLeft() {
    instanceRef.current?.prev();
  }

  function handleMoveSlideToRight() {
    instanceRef.current?.next();
  }

  function handleProductCardClicked(productId: ProductType["id"]) {
    return function () {
      router.push(`/product/${productId}`);
    };
  }

  function handleAddProductInShoppingCart(product: ProductType) {
    return function (event: MouseEvent<HTMLButtonElement>) {
      event.stopPropagation();
      dispatch(addProduct(product));
    };
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {controlsVisibility.left && (
          <SliderControl
            type="button"
            side="left"
            onClick={handleMoveSlideToLeft}
          >
            <CaretLeft size={48} />
          </SliderControl>
        )}

        {products.map((product) => {
          return (
            <Product
              key={product.id}
              tabIndex={0}
              role="button"
              aria-pressed="false"
              className="keen-slider__slide"
              onClick={handleProductCardClicked(product.id)}
            >
              <Image src={product.imageUrl} alt="" width={520} height={480} />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>

                <ShoppingCartButton
                  onClick={handleAddProductInShoppingCart(product)}
                />
              </footer>
            </Product>
          );
        })}

        {controlsVisibility.right && (
          <SliderControl
            type="button"
            side="right"
            onClick={handleMoveSlideToRight}
          >
            <CaretRight size={48} />
          </SliderControl>
        )}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount || 0,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
