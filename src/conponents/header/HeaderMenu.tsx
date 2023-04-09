import { useRouter } from "next/router";
import React from 'react';
import { Button } from '@mantine/core';
import axios from 'axios';
import { useQueryClient } from "@tanstack/react-query";

const HeaderMenu = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      queryClient.removeQueries(['user']);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      router.push('/login');
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