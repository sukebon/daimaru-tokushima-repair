import { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../auth/AuthProvider';
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import useSWRImmutable from "swr/immutable";
import { UserType } from "../../../types/UserType";
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useSWRImmutable('/api/users');

  const getUserName = (uid: string) => {
    const result = data?.users.find((user: UserType) => (
      user.uid === currentUser.uid
    ));
    return result?.name;
  };

  return (
    <Box sx={{ flexGrow: 1 }} position="sticky" top="0" zIndex={100}>
      <AppBar position="static" color="secondary" sx={{ boxShadow: "none", bgcolor: "#fff" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>

          {currentUser !== undefined && (
            <Box textAlign="right">
              {/* {getUserName(currentUser.uid)} */}
              <HeaderMenu />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box >
  );
};

export default Header;