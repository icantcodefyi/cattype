"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import { authClient } from "@/app/lib/auth-client";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, setSession, setIsLoading } = useAuthStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession();
        // Transform the session data to match our store's Session type
        if (data) {
          setSession({
            user: data.user ? {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: data.user.image || undefined, // Convert null to undefined
            } : null
          });
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchSession();
    }
  }, [isLoading, setSession, setIsLoading]);

  return children;
} 