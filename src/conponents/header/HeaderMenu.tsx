import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Button } from '@mantine/core';

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  };
  return (
    <>


      <Button onClick={
        () => {
          handleClose();
          logout();
        }}>Logout</Button>




    </>
  );
};

export default HeaderMenu;