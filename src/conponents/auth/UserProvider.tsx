import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "../../../firebase";
import Loading from "../Loading";
import { AuthContext } from "./AuthProvider";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
export type User = any;

type UserContextProps = {
  currentUser: User | null | undefined;
  signInCheck: boolean;
};

const UserContext = createContext<UserContextProps>({
  currentUser: undefined,
  signInCheck: false,
});

type Props = {
  children: ReactNode;
};

const UserProvider: NextPage<Props> = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  // const [currentUser, setCurrentUser] =
  //   useState<User | null | undefined>(undefined);

  const [signInCheck, setSignInCheck] = useState(false);


  useEffect(() => {
    if (currentUser.uid) {
      const docRef = doc(db, "users", `${currentUser.uid}`);
      const addUsers = async () => {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            uid: currentUser.uid,
            name: currentUser?.email || "",
            rank: 1000,
            email: currentUser?.email || "",
          });
        }
        return;
      };
      addUsers();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (signInCheck) {
    return (
      <UserContext.Provider value={{ currentUser, signInCheck }}>
        {children}
      </UserContext.Provider>
    );
  } else {
    // ログイン確認中
    // 自分で作ったローディングコンポーネントをレンダリングする

    return <Loading />;
  }
};

export { UserContext, UserProvider };
