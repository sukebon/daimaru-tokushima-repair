/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useStore from '../../store';
import { useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@mantine/hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const setSession = useStore((state) => state.setSession);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) router.push('/');
      if (!session && router.pathname === '/signup') {
        router.push('/signup');
      } else if (!session) {
        router.push('/login');
      }
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') setSession(session);
        if (event === 'SIGNED_OUT') setSession(null);
      });
    };
    getSession();
  }, [setSession]);

  return (
    <>
      <Head>
        <title>徳島修理伝票</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
              fontFamily: 'Verdana, sans-serif',
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
