"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface DayContextType {
  selectedDays: number;
  setSelectedDays: (day: number) => void;
}

const defaultValue: DayContextType = {
  selectedDays: 1,
  setSelectedDays: () => {},
};

const DayContext = createContext<DayContextType>(defaultValue);

export function DayProvider({ children }: { children: ReactNode }) {
  const [selectedDays, setSelectedDays] = useState(1);

  return <DayContext.Provider value={{ selectedDays, setSelectedDays }}>{children}</DayContext.Provider>;
}

export function useDayContext() {
  return useContext(DayContext);
}
