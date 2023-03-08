import { Box } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode[];
};

const Layout: NextPage<Props> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname !== '/login' &&
        <>
          <Sidebar />
          <Header />
        </>}
      <Box >
        {children}
      </Box>
    </>
  );
};

export default Layout;