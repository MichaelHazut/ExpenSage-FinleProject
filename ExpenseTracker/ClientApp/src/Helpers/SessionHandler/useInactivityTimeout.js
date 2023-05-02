import { useEffect } from "react";

export function useInactivityTimeout(timeoutInMinutes, onTimeout) {
    useEffect(() => {
      let timeoutId;
      const resetTimeout = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onTimeout();
        }, timeoutInMinutes * 60 * 1000);
      };
      resetTimeout();
  
      const handleUserActivity = () => {
        resetTimeout();
      };
      document.addEventListener('mousemove', handleUserActivity);
      document.addEventListener('keydown', handleUserActivity);
  
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousemove', handleUserActivity);
        document.removeEventListener('keydown', handleUserActivity);
      };
    }, [timeoutInMinutes, onTimeout]);
  }
  