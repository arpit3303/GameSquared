// src/components/App.js
import React from 'react';
import './App.css';
import { BoardProvider, useBoard } from './context/BoardConext';
import Board from './components/Board/Board';
import Button from './components/Button/Button';

const App = () => {


    return (
        <BoardProvider>
            <div className="App">
                <Board />
            </div>
        </BoardProvider>
    );
};

export default App;
