import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Flex, TextInput, Box, ScrollArea, Drawer } from '@mantine/core';
import { FC } from 'react';
import { useQueryFactories } from '@/hooks/settings/useQueryFactories';

type Props = {
  factory: { id: string, name: string; };
  setFactory: (payload: { id: string, name: string; }) => void;
};

export const FactoryModal: FC<Props> = ({ factory, setFactory }) => {
  const { data: factories } = useQueryFactories();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        yOffset={100}
        size="lg"
        zIndex={10000}
        lockScroll={true}
      >
        <Flex gap={6} direction="row" wrap="wrap">
          {factories?.map((value) => (
            <Box key={value?.id} >
              <Button color='teal' onClick={() => { setFactory({ id: value.id, name: value.name }); close(); }}>{value.name}</Button>
            </Box>
          ))}
        </Flex>
      </Modal>
      <TextInput
        style={{ cursor: 'pointer' }}
        w="100%"
        label="加工場"
        required
        readOnly
        onClick={open}
        onChange={(e) => setFactory({ ...factory, name: e.target.value })}
        value={factory.name}
        sx={{}}
      />

    </>
  );
};
