import React, { ReactNode } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { blue } from '@mui/material/colors';

type Props = {
  children: ReactNode;
  text: string;
  href?: string;
};

const ListItem: NextPage<Props> = ({ children, text, href = "" }) => {
  const router = useRouter();
  return (
    <Link href={href} >
      <ListItemButton >
        <ListItemIcon sx={router.pathname === href ? { color: blue[300] } : { color: "#fff" }}>
          {children}
        </ListItemIcon>
        <ListItemText primary={text} sx={router.pathname === href ? { color: blue[300] } : { color: "#fff" }} />
      </ListItemButton>
    </Link>
  );
};

export default ListItem;