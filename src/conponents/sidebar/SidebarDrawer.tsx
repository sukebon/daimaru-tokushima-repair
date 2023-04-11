import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Group, Box, Text } from '@mantine/core';
import { FaHamburger } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const SidebarDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const data = [
    { link: '/repairs', label: '修理伝票一覧', icon: '' },
    { link: '/repairs/new', label: '修理伝票作成', icon: '' },
    { link: '', label: 'テンプレート一覧', icon: '' },
    { link: '', label: 'テンプレート作成', icon: '' },
  ];
  const links = data.map((item) => (
    <Link
      key={item.link}
      href={item.link}
      onClick={close}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <Text color="black" p={9} size="sm">
        {item.label}
      </Text>
    </Link>
  ));
  return (
    <Box>
      <Drawer
        opened={opened}
        onClose={close}
        title="修理伝票"
        size="xs"
        zIndex={1000}
      >
        {links}
      </Drawer>

      <Group position="center">
        <FaHamburger cursor="pointer" onClick={open} />
      </Group>
    </Box>
  );
};
