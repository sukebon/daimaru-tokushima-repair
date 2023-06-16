import { Box, createStyles, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

type Props = {
  close?: Function;
};

export const SidebarList: FC<Props> = ({ close }) => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const { colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';
  const data = [
    { link: '/repairs', label: '修理伝票一覧', icon: '' },
    { link: '/repairs/new', label: '修理伝票作成', icon: '' },
    { link: '/templates', label: 'テンプレート一覧', icon: '' },
    { link: '/templates/new', label: 'テンプレート作成', icon: '' },
    // { link: '/profile', label: 'プロフィール', icon: '' },
    { link: '/settings/auth', label: '管理画面', icon: '' },
    { link: '/settings/factories', label: '工場登録', icon: '' },
    { link: '/settings/customers', label: '顧客登録', icon: '' },
    { link: '/settings/categories', label: 'カテゴリー登録', icon: '' },
  ];

  return (
    <>
      {data.map((item, index) => (
        <Link key={index} href={item.link} style={{ textDecoration: 'none' }}>
          <Box
            onClick={close === undefined ? close : () => close()}
            className={cx(classes.link, {
              [classes.linkActive]: router.pathname === item.link,
            })}
            color={dark ? 'black' : 'white'}
          >
            <Box component="span">{item.label}</Box>
          </Box>
        </Link>
      ))}
    </>
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
