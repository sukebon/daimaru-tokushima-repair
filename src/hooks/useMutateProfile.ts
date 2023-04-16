import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Profile } from '../../types';
import { supabase } from '../../utils/supabase';

export const useMutateProfile = () => {
  const queryClient = useQueryClient();

  const createProfileMutation = useMutation({
    mutationFn: async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(['profile'], data[0]);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (profile: Omit<Profile, 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id)
        .select();
      console.log(error);

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (res: any) => {
      queryClient.setQueryData(['profile'], res[0]);
    },
    onError: (err: any) => {
      alert(err.message);
    },
  });

  return { createProfileMutation, updateProfileMutation };
};
