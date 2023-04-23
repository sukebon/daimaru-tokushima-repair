import { useMutation } from '@tanstack/react-query';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

export const useMutateAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const { error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
      });
      if (error) throw new Error(error.message);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const { error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
      });
      if (error) throw new Error(error.message);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      queryClient.removeQueries(['user']);
      await router.push('/login');
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    loginMutation,
    registerMutation,
    logout,
  };
};
