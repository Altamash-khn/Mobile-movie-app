import { account } from "@/services/appwrite";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserPayload {
  email: string;
  password: string;
  name?: string;
}

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  login: (payload: UserPayload) => Promise<void>;
  signup: (payload: UserPayload) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    name: "ayan",
    email: "ayank829130@gmail.com",
  });

  async function signup({ email, password, name }: UserPayload) {
    await account.create("unique()", email, password, name);
    await account.createEmailPasswordSession(email, password);

    const currentUser = await account.get();

    setUser({
      name: currentUser.name,
      email: currentUser.email,
    });
  }

  async function login({ email, password }: UserPayload) {
    await account.createEmailPasswordSession(email, password);

    const currentUser = await account.get();

    setUser({
      name: currentUser.name,
      email: currentUser.email,
    });
  }

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
