// HistoryContext.js
import React, { createContext, useEffect, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem('history');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const addToHistory = (item) => {
    setHistory([item, ...history.slice(0, 19)]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
