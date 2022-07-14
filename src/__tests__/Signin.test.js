import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Signin from '../components/auth/Signin.jsx';

test('The text within the main div should display correctly', () => {
  render(<Signin />);
  const header = screen.getByText('Signin');
  expect(header).toHaveTextContent('Signin');
});
