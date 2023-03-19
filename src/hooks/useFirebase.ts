import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const login = async () =>
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('サインインしました');
      })
      .catch((error) => {
        console.log(error);
      });

  const logout = async () =>
    await auth.signOut().then(() => {
      console.log('サインアウトしました');
    });

  return { signup, login, logout, setEmail, setPassword };
};
