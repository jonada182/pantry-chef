import React, { createContext, useEffect, useState } from "react";
import { generateFakeId } from "./helpers";
import { MOCK_API } from "./helpers/constants";
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
    if (MOCK_API == "true") {
      setUserId(generateFakeId);
    } else {
      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(null);
        }
      }, (error: any) => {
        throw (error);
      });
    }
  }, []);

  return <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>;
};
