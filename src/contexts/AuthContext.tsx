import { createContext, ReactNode, useContext } from "react";
import { api } from "services/api";

type AuthProviderProps = {
  children: ReactNode;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextProps = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });
      console.log(
        "🚀 ~ file: AuthContext.tsx ~ line 28 ~ signIn ~ response",
        response
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: AuthContext.tsx ~ line 34 ~ signIn ~ error",
        error
      );
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
