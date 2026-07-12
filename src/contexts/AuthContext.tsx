import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "employee" | "student";

interface AuthContextType {
  isAuthenticated: boolean;
  caseId: string | null;
  role: UserRole;
  login: (caseId: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [caseId, setCaseId] = useState<string | null>(() =>
    sessionStorage.getItem("hasana_case_id")
  );

  const [role, setRole] = useState<UserRole>(() =>
    (sessionStorage.getItem("hasana_role") as UserRole) || "employee"
  );

  const login = (id: string, userRole: UserRole) => {
    setCaseId(id);
    setRole(userRole);

    sessionStorage.setItem("hasana_case_id", id);
    sessionStorage.setItem("hasana_role", userRole);
  };

  const logout = () => {
    setCaseId(null);
    setRole("employee");

    sessionStorage.removeItem("hasana_case_id");
    sessionStorage.removeItem("hasana_role");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!caseId,
        caseId,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}