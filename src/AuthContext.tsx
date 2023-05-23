import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import firebaseApp from "./helpers/firebase";

interface AuthContextProps {
  userId: string | null;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({ userId: null });

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getAuth(firebaseApp).onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    }, (error) => {
      throw (error);
    });
  }, []);

  return <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>;
};
