// src/components/Column/Column.js
import React from 'react';
import './column.css';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';

const Column = ({ column }) => {

    console.log(column.id,"i am column")

    return (
        <Droppable droppableId={column.id}>
            {(provided,snapshot) => (
              
                <div className={`column ${snapshot.isDraggingOver ? 'dragging-over' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                    <h2 className='column-heading'>{column.title}</h2>
                    {column.cards.map((card, index) => (
                        <Card key={card.id} card={card} index={index} columnId={column.id} />
                    ))}
                    {provided.placeholder}

                    <span className='drop-text'>Drop here</span>
                </div>
                
            )}
        </Droppable>
    );
};

export default Column;
