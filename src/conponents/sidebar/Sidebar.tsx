import React, { useState } from 'react';
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Box,
  useMantineColorScheme,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { useMutateAuth } from '@/hooks/useMutateAuth';



const data = [
  { link: '/repairs', label: '修理伝票一覧', icon: '' },
  { link: '/repairs/new', label: '修理伝票作成', icon: '' },
  { link: '', label: 'テンプレート一覧', icon: '' },
  { link: '', label: 'テンプレート作成', icon: '' },
  { link: '/profile', label: 'プロフィール', icon: '' },
  { link: '/auth', label: '管理画面', icon: '' },
];

export const Sidebar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { logout } = useMutateAuth();

  const links = data.map((item) => (
    <Link key={item.label} href={item.link} style={{ textDecoration: 'none' }}>
      <Box
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        color={dark ? "black" : "white"}
        onClick={(e) => {
          setActive(item.label);
        }}
      >
        <Box component="span" >{item.label}</Box>
      </Box>
    </Link>
  ));

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
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer} >
        <Box className={classes.link} sx={{ cursor: 'pointer' }} onClick={() => logout()} >Logout</Box>
      </Navbar.Section>
    </Navbar>
  );
};


const useStyles = createStyles((theme) => ({
  navbar: {
    overflowY: 'auto',
  },

  header: {
    color: theme.colorScheme === "dark" ? "white" : "black",
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `0.0625rem solid ${theme.colorScheme === 'dark' ? '#2C2E33' : '#e9ecef'};`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `0.0625rem solid ${theme.colorScheme === 'dark' ? '#2C2E33' : '#e9ecef'};`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? "white" : "black",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 600,

    '&:hover': {
      // color: theme.colorScheme === "dark" ? "#12B886" : '#f4f4f4',
      // opacity: 0.9
    }
  },


  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      color: theme.colorScheme === "dark" ? "#12B886" : '#12B886',
      opacity: 0.9
    },
  },
}));