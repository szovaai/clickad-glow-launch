import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const getHeaderHeight = () => {
  const header = document.querySelector('header');
  return header ? header.offsetHeight + 20 : 100; // Add 20px padding
};

export const HashScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = getHeaderHeight();
          const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return null;
};
