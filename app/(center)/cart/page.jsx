"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CartItemCard from "../../../components/CartItemCard";
import Loader from "../../../components/Loader";
import { getCartList } from "../../../lib/routes/cart.routes";
import CartEmpty from "../../../components/EmptyCart";

const CartPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cart-list"],
    queryFn: () => getCartList(),
  });

  const cartData = data?.data?.cartData;
  if (isPending) {
    return <Loader />;
  }

  if (cartData.length < 1) {
    return <CartEmpty />;
  }
  return (
    <div className=" flex  justify-center items-center flex-wrap gap-4 ">
      {cartData.map((item) => {
        return <CartItemCard key={item._id} {...item} />;
      })}
    </div>
  );
};

export default CartPage;
