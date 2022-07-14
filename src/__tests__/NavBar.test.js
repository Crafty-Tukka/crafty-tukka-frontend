import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import NavBar from '../components/NavBar.jsx';

test('A clickable link should render', () => {
  render(<NavBar />);
  const link = screen.getByRole('Tab');
  expect(link).toBeEnabled();
});
