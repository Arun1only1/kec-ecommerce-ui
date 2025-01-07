'use client';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import DeleteProductDialog from './DeleteProductDialog';
import { isSeller } from '../utils/check.role';
import { useRouter } from 'next/navigation';

const ProductCard = (props) => {
  const router = useRouter();
  const productId = props._id;
  return (
    <div className='w-[400px] shadow-2xl'>
      {/* TODO: manage overflow */}
      <Image
        src={
          props.image || '/book-composition-with-open-book_23-2147690555.avif'
        }
        height={400}
        width={400}
        alt='Book image'
      />
      <div className='flex flex-col gap-8 p-4'>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h5'>{props.name}</Typography>
          <Chip label={props.brand} color='success' variant='outlined' />
          <Typography variant='h5'>${props.price}</Typography>
        </Stack>

        <Typography sx={{ textAlign: 'justify', overflow: 'hidden' }}>
          {props.description}...
        </Typography>
        <Stack direction='row' justifyContent='space-between'>
          <Button
            fullWidth
            color='success'
            variant='contained'
            startIcon={<VisibilityOutlinedIcon />}
            onClick={() => {
              router.push(`/product/details/${productId}`);
            }}
          >
            View More
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ProductCard;
