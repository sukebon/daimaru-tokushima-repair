import React, { useState } from 'react';
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Box,
} from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  navbar: {
    overflowY: 'auto',
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: "gray" })
        .background!,
      0.1
    )}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: "gray" })
        .background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.fontSizes.sm,
    color: theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten('#f4f4f4', 0.1)
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
      backgroundColor: theme.fn.lighten('#f4f4f4', 0.1),
      [`& .${getStylesRef('icon')}`]: {
        opacity: 0.9,
      },
    },
  },
}));

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

  const links = data.map((item) => (
    <Link key={item.label} href={item.link} style={{ textDecoration: 'none' }}>
      <Box
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}
        onClick={(e) => {
          setActive(item.label);
        }}
      >
        <Box component="span">{item.label}</Box>
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

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} >
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};
