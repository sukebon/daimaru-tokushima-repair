import { Box, Flex } from "@mantine/core";
import { NextPage } from "next";
import React, { ReactNode, useContext, useEffect, useState } from "react";
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
      {currentUser !== undefined ? (
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
      )}
    </>
  );
};

export default Layout;;;
