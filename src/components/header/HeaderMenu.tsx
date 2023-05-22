import React from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaSun, FaRegMoon } from "react-icons/fa";

const HeaderMenu = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <>
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'dark'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <FaSun size="1.1rem" /> : <FaRegMoon size="1.1rem" />}
      </ActionIcon>
    </>
  );
};

export default HeaderMenu;