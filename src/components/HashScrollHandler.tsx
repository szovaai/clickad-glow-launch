import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const HashScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100; // Account for fixed header
          const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return null;
};
