import { Flex, useMantineColorScheme } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
// import { AuthContext } from "./auth/AuthProvider";
import Header from './header/Header';

type Props = {
  children: ReactNode;
};

export const LayoutOneCol: NextPage<Props> = ({ children }) => {
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <>
      <Flex
        w="100%"
        h={{ base: '100vh', lg: 'auto' }}
        bg={dark ? '#1A1B1E' : '#f4f4f4'}
      >
        <Flex w="100%" direction="column" justify="start">
          <Header />
          <Flex p={24}>{children}</Flex>
        </Flex>
      </Flex>
    </>
  );
};

