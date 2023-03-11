import { useState } from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Box, Divider, Grid, Typography } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Link from "next/link";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const ListBgcolor = 'rgb(5, 30, 52)';

  return (
    <Box height='100vh' sx={{ width: '100%', bgcolor: ListBgcolor, overflowY: 'auto' }}>
      <Grid container p={3} height="64px" alignItems="center" color="#fff">修理伝票アプリ</Grid>
      <Divider light sx={{ background: "rgba(255, 255, 255, 0.2)" }} />
      <List
        sx={{ bgcolor: ListBgcolor, color: "#fff" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ color: "rgba(255, 255, 255, 0.5)", bgcolor: ListBgcolor }}>
            メニュー
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="修理伝票一覧" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="修理伝票作成" />
        </ListItemButton>
      </List>
      <List
        sx={{ bgcolor: ListBgcolor, color: "#fff" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ color: "rgba(255, 255, 255, 0.5)", bgcolor: ListBgcolor }}>

            設定
          </ListSubheader>
        }
      >
        <Link href="/users">
          <ListItemButton>
            <ListItemIcon>
              <PermIdentityIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="ユーザー情報" />
          </ListItemButton>
        </Link>
      </List>
    </Box >
  );
};

export default Sidebar;