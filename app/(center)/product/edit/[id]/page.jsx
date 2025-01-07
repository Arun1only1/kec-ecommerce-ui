'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import $axios from '../../../../../lib/axios/axios.instance';
import { useQuery } from '@tanstack/react-query';

const EditProductPage = () => {
  const params = useParams();
  const productId = params?.id;

  const { data } = useQuery({
    queryKey: ['get-product-detail'],
    queryFn: async () => {
      return await $axios.get(`/product/detail/${productId}`);
    },
  });

  const productDetail = data?.data?.productDetail;
  console.log(productDetail);
  return <div>EditProduct</div>;
};

export default EditProductPage;
