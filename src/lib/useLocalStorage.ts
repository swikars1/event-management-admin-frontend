"use client";
import { useState } from "react";

const useLocalStorage = ({
  key,
  initialValue,
}: {
  key: string;
  initialValue: any;
}) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    try {
      if (typeof window !== "undefined") {
        const value = window.localStorage.getItem(key);
        // Check if the local storage already has any values,
        // otherwise initialize it with the passed initialValue
        return value ? value : initialValue;
      }
    } catch (error) {
      console.log(error);
      return "";
    }
  });

  const setValue = (value: any) => {
    try {
      // If the passed value is a callback function,
      //  then call it with the existing state.
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, valueToStore);
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export { useLocalStorage };
