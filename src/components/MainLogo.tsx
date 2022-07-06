import React from 'react';
import { useSelector } from 'react-redux';
import LogoDark from '../assets/logos/ABRA-Logo-Grey-WO.svg';
import LogoLight from '../assets/logos/ABRA-Logo-Grey.svg';
import { getDarkMode } from '../redux/selectors/darkMode';

interface MainLogoProps {
  forceDarkTheme?: boolean;
}

const MainLogo: React.FC<MainLogoProps> = ({ forceDarkTheme = false }) => {
  const isDarkMode = useSelector(getDarkMode);
  return (
    <img
      src={isDarkMode || forceDarkTheme ? LogoDark : LogoLight}
      className="main-logo"
      width={300}
      height="auto"
    />
  );
};

export default MainLogo;
