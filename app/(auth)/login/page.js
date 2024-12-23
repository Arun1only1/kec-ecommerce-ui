'use client';

import { loginUserValidationSchema } from '@/validation-schema/login.user.validation.schema';
import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const handleSubmit = async (values) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8080/user/login',
        data: values,
      });

      window.localStorage.setItem('token', response?.data?.accessToken);
      window.localStorage.setItem(
        'firstName',
        response?.data?.userDetails?.firstName
      );

      window.localStorage.setItem(
        'userRole',
        response?.data?.userDetails?.role
      );

      router.push('/');
    } catch (error) {
      console.log('error aayo');
    }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginUserValidationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            className='flex flex-col justify-between items-center w-[400px] shadow-2xl
              shadow-slate-500 px-8 py-4 min-h-[400px] rounded-md'
          >
            <p className='text-3xl font-bold'>Sign in</p>
            {/* email */}
            <FormControl fullWidth>
              <TextField label='Email' {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              ) : null}
            </FormControl>

            {/* password */}
            <FormControl fullWidth>
              <TextField
                label='Password'
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>

            <div className='w-full flex flex-col justify-center items-center'>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='secondary'
              >
                login
              </Button>

              <Link
                href='/register'
                className='text-md underline text-blue-600 mt-2'
              >
                New here? Register
              </Link>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default Login;
