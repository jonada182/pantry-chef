import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

interface AuthContextProps {
  userId: string | null;
  isLoading: boolean;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({ userId: null, isLoading: false });

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ userId, isLoading }}>{children}</AuthContext.Provider>;
};
