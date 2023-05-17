import React from 'react';
import useStore from '../../store';
import { useQueryProfile } from '@/hooks/useQueryProfile';
import { useMutateProfile } from '@/hooks/useMutateProfile';
import { useUploadAvatarImg } from '@/hooks/useUploadAvatarImg';
import { useDownloadUrl } from '@/hooks/useDownloadUrl';
import { Box, Button, Container, Image, Input } from '@mantine/core';
import { format } from 'date-fns';
import { Spinner } from './Spinner';
export const UserProfile = () => {
  const session = useStore((state) => state.session);
  const editedProfile = useStore((state) => state.editedProfile);
  const update = useStore((state) => state.updateEditedProfile);
  const { data: profile } = useQueryProfile();
  const { updateProfileMutation } = useMutateProfile();
  const { useMutateUploadAvatarImg } = useUploadAvatarImg();
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  );
  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user.id,
      username: editedProfile.username,
      email: editedProfile.email,
      favorites: editedProfile.favorites,
      avatar_url: editedProfile.avatar_url,
    });
  };
  return (
    <Container>
      <Box>{profile?.username}</Box>
      {profile?.created_at && (
        <Box>{format(new Date(profile.created_at), 'yyyy-MM-dd HH:mm:ss')}</Box>
      )}
      {profile?.updated_at && (
        <Box>{format(new Date(profile.updated_at), 'yyyy-MM-dd HH:mm:ss')}</Box>
      )}
      <Input
        value={editedProfile.username || ''}
        onChange={(e) => update({ ...editedProfile, username: e.target.value })}
      />
      <Input
        value={editedProfile.favorites || ''}
        onChange={(e) =>
          update({ ...editedProfile, favorites: e.target.value })
        }
      />
      <Button
        onClick={updateProfile}
        disabled={updateProfileMutation.isLoading || !editedProfile.username}
      >
        {updateProfileMutation.isLoading ? 'Loading...' : 'Update'}
      </Button>
      {avatarUrl && (
        <Image src={avatarUrl} alt="Avatar" width={150} height={150} />
      )}
      {isLoading && <Spinner />}
      <Box>
        <input
          type="file"
          placeholder="avatar"
          accept="image/*"
          onChange={(e) => useMutateUploadAvatarImg.mutate(e)}
        />
      </Box>
    </Container>
  );
};
