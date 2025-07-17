// client/src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll para o topo quando a rota mudar
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // ou 'auto' para scroll instantâneo
    });
  }, [pathname]);

  return null; // Este componente não renderiza nada
}

export default ScrollToTop;
