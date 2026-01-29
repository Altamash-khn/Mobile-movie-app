import { account } from "@/services/appwrite";
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
  const [user, setUser] = useState<any | null>(null);

  async function signup({ email, password, name }: UserPayload) {
    // 1. create the user in appwrites database
    await account.create("unique()", email, password, name);

    // 2️⃣ Create session (auto login)
    await account.createEmailPasswordSession(email, password);

    // 3️⃣ Get logged-in user
    const currentUser = await account.get();

    // 4️⃣ Save user globally
    setUser(currentUser);
  }

  async function login({ email, password }: UserPayload) {
    // 1️⃣ Create session
    await account.createEmailPasswordSession(email, password);

    // 2️⃣ Get user
    const currentUser = await account.get();

    // 3️⃣ Save globally
    setUser(currentUser);
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

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // 🔥 Step 3 will go here (session check)
//     setLoading(false);
//   }, []);
