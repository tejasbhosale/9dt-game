import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Button from '@material-ui/core/Button';
import axios from "axios";
import './Game.css';

const Game = ({ value, onClick }) => {
    let squares = [];
    let movesTemp = [];
    const baseURL = "https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=";
    const gridSize = 4;
    const [currentState, setCurrentState] = useState([...squares]);
    const [informationalMessage, setInformationalMessage] = useState("");
    const [xIsNext, setXisNext] = useState(true);
    const [newGame, setNewGame] = useState(true);
    const xO = xIsNext ? "X" : "O";
    const [winner, setWinner] = useState("");
    const [moves, setMoves] = useState([]);

    useEffect(() => {
        for (let i = 0; i < gridSize; i++) {
            squares.push(Array(gridSize).fill(null));
        }
        setCurrentState([...squares]);
        setMoves([...movesTemp]);
    }, []);

    useEffect(() => {
        if (moves && !xIsNext && !winner) {
            axios.get(baseURL + `[` + moves + `]`)
                .then(res => {
                    if (res.data) {
                        handleClick(res.data.slice(-1).pop());
                        movesTemp.push(res.data.slice(-1).pop());
                    } else {
                        setInformationalMessage(`Winner is already declared: ` + res);
                    }
                })
                .catch((message) => {
                    setInformationalMessage(`! Request failed, please restart`);
                    console.log(message);
                });
            setInformationalMessage("");
        }
    }, [xO]);
    const chooseTeam = () => {
        if (window.confirm("Do you want computer to go first?")) {
            setXisNext(false);
        }
        setNewGame(false);
    }

    const restart = () => {
        window.location.reload();
    }

    const handleClick = (i) => {
        squares = [...currentState];
        setNewGame(false);

        if (winner) {
            setInformationalMessage(`Game over! Restart the game!!`);
            return;
        }
        if (!squares[i][0]) {
            let lastIndex = squares[i].length - 1;
            movesTemp = [...moves];
            movesTemp.push(i);
            setMoves([...movesTemp]);
            while (squares[i][lastIndex] && lastIndex > 0) {
                lastIndex--;
            }
            squares[i][lastIndex] = xO;
            squares[i] = squares[i].slice(-4);
            setCurrentState([...squares]);
            if (calculateWinner()) {
                let winnerTeam = (xO === 'X') ? "RED Team" : "BLUE Team";
                setWinner(winnerTeam);
                setInformationalMessage(`Winner winner chicken dinner ` + winnerTeam);
            };
            setXisNext(!xIsNext);
        } else {
            setInformationalMessage(i + ` grid is full`);
        }
    };

    const calculateWinner = () => {
        for (let current of currentState) { //vertical scan
            if (current.every((val, i, arr) => val ? val === arr[0] : false)) {
                return true;
            }
        }
        for (let i = 0; i < currentState.length; i++) { //horizontal scan
            let rowScan = [];
            let diagonalScan1 = [];
            let diagonalScan2 = [];
            let arrLength = currentState.length;

            for (let j = 0; j < currentState.length; j++) {
                rowScan.push(currentState[j][i]);
                diagonalScan1.push(currentState[j][j]); //diagonal scan
                diagonalScan2.push(currentState[j][arrLength - 1]); //diagonal scan
                arrLength--;
            }
            if (rowScan.every((val, i, arr) => val ? val === arr[0] : false) ||
                diagonalScan1.every((val, i, arr) => val ? val === arr[0] : false) ||
                diagonalScan2.every((val, i, arr) => val ? val === arr[0] : false)) {
                return true;
            }
        }
        return false;
    }

    return (
        <div>
            <div className="box">
                <p className="message">{informationalMessage}</p>
                <Grid key={squares} squares={currentState} onClick={handleClick} />
            </div>
            <div clss="btn">
                <Button variant="contained" color="secondary" size="medium" onClick={chooseTeam} className="btn" role="button" disabled={!newGame}>Choose Team</Button>
                <Button variant="contained" color="secondary" size="medium" onClick={restart} className="btn">Restart Game</Button>
            </div>
        </div>
    );
};

export default Game;