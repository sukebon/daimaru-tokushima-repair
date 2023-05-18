import { useDisclosure } from '@mantine/hooks';
import {
  Drawer,
  Button,
  Group,
  Box,
  Text,
  getStylesRef,
  createStyles,
  useMantineColorScheme,
} from '@mantine/core';
import { FaHamburger } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SidebarList } from './SidebarList';

export const SidebarDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Drawer
        opened={opened}
        onClose={close}
        title="修理伝票"
        size="xs"
        zIndex={1000}
      >
        <SidebarList close={close} />
      </Drawer>
      <Group position="center">
        <FaHamburger cursor="pointer" onClick={open} />
      </Group>
    </Box>
  );
};
