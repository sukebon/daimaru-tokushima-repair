import React from 'react';
import {
  createStyles,
  Navbar,
  Group,
  Box,
} from '@mantine/core';
import { useMutateAuth } from '@/hooks/useMutateAuth';
import { SidebarList } from './SidebarList';

export const Sidebar = () => {
  const { classes, cx } = useStyles();
  const { logout } = useMutateAuth();

  return (
    <Navbar
      sx={{ position: 'sticky', top: 0 }}
      height={'100vh'}
      width={{ sm: 200 }}
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
