// src/context/BoardContext.js
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BoardContext = createContext();

export const useBoard = () => {
    return useContext(BoardContext);
};

export const BoardProvider = ({ children }) => {
    const [columns, setColumns] = useState([]);

    const addColumn = (title) => {
        const newColumn = { id: uuidv4(), title, cards: [] };
        setColumns((prev) => [...prev, newColumn]);
    };

    const addCard = (columnId, text) => {
        const newCard = { id: uuidv4(), text, status: 'todo' };
        setColumns((prev) =>
            prev.map((col) =>
                col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
            )
        );
    };

    const editCard = (cardId, columnId, newText) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === columnId
                    ? {
                          ...col,
                          cards: col.cards.map((card) =>
                              card.id === cardId ? { ...card, text: newText } : card
                          ),
                      }
                    : col
            )
        );
    };

    const deleteCard = (cardId, columnId) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === columnId
                    ? { ...col, cards: col.cards.filter((card) => card.id !== cardId) }
                    : col
            )
        );
    };

    const updateCardStatus = (columnId, newCards) => {
    setColumns((prevColumns) =>
        prevColumns.map((col) =>
            col.id === columnId ? { ...col, cards: newCards } : col
        )
    );
    };

    const updateColumnOrder = (newOrder) => {
    setColumns(newOrder);
    };


    return (
        <BoardContext.Provider
            value={{ columns, addColumn, addCard, editCard, deleteCard, updateCardStatus,updateColumnOrder }}
        >
            {children}
        </BoardContext.Provider>
    );
};
