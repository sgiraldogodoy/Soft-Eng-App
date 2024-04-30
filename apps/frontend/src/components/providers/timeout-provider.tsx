import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";

export function TimeoutProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated || isLoading) return;

    const handleWindowEvents = () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        logout();
      }, 600000);
    };

    window.addEventListener("mousemove", handleWindowEvents);
    window.addEventListener("keydown", handleWindowEvents);
    window.addEventListener("click", handleWindowEvents);
    window.addEventListener("scroll", handleWindowEvents);

    handleWindowEvents();

    return () => {
      window.removeEventListener("mousemove", handleWindowEvents);
      window.removeEventListener("keydown", handleWindowEvents);
      window.removeEventListener("click", handleWindowEvents);
      window.removeEventListener("scroll", handleWindowEvents);
    };
  }, [isAuthenticated, isLoading, location, logout, setLocation]);

  return children;
}
