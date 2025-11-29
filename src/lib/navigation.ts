/**
 * Navigation utilities for smooth scrolling and hash navigation
 */

const getHeaderHeight = () => {
  const header = document.querySelector('header');
  return header ? header.offsetHeight + 20 : 100; // Add 20px padding
};

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = getHeaderHeight();
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function handleHashNavigation(path: string, navigate?: (path: string) => void) {
  if (path.includes('#')) {
    const [route, hash] = path.split('#');
    
    if (window.location.pathname !== route && route && route !== '/') {
      // Navigate to route first, then scroll after a short delay
      if (navigate) {
        navigate(route);
        setTimeout(() => scrollToSection(hash), 100);
      }
      return { shouldNavigate: true, route, hash };
    }
    
    // Same page, just scroll
    scrollToSection(hash);
    return { shouldNavigate: false };
  }
  
  return { shouldNavigate: true, route: path };
}
