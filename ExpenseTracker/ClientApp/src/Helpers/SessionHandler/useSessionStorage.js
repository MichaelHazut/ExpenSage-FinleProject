import { useState, useEffect } from "react";

export function useSessionStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return initialValue;
    });
  
    useEffect(() => {
      sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  }
  