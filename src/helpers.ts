export const scrollToRef = (ref: React.RefObject<HTMLElement>): void => {
  ref.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
};
