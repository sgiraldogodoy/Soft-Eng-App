import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export function TimeoutProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (exemptedRoutes.includes(location)) return;
    const handleWindowEvents = () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        alert("you are being logged out");
        // Redirect to a different route when the timeout occurs
        setLocation("/");
      }, 10000);
    };

    // listen for specific window events to ensure the user is still active
    window.addEventListener("mousemove", handleWindowEvents);
    window.addEventListener("keydown", handleWindowEvents);
    window.addEventListener("click", handleWindowEvents);
    window.addEventListener("scroll", handleWindowEvents);

    handleWindowEvents();

    // cleanup function
    return () => {
      window.removeEventListener("mousemove", handleWindowEvents);
      window.removeEventListener("keydown", handleWindowEvents);
      window.removeEventListener("click", handleWindowEvents);
      window.removeEventListener("scroll", handleWindowEvents);
    };
  }, [location, setLocation]);

  return children;
}
const exemptedRoutes = ["/credit"];
