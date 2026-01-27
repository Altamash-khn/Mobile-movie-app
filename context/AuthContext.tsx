import { createContext, ReactNode, useContext, useState } from "react";

interface UserPayload {
  email: string;
  password: string;
  name?: string;
}

interface AuthContextType {
  login: (payload: UserPayload) => Promise<void>;
  signup: (payload: UserPayload) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  async function login({ email, password }: UserPayload) {}
  async function signup({ email, password }: UserPayload) {}

  const logout = async () => {
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

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 🔥 Step 3 will go here (session check)
//     setLoading(false);
//   }, []);
