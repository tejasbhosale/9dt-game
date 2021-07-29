import { render, fireEvent, screen } from '@testing-library/react';
import * as axios from "axios";
import Game from '../Game';
import Grid from '../Grid';
jest.mock("axios");

test("Game component renders", () => {
    render(<Grid squares={[]}></Grid>);
    const gameElement = screen.getByTestId('grid-in');
    expect(gameElement).toBeInTheDocument();
});

test(" axios good response", () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [0, 1] }));
});

test("Buttons render- Choose Team", () => {
    const windowMethod = jest.spyOn(window, 'confirm').mockImplementation(() => { });

    render(<Game></Game>);
    const btn = screen.getByTestId('choose-team-btn');
    fireEvent.click(btn);
    expect(windowMethod).toHaveBeenCalled();
});
