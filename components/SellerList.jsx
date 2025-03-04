"use client";
import $axios from "../lib/axios/axios.instance";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { isSeller } from "../utils/check.role";

const SellerList = () => {
  const [page, setPage] = useState(1);

  const { isPending, data, error } = useQuery({
    queryKey: ["seller-product-list", page],
    queryFn: async () => {
      return await $axios.post("/product/seller/list", {
        page: page,
        limit: 9,
      });
    },
    enabled: isSeller(),
  });
  const productList = data?.data?.productList;

  if (isPending) {
    return <Loader isPending />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="flex flex-col justify-between items-center gap-8  ">
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>

      <Pagination
        page={page}
        count={5}
        color="secondary"
        className="my-12"
        size="large"
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </div>
  );
};

export default SellerList;
