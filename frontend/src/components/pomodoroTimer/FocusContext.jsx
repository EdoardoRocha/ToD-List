import { createContext, useState, useContext } from "react";

const FocusContext = createContext();

export function FocusProvider({ children }) {
  const [activeTask, setActiveTask] = useState(null);

  return (
    <FocusContext.Provider value={{ activeTask, setActiveTask }}>
      {children}
    </FocusContext.Provider>
  );
}

export const useFocus = () => useContext(FocusContext);
