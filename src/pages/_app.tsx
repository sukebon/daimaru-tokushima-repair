import type { AppProps } from "next/app";
import Layout from "@/conponents/Layout";

import { createTheme } from "@mui/material/styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
