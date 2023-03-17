import { Box, Flex } from "@mantine/core";
import { NextPage } from "next";
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
  return (
    <>
      {currentUser ? (
        <Flex w="100%" h="100vh" justify="space-between" bg="#f4f4f4">
          <Flex justify="left" display={{ xs: "none", lg: "block" }}>
            <Sidebar />
          </Flex>
          <Flex >
            <Box>
              <Header />
              <Box p={6} bg="#f4f4f4">{children}</Box>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
};

export default Layout;;;
