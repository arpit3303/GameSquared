// src/components/Card/Card.js
import React, { useState } from 'react';
import './card.css';
import { Draggable } from 'react-beautiful-dnd';
import { useBoard } from '../../context/BoardConext';
import Button from '../Button/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Card = ({ card, index, columnId }) => {
    const { editCard, deleteCard } = useBoard();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(card.text);

    const handleEdit = () => {
        editCard(card.id, columnId, text);
        setIsEditing(false);
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided , snapshot) => (
                <div
                    className={`card ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {isEditing ? (
                        <div className='card-input'>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Button type='primary' onClick={handleEdit}>Save</Button>
                        </div>
                    ) : (
                        <>
                            <p>{card.text}</p>
                           <div className='card-actions'>
                            <Button className='card-action' type='secondary' onClick={() => setIsEditing(true)}><EditIcon /></Button>
                            <Button  className='card-action' type='danger' onClick={() => deleteCard(card.id, columnId)}><DeleteIcon /></Button>
                           </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default Card;
