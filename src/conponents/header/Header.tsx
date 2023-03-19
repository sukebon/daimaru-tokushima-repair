import { useContext } from "react";
import { AuthContext } from '../auth/AuthProvider';
import useSWRImmutable from "swr/immutable";
import { UserType } from "../../../types/UserType";
import HeaderMenu from "./HeaderMenu";
import { Header, Box, Burger, createStyles, Group, rem, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));




const HeaderArea = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { currentUser } = useContext(AuthContext);
  const { data } = useSWRImmutable('/api/users');

  const getUserName = (uid: string) => {
    const result = data?.users.find((user: UserType) => (
      user.uid === currentUser.uid
    ));
    return result?.name;
  };

  return (
    <Header w="100%" height={56} className={classes.header} >
      <div className={classes.inner}>
        <Group>
          <Flex display={{ lg: "none" }} gap={2}>
            <Burger opened={opened} onClick={toggle} size="sm" />
          </Flex>
          <Box sx={{ display: "none" }} display={{ lg: "block" }}>
            {/* {getUserName(currentUser.uid)} */}
          </Box>
        </Group>
        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {/* {currentUser !== undefined && ( */}
            <>
              <HeaderMenu />
            </>
            {/* )} */}
          </Group>
        </Group>
      </div>
    </Header>

  );
};

export default HeaderArea;