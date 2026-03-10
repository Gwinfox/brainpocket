import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { SimplifiedError } from "../types/errorTypes";
// Интерфейс
interface ErrorContextType {
  error: SimplifiedError | null;
  setError: Dispatch<SetStateAction<SimplifiedError | null>>;
}
// Контекст
const ErrorContext = createContext<ErrorContextType>({ error: null, setError: () => {} });
//Провайдер
export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<SimplifiedError | null>(null);
  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}
//Хук
export function useGetError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useGetError must be used within ErrorProvider");
  }
  return context;
}
