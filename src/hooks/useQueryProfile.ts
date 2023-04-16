import useStore from '../../store';
import { useMutateProfile } from './useMutateProfile';
import { supabase } from '../../utils/supabase';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '../../types';

export const useQueryProfile = () => {
  const session = useStore((state) => state.session);
  const editedProfile = useStore((state) => state.editedProfile);
  const update = useStore((state) => state.updateEditedProfile);
  const { createProfileMutation, updateProfileMutation } = useMutateProfile();

  const getProfile = async () => {
    const { data, error, status } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user?.id);

    console.log(data, error, status);
    if (data?.length === 0) {
      createProfileMutation.mutate({
        id: session?.user?.id,
        username: session?.user?.email,
        email: session?.user.email,
        favorites: '',
        avatar_url: '',
      });
      update({
        ...editedProfile,
        username: session?.user?.email,
      });
    }
    if (error && status !== 406) {
      throw error.message;
    }
    return data;
  };

  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    onSuccess: (data: Profile) => {
      if (data) {
        update({
          username: data.username,
          email: data.email,
          favorites: data.favorites,
          avatar_url: data.avatar_url,
        });
      }
    },
  });
};
