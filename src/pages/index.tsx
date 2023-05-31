import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useQueryRepairs } from '@/hooks/repairs/useQueryRepairs';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

type Factory = {
  created_at: string | null;
  id: string;
  name: string;
  updated_at: string | null;
}[] | null;


export default function Home() {

  const [hello, setHello] = useState<Factory>();
  useEffect(() => {
    const getHelloWorld = async () => {
      const { data } = await supabase.rpc('get_factories');
      setHello(data);
    };
    getHelloWorld();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>

      </div>
    </Layout>
  );
}
