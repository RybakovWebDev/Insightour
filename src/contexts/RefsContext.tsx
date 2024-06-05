"use client";
import { createContext, useRef, useContext, RefObject, ReactNode } from "react";

interface RefsContextType {
  headerRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
  offersRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
  footerRef: RefObject<HTMLParagraphElement>;
}

const RefsContext = createContext<RefsContextType | undefined>(undefined);

export function RefsProvider({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const offersRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  return (
    <RefsContext.Provider value={{ headerRef, aboutRef, offersRef, contactRef, footerRef }}>
      {children}
    </RefsContext.Provider>
  );
}

export function useRefsContext() {
  return useContext(RefsContext);
}
