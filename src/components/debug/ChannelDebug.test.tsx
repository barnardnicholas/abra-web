import React from 'react';
import renderer from 'react-test-renderer';
import { testChannel } from '../../constants/testData/testData';
import ChannelDebug from './ChannelDebug';

it('Renders correctly', () => {
  const tree = renderer.create(<ChannelDebug channel={testChannel} />).toJSON();
  expect(tree).toMatchSnapshot();
});
