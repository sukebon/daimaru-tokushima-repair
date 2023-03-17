import { useContext } from "react";
import { AuthContext } from '../auth/AuthProvider';
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import useSWRImmutable from "swr/immutable";
import { UserType } from "../../../types/UserType";
import HeaderMenu from "./HeaderMenu";
import { Box } from "@mantine/core";

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
    <Box sx={{ flexGrow: 1 }} top="0" >
      <Box color="secondary" sx={{ boxShadow: "none", bgcolor: "#fff" }}>
        <Box>



          {currentUser !== undefined && (
            <Box>
              {/* {getUserName(currentUser.uid)} */}
              <HeaderMenu />
            </Box>
          )}
        </Box>
      </Box>
    </Box >
  );
};

export default Header;