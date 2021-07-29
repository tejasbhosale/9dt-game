import { render, fireEvent, screen } from '@testing-library/react';
import * as axios from "axios";
import Game from "./components/Game";
import App from './App';

jest.mock("axios");

test("Game component renders", () => {
  render(<Game></Game>);
  const gameElement = screen.getByTestId('game');
  expect(gameElement).toBeInTheDocument();
});

test("Buttons render- Choose Team", () => {
  render(<Game></Game>);
  const btn = screen.getByTestId('choose-team-btn');
  expect(btn).toHaveTextContent('Choose Team');
});

test("Buttons render- Restart Game", () => {
  render(<Game></Game>);
  const btn = screen.getByTestId('restart-btn');
  expect(btn).toHaveTextContent('Restart Game');
});