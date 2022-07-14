import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from '../components/auth/Signup.jsx';

test('The text within the main div should display correctly', () => {
  render(<Signup />);
  const header = screen.getByText('Signup');
  expect(header).toHaveTextContent('Signup');
});
