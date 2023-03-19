import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "../../../firebase";
import Loading from "../Loading";
export type User = any;

type AuthContextProps = {
  currentUser: User | null | undefined;
  signInCheck: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  signInCheck: false,
});

type Props = {
  children: ReactNode;
};

const AuthProvider: NextPage<Props> = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] =
    useState<User | null | undefined>(undefined);

  const [signInCheck, setSignInCheck] = useState(false);

  // // ログイン状態を確認する
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setSignInCheck(true);
        router.push('/');
      } else {
        setCurrentUser(undefined);
        setSignInCheck(true);
        router.push('/signin');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (signInCheck) {
    return (
      <AuthContext.Provider value={{ currentUser, signInCheck }}>
        {children}
      </AuthContext.Provider>
    );
  } else {
    // ログイン確認中
    // 自分で作ったローディングコンポーネントをレンダリングする

    return <Loading />;
  }
};

export { AuthContext, AuthProvider };
