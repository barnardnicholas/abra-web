import React from 'react';
import renderer from 'react-test-renderer';
import Divider from './Divider';

it('Renders correctly', () => {
  const tree = renderer.create(<Divider />).toJSON();
  expect(tree).toMatchSnapshot();
});
