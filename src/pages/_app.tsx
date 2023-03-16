import type { AppProps } from "next/app";
import Layout from "@/conponents/Layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "@/conponents/auth/AuthProvider";
import { SWRConfig } from "swr";
import axios from "axios";
import '../styles/global.css';
import { blue } from '@mui/material/colors';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const theme = createTheme({
  palette: {
    primary: {
      light: '#6573c3',
      main: "#3f51b5",
      dark: '#2c387e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#3f51b5',
      dark: '#ba000d',
      contrastText: '#000',
    },
    // background: { paper: 'rgb(5, 30, 52)' },

  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
