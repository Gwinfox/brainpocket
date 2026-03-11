import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { SimplifiedError } from "../types/errorTypes";
// Интерфейс
interface ErrorContextType {
  globalError: SimplifiedError | null;
  setGlobalError: Dispatch<SetStateAction<SimplifiedError | null>>;
}
// Контекст
const ErrorContext = createContext<ErrorContextType>({ globalError: null, setGlobalError: () => {} });
//Провайдер
export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [globalError, setGlobalError] = useState<SimplifiedError | null>(null);
  return <ErrorContext.Provider value={{ globalError, setGlobalError }}>{children}</ErrorContext.Provider>;
}
//Хук для доступа к контексту
export function useGetError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useGetError must be used within ErrorProvider");
  }
  return context;
}
