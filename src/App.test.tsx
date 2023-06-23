import React from 'react';
import renderer from 'react-test-renderer';
// import { render, screen } from '@testing-library/react';
import App from './App';

it('Renders the App correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
