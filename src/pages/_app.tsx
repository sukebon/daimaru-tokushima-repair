import { useEffect } from 'react';
import type { AppProps } from "next/app";
import Layout from "@/conponents/Layout";
import axios from "axios";
import { MantineProvider } from '@mantine/core';
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});


export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true; //front back でcookieのやり取りに必要

  return (
    <>
      <Head>
        <title>徳島修理伝票</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
            fontFamily: 'Verdana, sans-serif'
          }}>

          <Layout>
            <Component {...pageProps} />
          </Layout>

        </MantineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
