import { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from './auth/AuthProvider';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useSWRImmutable from "swr/immutable";
import { UserType } from "../../types/Users";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useSWRImmutable('/api/users');

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  };

  const getUserName = (uid: string) => {
    const result = data?.users.find((user: UserType) => (
      user.uid === currentUser.uid
    ));
    return result?.name;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <>
              {getUserName(currentUser.uid)}
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;