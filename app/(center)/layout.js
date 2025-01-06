export const metadata = {
  title: 'Add And Edit Product',
  description: 'Login and register page',
};

const CenterLayout = ({ children }) => {
  return (
    <div className='h-screen w-full flex gap-8  justify-center items-center'>
      {children}
    </div>
  );
};

export default CenterLayout;
