import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";

// Unified User type
export type User = {
  id: number;
  username?: string;
  email?: string;
  role?: 'ADMIN' | 'HR' | 'EMPLOYEE' | string;
  name?: string;
  designation?: string;
  department_name?: string;
  emp_id?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        // We use the base URL for profile verification
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Profile load failed", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
