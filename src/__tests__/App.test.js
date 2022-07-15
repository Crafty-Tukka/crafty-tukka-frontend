import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';

test('The navbar text component should render', () => {
  render(<App />);
  const link = screen.getByText('Home');
  expect(link).toHaveTextContent('Home');
});
