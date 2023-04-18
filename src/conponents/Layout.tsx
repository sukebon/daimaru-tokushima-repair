import { Box, Flex, useMantineColorScheme } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
// import { AuthContext } from "./auth/AuthProvider";
import Header from './header/Header';
import { Sidebar } from './sidebar/Sidebar';

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <>
      <Flex w="100%" h={{ base: '100vh', md: 'auto' }} bg={dark ? "#1A1B1E" : "#f4f4f4"}>
        {['/login', '/signup'].includes(router.pathname) ? (
          <Flex justify="center" align="center" w="100%" h="100vh" bg={dark ? "#1A1B1E" : "#f4f4f4"}>
            {children}
          </Flex>
        ) : (
          <>
            <Flex sx={{ display: 'none' }} display={{ md: 'block' }}>
              <Sidebar />
            </Flex>
            <Flex w="100%" direction="column" justify="start">
              <Header />
              <Flex p={24} >
                {children}
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default Layout;
