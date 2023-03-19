import type { AppProps } from "next/app";
import Layout from "@/conponents/Layout";
import { AuthProvider } from "@/conponents/auth/AuthProvider";
import { SWRConfig } from "swr";
import axios from "axios";
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
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}>
        <AuthProvider>
          <SWRConfig value={{ fetcher }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}
