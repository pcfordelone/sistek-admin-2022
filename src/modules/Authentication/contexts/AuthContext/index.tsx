import { createContext, useEffect, useState } from "react";
import {
  IAuthContextData,
  IAuthContextProviderProps,
  IUserAuth,
} from "./types";
import {
  getUserLocalStorage,
  LoginRequest,
  setUserLocalStorage,
} from "./utils";

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
);

export const AuthContextProvider: React.FC<IAuthContextProviderProps> = ({
  children,
}: IAuthContextProviderProps) => {
  const [user, setUser] = useState<IUserAuth | null>(getUserLocalStorage());

  const logout = () => {
    setUser(null);
    setUserLocalStorage(null);
  };

  const login = async (email: string, password: string) => {
    const response = await LoginRequest(email, password);

    const payload = {
      token: response.token,
      email,
      role: response.role,
      username: response.username,
      user_id: response.user_id,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  };

  return (
    <AuthContext.Provider
      value={{
        ...user,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
