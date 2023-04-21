import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, Box, Input, Flex } from '@mantine/core';
import { FC } from 'react';
import { FaListAlt } from "react-icons/fa";

type Props = {
  factory: { id: string, name: string; };
  setFactory: (payload: { id: string, name: string; }) => void;
};

export const FactoryModal: FC<Props> = ({ factory, setFactory }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const array = [
    { id: "1", name: '徳島工場' },
    { id: "2", name: '高田屋刺繍' },
    { id: "3", name: '船越刺繍' }
  ];

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        yOffset={100}
      >
        <Flex gap={6}>
          {array?.map((value) => (
            <Button color='teal' key={value.id} onClick={() => { setFactory({ id: value.id, name: value.name }); close(); }}>{value.name}</Button>
          ))}
        </Flex>
      </Modal>
      <FaListAlt cursor="pointer" fontSize={37} color="gray" onClick={open} />
    </>
  );
};
