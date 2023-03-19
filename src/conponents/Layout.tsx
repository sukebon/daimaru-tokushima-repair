import { Box, Flex } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useContext } from "react";
import { AuthContext } from "./auth/AuthProvider";
import Header from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser?.uid);
  return (
    <>
      {currentUser?.uid !== undefined ? (
        <Flex w="100%" bg="#f4f4f4" >
          <Flex sx={{ display: "none" }} display={{ lg: "block" }}>
            <Sidebar />
          </Flex>
          <Flex w="100%" direction="column" justify="start">
            <Header />
            <Flex p={24} bg="#f4f4f4">{children}</Flex>
          </Flex>
        </Flex>
      ) : (
        <Box>{children}</Box>
      )
      }
    </>
  );
};

export default Layout;;;
