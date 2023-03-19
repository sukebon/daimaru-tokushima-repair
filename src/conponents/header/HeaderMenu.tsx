import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';


const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout } = useAuth();



  return (
    <>
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export default HeaderMenu;