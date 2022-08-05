import { useEffect, useState } from 'react';

const useIsSmallScreen = (): boolean => {
  const [isSmall, setIsSmall] = useState<boolean>(false);

  const update = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const dMin = width < height ? width : height;

    if (dMin < 767) setIsSmall(true);
    else setIsSmall(false);
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return isSmall;
};

export default useIsSmallScreen;
