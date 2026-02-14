import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AppRole = "agency_admin" | "agency_support" | "client_owner" | "client_staff";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  agencyId: string | null;
  profile: { display_name: string | null; avatar_url: string | null } | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: AppRole) => boolean;
  isAgencyUser: boolean;
  isClientUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    roles: [],
    agencyId: null,
    profile: null,
  });

  const fetchUserData = async (userId: string) => {
    const [rolesRes, profileRes] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("profiles").select("display_name, avatar_url, agency_id").eq("user_id", userId).single(),
    ]);

    const roles = (rolesRes.data?.map((r: any) => r.role) ?? []) as AppRole[];
    const profile = profileRes.data;

    setState((prev) => ({
      ...prev,
      roles,
      agencyId: profile?.agency_id ?? null,
      profile: profile ? { display_name: profile.display_name, avatar_url: profile.avatar_url } : null,
    }));
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setState((prev) => ({ ...prev, session, user: session?.user ?? null, loading: false }));
      if (session?.user) {
        setTimeout(() => fetchUserData(session.user.id), 0);
      } else {
        setState((prev) => ({ ...prev, roles: [], agencyId: null, profile: null }));
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((prev) => ({ ...prev, session, user: session?.user ?? null, loading: false }));
      if (session?.user) fetchUserData(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: displayName },
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const hasRole = (role: AppRole) => state.roles.includes(role);
  const isAgencyUser = hasRole("agency_admin") || hasRole("agency_support");
  const isClientUser = hasRole("client_owner") || hasRole("client_staff");

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, hasRole, isAgencyUser, isClientUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
