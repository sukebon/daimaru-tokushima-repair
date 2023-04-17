import { useRouter } from "next/router";
import React from 'react';
import { Button, ActionIcon, useMantineColorScheme } from '@mantine/core';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import useStore from "../../../store";
import { FaSun, FaRegMoon } from "react-icons/fa";

const HeaderMenu = () => {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      queryClient.removeQueries(['user']);
      await supabase.auth.signOut();
      await router.push('/login');
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <>
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <FaSun size="1.1rem" /> : <FaRegMoon size="1.1rem" />}
      </ActionIcon>
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export default HeaderMenu;