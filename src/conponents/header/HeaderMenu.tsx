import { useRouter } from "next/router";
import React from 'react';
import { Button } from '@mantine/core';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import useStore from "../../../store";

const HeaderMenu = () => {
  const router = useRouter();
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
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export default HeaderMenu;