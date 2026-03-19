import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // When the path changes, scroll to the absolute top smoothly
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
