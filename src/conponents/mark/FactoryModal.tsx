import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import { MdList } from "react-icons/md";

export function FactoryModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} yOffset={100}>
        Modal without header, press escape or click on overlay to close
      </Modal>

      <Group position="center">
        <MdList height="100%" onClick={open} />
      </Group>
    </>
  );
}