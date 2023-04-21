import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Flex } from '@mantine/core';
import { FC, useState } from 'react';
import { Factory } from '../../../types';
import { useMutateFactory } from '@/hooks/settings/useMutateFactory';

type Props = {
  factory: Omit<Factory, 'created_at' | 'updated_at'>;
};

export const EditFactoryModal: FC<Props> = ({ factory }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editFactory, setEditFactory] = useState({ ...factory });
  const { updateFactoryMutation } = useMutateFactory();

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} yOffset={200} zIndex={10000}>
        <Flex gap={6} align="end">
          <TextInput w="100%" label="工場名" value={editFactory.name} onChange={(e) => setEditFactory({ ...editFactory, name: e.target.value })} />
          <Button type="submit" onClick={() => { updateFactoryMutation.mutate(editFactory); close(); }}>登録</Button>
        </Flex>
      </Modal>

      <Group position="center">
        <Button onClick={open}>編集</Button>
      </Group>
    </>
  );
};
