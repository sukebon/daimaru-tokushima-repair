import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, TextInput, Flex } from '@mantine/core';
import { FC } from 'react';
import { Factory } from '../../../types';
import { useMutateFactory } from '@/hooks/settings/useMutateFactory';
import { FaEdit } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';

type Props = {
  factory: Omit<Factory, 'created_at' | 'updated_at'>;
};

export const EditFactoryModal: FC<Props> = ({ factory }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { updateFactoryMutation } = useMutateFactory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Factory>({
    defaultValues: {
      ...factory,
    },
  });

  const onSubmit: SubmitHandler<Factory> = (data) => {
    const result = window.confirm('更新して宜しいでしょうか');
    if (!result) return;
    updateFactoryMutation.mutate(data);
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close(), reset();
        }}
        title="編集"
        yOffset={200}
        zIndex={10000}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={6} align="end">
            <TextInput w="100%" label="工場名" {...register('name')} />
            <Button type="submit" color="teal">
              更新
            </Button>
          </Flex>
        </form>
      </Modal>

      <Group position="center">
        <FaEdit cursor="pointer" onClick={open}>
          編集
        </FaEdit>
      </Group>
    </>
  );
};
