import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import NavBar from '../components/NavBar.jsx';

test('Navbar should render correctly', () => {
  render(<NavBar />);
});
