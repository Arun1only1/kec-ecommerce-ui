'use client';
import $axios from '@/lib/axios/axios.instance';
import React, { useEffect } from 'react';

const SellerList = () => {
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await $axios.post('/product/seller/list', {
          page: 1,
          limit: 10,
        });
        console.log(res);
      } catch (error) {
        console.log('error aayo');
      }
    };

    getProducts();
  }, []);

  return <div>SellerList</div>;
};

export default SellerList;
