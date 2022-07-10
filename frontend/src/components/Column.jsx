import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";
import AddTask from './AddTask';

const Container = styled.div`
    margin: 8px;
    border: 1px solid black;
    border-radius: 2px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
`

const Title = styled.h3`
    padding: 5px;
`


const TaskList = styled.div`
    padding: 8px;
`


const Column = (props) => {
    return (
        <Draggable draggableId={props.column.id} index={props.index}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{props.column.title}</Title>
                    
                    <Droppable droppableId={props.column.id} type="task">
                        {provided => (
                            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    props.tasks.map(
                                        (task, index) => {
                                            return <Task key={task.id} task={task} index={index} columnId={props.column.id} state={props.state} setState={props.setState} />
                                        }
                                    )
                                }
                                {provided.placeholder}
                            </TaskList>
                        )}
                        </Droppable>
                                <AddTask columnId={props.column.id} state={props.state} setState={props.setState} />
                    </Container>
            )}
            </Draggable>
  )
};

export default Column;
