import { useState } from "react";

// The useLocalStorage React custom hook is a great way to store data in local storage in a reusable way.
// It takes a key as an argument and returns an object with the current value of the key and a function to set the value of the key.
// This makes it easy to store and retrieve data from local storage in your components.
export const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.log(err);
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
