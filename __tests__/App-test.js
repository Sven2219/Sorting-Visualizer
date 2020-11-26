/**
 * @format
 */

import 'react-native';
import React from 'react';
import Navigation from '../src/screens/Navigation';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Navigation />);
});
