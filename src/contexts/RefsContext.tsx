"use client";
import { createContext, useRef, useContext, RefObject, ReactNode } from "react";

interface RefsContextType {
  headerRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
  ratesRef: RefObject<HTMLElement>;
  offersRef: RefObject<HTMLElement>;
  servicesRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
  footerRef: RefObject<HTMLParagraphElement>;
}

const defaultValue: RefsContextType = {
  headerRef: { current: null },
  aboutRef: { current: null },
  ratesRef: { current: null },
  offersRef: { current: null },
  servicesRef: { current: null },
  contactRef: { current: null },
  footerRef: { current: null },
};

const RefsContext = createContext<RefsContextType>(defaultValue);

export function RefsProvider({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const ratesRef = useRef<HTMLElement>(null);
  const offersRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  return (
    <RefsContext.Provider value={{ headerRef, aboutRef, ratesRef, offersRef, servicesRef, contactRef, footerRef }}>
      {children}
    </RefsContext.Provider>
  );
}

export function useRefsContext() {
  return useContext(RefsContext);
}
