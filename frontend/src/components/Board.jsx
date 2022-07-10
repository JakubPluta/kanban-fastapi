import React from "react";
import { useState, useEffect } from "react";
import styled from 'styled-components'
import axios from 'axios'
import Column from "./Column";
import AddColumn from './AddColumn';

import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
    display: flex;
`

const Board = (props) => {
    const initialData = {
        tasks: {}, columns: {}, columnOrder: []
    }

    const [state, setState] = useState(initialData)

    const fetchBoards = async () => {

        try {
            const response = await axios.get('/board')
            const data = await response.data.board
            console.log(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchBoards().then(
            data => setState(data)
        )
    }, [])

    const onDragEnd = (results) => {
        const { destination, source, draggableId, type } = results;

        // if nothing moved

        if (!destination) {
            return;
        }


        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }



        if (type === 'column') {
            const newColumnOrder = Array.from(state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            
            setState(
                {
                    ...state,
                    columnOrder: newColumnOrder,
                }
            );
            return

        }

         

            const start= state.columns[source.droppableId]
            const finish = state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)
                    

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            setState(
                {
                    ...state,
                    columns: {
                        ...state.columns,
                        [newColumn.id]: newColumn
                    }
                }
            )
            return;
        }
             
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStartColumn = {
            ...start,
            taskIds: startTaskIds
        }
             
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(
            destination.index, 0, draggableId
        )

        const newFinishColumn = {
            ...finish,
            taskIds: finishTaskIds

        }
        setState(
            {
                ...state,
                columns: {
                    ...state.columns,
                    [newStartColumn.id]: newStartColumn,
                    [newFinishColumn.id] : newFinishColumn
                }
            }
        )
        return


             
        }


    

    return (
        <DragDropContext onDragEnd={onDragEnd}>
             <AddColumn state={state} setState={setState} />
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {provided => (
                <Container {...provided.droppableProps} ref={provided.innerRef}>
                    {
                        state.columnOrder.map((colId, index) => {
                            const col = state.columns[colId];
                            const tasks = col.taskIds.map(taskId => state.tasks[taskId]);
                            return <Column key={col.id} column={col} tasks={tasks} index={index} state={state} setState={setState} />;
                        }
                        )
                        }
                    {provided.placeholder}      
                    </Container>
                )}
                </Droppable>
            </DragDropContext>
  )
}

export default Board
