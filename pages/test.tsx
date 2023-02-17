import MetaTag from "@/components/MetaTag";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const test = () => {
    async function checkout({ lineItems }: { lineItems: any }) {
        //@ts-ignore
        let stripePromise = null;
      
        const getStripe = () => {
          //@ts-ignore
          if (!stripePromise) {
            //@ts-ignore
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
          }
          return stripePromise;
        };
      
        const stripe = await getStripe();
      
        await stripe.redirectToCheckout({
          mode: "payment",
          lineItems,
          successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: window.location.origin,
        });
      }
  return (
    <>
      <MetaTag
        title={"Test"}
        description={"Genera QR y pagina de individuo por cada foto subida"}
        url={undefined}
      />
      <div className="flex items-center justify-center">
        <section className="max-w-[600px]">
          <button
            onClick={() =>
              checkout({
                lineItems: [
                  {
                    price: "price_1MccPZLnjkIZscJt9WtZVj5f",
                    quantity: 1,
                  },
                ],
              })
            }
          >
            Compra
          </button>
        </section>
      </div>
    </>
  );
};

export default test;
