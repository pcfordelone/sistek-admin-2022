export interface IUserAuth {
  username?: string;
  email?: string;
  token?: string;
  role?: string;
  user_id?: string;
}

export interface IAuthContextData extends IUserAuth {
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
}

export interface IAuthContextProviderProps {
  children: React.ReactNode;
}
