import { Box, createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { display } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ReactNode, useContext } from "react";
import { AuthContext } from "./auth/AuthProvider";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  return (
    <>
      {currentUser ? (
        <Grid container height="100vh" justifyContent="space-between" bgcolor="#f4f4f4">
          <Grid item xs={0} lg={2} display={{ xs: "none", lg: "block" }}>        <Sidebar />
          </Grid>
          <Grid item xs={12} lg={10}>
            <Box >
              <Header />
              <Box p={6}>{children}</Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
};

export default Layout;
