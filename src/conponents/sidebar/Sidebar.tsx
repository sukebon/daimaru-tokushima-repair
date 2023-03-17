import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    overflowY: "auto"
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1
    )}`,
    color: theme.white
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.15
      ),
      [`& .${getStylesRef('icon')}`]: {
        opacity: 0.9,
      },
    },
  },
}));

const data = [
  { link: '', label: '修理伝票一覧', icon: "" },
  { link: '', label: '修理伝票作成', icon: "" },
  { link: '', label: 'テンプレート一覧', icon: "" },
  { link: '', label: 'テンプレート作成', icon: "" },
  { link: '', label: 'Databases', icon: "" },
  { link: '', label: 'Authentication', icon: "" },
  { link: '', label: 'Other Settings', icon: "" },
];

export const Sidebar = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar height={"100vh"} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          修理伝票
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Change account</span>
        </a>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};