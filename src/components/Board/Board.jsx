import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useBoard } from '../../context/BoardConext';
import Column from '../Column/Column';
import './board.css';
import Button from '../Button/Button';


const Board = () => {
    const { columns, addCard, addColumn, updateCardStatus,updateColumnOrder } = useBoard() || {};

    // Adding default columns to the board - can also be done in context.
    useEffect(()=>{
        // Temp bug fix for default columns
  
         addColumn('todo');
        addColumn('done');
    },[])

const handleDrop = (result) => {

    const { source, destination } = result;

    if (!destination) {
        return; // Dropped outside the list
    }

    // Check if the card was dropped in the same position
    if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
    ) {
        return; // Dropped in the same position
    }

    if (result.type === 'COLUMN') {
    const newColumnOrder = Array.from(columns);
    const [movedColumn] = newColumnOrder.splice(result.source.index, 1); // Remove column from source
    newColumnOrder.splice(result.destination.index, 0, movedColumn); // Add column to destination
    updateColumnOrder(newColumnOrder);
    return;
}

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destinationColumn = columns.find((col) => col.id === destination.droppableId);
    const movedCard = sourceColumn.cards[source.index];

    if(!destinationColumn){return;}



    if (source.droppableId === destination.droppableId) {
        // Moving within the same column
        const newCards = Array.from(sourceColumn.cards);
        newCards.splice(source.index, 1); // Remove from original position
        newCards.splice(destination.index, 0, movedCard); // Add to new position

        updateCardStatus(source.droppableId, newCards);
    } else {
        // Moving to a different column
        const newSourceCards = Array.from(sourceColumn.cards);
        newSourceCards.splice(source.index, 1); // Remove from source

        const newDestinationCards = Array.from(destinationColumn.cards);
        newDestinationCards.splice(destination.index, 0, movedCard); // Add to destination

        // Update both columns
        updateCardStatus(source.droppableId, newSourceCards);
        updateCardStatus(destination.droppableId, newDestinationCards);
    }
};

    const handleAddCard = (columnId) => {
        const text = prompt("Enter card text:");
        if (text) {
            addCard(columnId, text);
        }
    };

    return (
        <>
        <div className="app-header">
     <h1 className='app-heading'>Todos</h1>
            <p className='app-heading'>
        Add todos with the add card button - by default it gets added to the first column

            </p>
            <p className='app-heading'>
                Add more columns with the App Column button and re-arange based on your workflow.
            </p>
        </div>
       
              
              <div className="app-actions">
                <Button type="primary" onClick={() => addColumn(prompt("Enter column title:"))}>Add Column</Button>
                 {columns.length &&  <Button type="primary" onClick={() => handleAddCard(columns[0].id)}>Add Card</Button>}
              </div>
                
                    <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                {(provided,snapshot) => (
                    <div className={`board  ${snapshot.isDraggingOver?'dragging-over':''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        {columns.map((column, index) => (
                            <Draggable key={column.id} draggableId={column.id} index={index}>
                                {(provided) => (
                                    <div

                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps} // Makes the column draggable
                                        style={{
                                            ...provided.draggableProps.style,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Column column={column} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

        </>
    
    );
};

export default Board;
