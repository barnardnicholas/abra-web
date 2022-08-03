import React from 'react';
import { useSelector } from 'react-redux';
import LogoDark from '../../assets/logos/ABRA-Logo-Grey-WO.svg';
import LogoLight from '../../assets/logos/ABRA-Logo-Grey.svg';
import { getDarkMode } from '../../redux/selectors/darkMode';

interface MainLogoProps {
  forceDarkTheme?: boolean;
}

function MainLogo({ forceDarkTheme = false }: MainLogoProps) {
  const isDarkMode = useSelector(getDarkMode);
  return (
    <>
      <img
        src={LogoDark}
        className={`main-logo ${isDarkMode || forceDarkTheme ? '' : 'hidden'}`}
        width={300}
        height="auto"
        alt="Abra Logo"
      />
      <img
        src={LogoLight}
        className={`main-logo ${isDarkMode || forceDarkTheme ? 'hidden' : ''}`}
        width={300}
        height="auto"
        alt="Abra Logo"
      />
    </>
  );
}

MainLogo.defaultProps = {
  forceDarkTheme: false,
};

export default MainLogo;
