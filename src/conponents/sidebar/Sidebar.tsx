import React, { useState } from 'react';
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import { useRouter } from 'next/router';
import { SidebarList } from './SidebarList';

const data = [
  { link: '/repairs', label: '修理伝票一覧', icon: '' },
  { link: '/repairs/new', label: '修理伝票作成', icon: '' },
  // { link: '/templates', label: 'テンプレート一覧', icon: '' },
  // { link: 'templates/new', label: 'テンプレート作成', icon: '' },
  // { link: '/profile', label: 'プロフィール', icon: '' },
  { link: '/settings/auth', label: '管理画面', icon: '' },
  { link: '/settings/factories', label: '工場登録', icon: '' },
];

export const Sidebar = () => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { logout } = useMutateAuth();

  return (
    <Navbar
      sx={{ position: 'sticky', top: 0 }}
      height={'100vh'}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          修理伝票
        </Group>
        <SidebarList />
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Box
          className={classes.link}
          sx={{ cursor: 'pointer' }}
          onClick={() => logout()}
        >
          Logout
        </Box>
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  navbar: {
    overflowY: 'auto',
  },

  header: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `0.0625rem solid ${
      theme.colorScheme === 'dark' ? '#2C2E33' : '#e9ecef'
    };`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `0.0625rem solid ${
      theme.colorScheme === 'dark' ? '#2C2E33' : '#e9ecef'
    };`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 600,
  },

  linkActive: {
    '&, &:active': {
      color: '#12B886',
      opacity: 0.9,
    },
  },
}));
