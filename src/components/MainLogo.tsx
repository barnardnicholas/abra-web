import React from 'react';
import { useSelector } from 'react-redux';
import LogoDark from '../assets/logos/ABRA-Logo-Grey-WO.svg';
import LogoLight from '../assets/logos/ABRA-Logo-Grey.svg';
import { getDarkMode } from '../redux/selectors/darkMode';

const MainLogo = () => {
  const isDarkMode = useSelector(getDarkMode);
  return (
    <img src={isDarkMode ? LogoDark : LogoLight} className="main-logo" width={300} height="auto" />
  );
};

export default MainLogo;
