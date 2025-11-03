export const getImagePrefix = () => {
  if (typeof window === "undefined") return ""; 
  return window.location.origin.includes("localhost") ? "" : "";
};