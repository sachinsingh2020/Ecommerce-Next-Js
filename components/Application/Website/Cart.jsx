"use client";
import { BsCart2 } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((store) => store.cartStore);
  return (
    <Sheet>
      <SheetTrigger className={"relative"}>
        <BsCart2 size={25} className="text-gray-500 hover:text-primary" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={"text-2xl"}>My Cart</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100vh-40px)] pb-10 pt-2">
          <div className="h-[calc(100%-128px)] overflow-auto pe-2">
            {cart.count === 0 && (
              <div className="h-full flex justify-center items-center text-xl font-semibold">
                Your cart is empty
              </div>
            )}
            {cart.products?.map((product) => (
              <div
                key={product.variantId}
                className="flex justify-between items-center gap-5 mb-4 border-b pb-4"
              ></div>
            ))}
          </div>
          <div className="h-32 border-t pt-5"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
