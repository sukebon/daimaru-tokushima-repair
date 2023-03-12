import { useState } from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DraftsIcon from '@mui/icons-material/Drafts';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Divider, Grid, Typography } from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Link from "next/link";
import ListItem from "./ListItem";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const LIST_BGCOLOR = 'rgb(5, 30, 52)';


  return (
    <Box height='100vh' position="sticky" top="0" sx={{ width: '100%', bgcolor: LIST_BGCOLOR, overflowY: 'auto' }}>
      <Grid container p={3} height="64px" alignItems="center" color="#fff">修理伝票アプリ</Grid>
      <Divider light sx={{ background: "rgba(255, 255, 255, 0.2)" }} />
      <List
        sx={{ bgcolor: LIST_BGCOLOR, color: "#fff" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ color: "rgba(255, 255, 255, 0.5)", bgcolor: LIST_BGCOLOR }}>
            メニュー
          </ListSubheader>
        }
      >
        <ListItem text="修理伝票一覧" href="/marks"><ListAltIcon /></ListItem>
        <ListItem text="修理伝票作成" href="/marks/new"><AddBoxIcon /></ListItem>
      </List>
      <List
        sx={{ bgcolor: LIST_BGCOLOR, color: "#fff" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ color: "rgba(255, 255, 255, 0.5)", bgcolor: LIST_BGCOLOR }}>

            登録
          </ListSubheader>
        }
      >
        <ListItem text="テンプレート一覧" href="/templates"><PermIdentityIcon /></ListItem>
        <ListItem text="テンプレート登録" href="/templates/new"><PermIdentityIcon /></ListItem>
      </List>
      <List
        sx={{ bgcolor: LIST_BGCOLOR, color: "#fff" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ color: "rgba(255, 255, 255, 0.5)", bgcolor: LIST_BGCOLOR }}>

            設定
          </ListSubheader>
        }
      >
        <ListItem text="ユーザー情報" href="/users"><PermIdentityIcon /></ListItem>
      </List>
    </Box >
  );
};

export default Sidebar;