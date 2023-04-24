import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@src/lib/stripe";
import { ShoppingCartProduct } from "@src/@types/ShoppingCartProduct";

interface RequestBody {
  products: ShoppingCartProduct[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { products } = req.body as RequestBody;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!(products.length > 0)) {
    return res.status(400).json({ error: 'Products not found.' })
  }
  
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const lineItems = products.map(product => ({
    price: product.defaultPriceId,
    quantity: product.quantity
  }))

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}