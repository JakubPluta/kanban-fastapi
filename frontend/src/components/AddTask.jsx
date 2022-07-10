import React from "react";
import { useState, useEffect } from "react";

const AddTask = (props) => {
    const [showNewTaskButton, setShowNewTaskButton] = useState(true);
    const [value, setValue] = useState("");


    const onNewTaskButtonClick = () => {
        setShowNewTaskButton(false)
    }


    const handleInputChange = (event) => {
        setValue(event.target.value)
    }

    const onNewTaskInputComplete = () => {
        setShowNewTaskButton(true);
        addNewTask(props.columnId, value)
        setValue("")
    }


    const addNewTask = (columnId, content) => {
        const newTaskId = 'task-' + Math.floor(Math.random() * 100000)
        const column = props.state.columns[columnId]
        const newTaskIds = Array.from(column.taskIds)
        newTaskIds.push(newTaskId);


        const newTask = {
            id: newTaskId, 
            content: content,
        }
    props.setState({...props.state,
            tasks: {
                ...props.state.tasks,
                [newTaskId]: newTask
            },
            columns: {
                ...props.state.columns,
                [columnId]: {
                    ...props.state.columns[columnId],
                    taskIds: newTaskIds
                }
            }
        });
    }



    return (
        <div>
            {
                showNewTaskButton ?               <button onClick={onNewTaskButtonClick}>New</button>:
                <input type="text" value={value} onChange={handleInputChange} onBlur={onNewTaskInputComplete} />
            }
      </div>
  )
};

export default AddTask;
