import { useEffect } from 'react';

/**
 * Used for window height bug on mobile devices - sets the CSS variable '--vh' to 1/100 of the window height
 * @return {void} Nothing
 */
const useDynamicVH = () => {
  function update() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    update();
  }, []);
};

export default useDynamicVH;
