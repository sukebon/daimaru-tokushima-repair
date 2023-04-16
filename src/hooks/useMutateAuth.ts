import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/router';

export const useMutateAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation(
    async (params: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  const registerMutation = useMutation(
    async (params: { email: string; password: string }) => {
      const { error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
      });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );
  return {
    loginMutation,
    registerMutation,
  };
};
