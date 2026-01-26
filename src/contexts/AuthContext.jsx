import React, { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      },
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    signIn: (email, password) =>
      supabase.auth.signInWithPassword({ email, password }),
    signUp: async (email, password) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      console.log("Supabase signUp raw response - data:", data);
      console.log("Supabase signUp raw response - error:", error);
      if (error) {
        if (error.message.includes("User already registered")) {
          return {
            error: {
              message:
                "This email is already registered. Please sign in or use different email",
            },
          };
        }
        return { error };
      }

      if(data.user && data.user.identities && data.user.identities.length===0){
        return {error:{message:"This email is already registered. Please use different email "}}
      }


      return { data, error: null };
    },
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};