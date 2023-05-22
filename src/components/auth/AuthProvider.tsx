import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../../../utils/supabase";
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
  const { push, pathname } = useRouter();
  const [currentUser, setCurrentUser] =
    useState<User | null | undefined>(undefined);

  const [signInCheck, setSignInCheck] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      setSignInCheck(true);
      const { data } = await supabase.auth.getUser();
      console.log(data.user);
      if (data.user) {
        setCurrentUser(data.user);
      } else if (data.user && pathname === "/signin") {
        push('/');
      } else if (!data.user) {
        setCurrentUser(undefined);
        push('/signin');
      }
    };
    validateSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // // ログイン状態を確認する
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      const { data } = await supabase.auth.getUser();
      if (event === "SIGNED_IN") {
        setSignInCheck(true);
        setCurrentUser(data.user);
        push('/');
      }
      if (event === "SIGNED_OUT") {
        setSignInCheck(true);
        setCurrentUser(undefined);
        push('/signin');
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
    //   // ログイン確認中
    //   // 自分で作ったローディングコンポーネントをレンダリングする

    return <Loading />;
  }
};

export { AuthContext, AuthProvider };
