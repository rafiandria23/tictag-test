import * as React from 'react';
import { render } from '@testing-library/react-native';

import RootLayout from './_layout';

test('renders correctly', () => {
  const { getByTestId } = render(<RootLayout />);
  expect(getByTestId('heading')).toHaveTextContent('Welcome');
});
