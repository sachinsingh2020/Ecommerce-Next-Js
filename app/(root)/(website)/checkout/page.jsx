"use client";
import WebsiteBreadcrumb from "@/components/Application/Website/WebsiteBreadcrumb";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { addIntoCart, clearCart } from "@/store/reducer/cartReducer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const breadCrumb = {
  title: "Checkout",
  links: [{ label: "Checkout" }],
};
export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cartStore);
  const [verifiedCartData, setVerifiedCartData] = useState([]);
  const { data: getVerifiedCartData } = useFetch(
    "/api/cart-verification",
    "POST",
    {
      data: cart.products,
    }
  );

  useEffect(() => {
    if (getVerifiedCartData && getVerifiedCartData.success) {
      const cartData = getVerifiedCartData.data;
      setVerifiedCartData(cartData);
      dispatch(clearCart());

      cartData.forEach((cartItem) => {
        dispatch(addIntoCart(cartItem));
      });
    }
  }, [getVerifiedCartData]);

  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumb} />
      {cart.count === 0 ? (
        <div className="w-screen h-[500px] flex  justify-center items-center py-32">
          <div className="text-center">
            <h4 className="text-4xl font-semibold mb-5">Your cart is empty!</h4>
            <Button type="button" asChild>
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32">
          <div className="lg:w-[70%] w-full"></div>
          <div className="lg:w-[30%] w-full">
            <div className="rounded bg-gray-50 p-5 sticky top-5">
              <h4 className="text-lg font-semibold mb-5">Order Summary</h4>
              <div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="font-medium">Subtotal</td>
                      <td className="text-end py-2"></td>
                    </tr>
                    <tr>
                      <td className="font-medium">Discount</td>
                      <td className="text-end py-2"></td>
                    </tr>
                    <tr>
                      <td className="font-medium">Total</td>
                      <td className="text-end py-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
