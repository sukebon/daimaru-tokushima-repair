import type { AppProps } from "next/app";
import Layout from "@/conponents/Layout";
import { AuthProvider } from "@/conponents/auth/AuthProvider";
import { SWRConfig } from "swr";
import axios from "axios";
import '../styles/global.css';
import { MantineProvider } from '@mantine/core';
import Head from "next/head";

const fetcher = (url: string) => axios.get(url).then(res => res.data);



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>徳島修理伝票</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: 'light',
            }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProvider>
        </AuthProvider>
      </SWRConfig>
    </>
  );
}
