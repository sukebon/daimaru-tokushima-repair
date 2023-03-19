import { useState } from 'react';
import { supabase } from '../../utils/supabase';

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const reset = () => {
    setEmail(''), setPassword('');
  };

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.log('ログインに失敗ししました');
    }
  };

  const signup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.log('登録に失敗ししました');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut().then(() => {
      console.log('サインアウトしました');
    });
  };

  return { signup, login, logout, setEmail, setPassword, reset };
};
