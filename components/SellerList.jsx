'use client';
import $axios from '@/lib/axios/axios.instance';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import ProductCard from './ProductCard';

const SellerList = () => {
  const [productList, setProductList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getSellerProduct = async () => {
      try {
        setIsPending(true);
        const res = await $axios.post('/product/seller/list', {
          page: page,
          limit: 2,
        });

        setIsPending(false);

        setProductList(res?.data?.productList);

        console.log(productList);
      } catch (error) {
        setError('Something went wrong.');
        setIsPending(false);
      }
    };

    getSellerProduct();
  }, [page]);

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className='flex flex-col justify-between items-center gap-8  '>
      <div className='flex justify-center items-center gap-8 flex-wrap'>
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </div>

      <Pagination
        page={page}
        count={5}
        color='secondary'
        className='my-12'
        size='large'
        onChange={(_, value) => {
          setPage(value);
        }}
      />
    </div>
  );
};

export default SellerList;
