"use client";

import { useState, useCallback } from "react";

interface UseToastReturn {
  message: string;
  isVisible: boolean;
  showToast: (msg: string, duration?: number) => void;
}

export function useToast(): UseToastReturn {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback((msg: string, duration: number = 1500) => {
    setMessage(msg);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, []);

  return {
    message,
    isVisible,
    showToast,
  };
}
