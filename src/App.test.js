import { render, fireEvent, screen } from '@testing-library/react';
import * as axios from "axios";
import App from './App';

jest.mock("axios");

test('choose team', () => {
  const button = screen.getByRole('button');
  fireEvent.click(button);
 // expect(screen.getByText('Do you want computer to go first?'));
});

test(" axios good response", () => {
  axios.get.mockImplementation(() => Promise.resolve({ data: [0,1] }));
});