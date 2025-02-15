import { useState, useCallback, useEffect } from 'react';
import { useTypingStore } from '@/lib/store';

export function useTyping() {
  const [currentText, setCurrentText] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const resetStats = useTypingStore((state) => state.resetStats);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const stats = useTypingStore.getState().stats;
      if (!stats.isComplete) {
        const setComplete = useTypingStore.getState().setComplete;
        setComplete(30);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleRestart = useCallback(() => {
    setTimeLeft(30);
    setCurrentText('');
    setCursorPosition(0);
    setIsActive(false);
    resetStats();
  }, [resetStats]);

  const handleTyping = useCallback((text: string) => {
    if (!isActive && text.length > 0) {
      setIsActive(true);
    }
    setCurrentText(text);
  }, [isActive]);

  return {
    currentText,
    timeLeft,
    isActive,
    cursorPosition,
    setCursorPosition,
    handleRestart,
    handleTyping
  };
} 