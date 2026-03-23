import { useEffect, useState, type PropsWithChildren } from 'react';
import { ApiError } from '../../../shared/api/http';
import { sessionApi } from '../api/session-api';
import { tokenStorage } from '../../../shared/lib/token-storage';
import { AuthContext, type AuthContextValue } from './context';
import type { LoginPayload, RegisterPayload, User } from './types';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = tokenStorage.getToken();

      if (!token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const me = await sessionApi.getMe(token);
        setUser(me);
      } catch {
        tokenStorage.clearToken();
      } finally {
        setIsBootstrapping(false);
      }
    };

    void bootstrap();
  }, []);

  const signIn = async (payload: LoginPayload) => {
    const tokenResponse = await sessionApi.login(payload);
    tokenStorage.setToken(tokenResponse.access_token);

    const me = await sessionApi.getMe(tokenResponse.access_token);
    setUser(me);
  };

  const signUp = async (payload: RegisterPayload) => {
    await sessionApi.register(payload);
    await signIn({ email: payload.email, password: payload.password });
  };

  const signOut = async () => {
    const token = tokenStorage.getToken();

    try {
      await sessionApi.logout(token ?? null);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        throw error;
      }
    } finally {
      tokenStorage.clearToken();
      setUser(null);
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    isBootstrapping,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
