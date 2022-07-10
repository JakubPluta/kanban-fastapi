import React from 'react'
import { useState } from 'react';

const AddColumn = (props) => {
    const [showNewColumnButton, setShowNewColumnButton] = useState(true);
    const [value, setValue] = useState("");


    const handleInputChange = (event) => {
        setValue(event.target.value)
    }

    const onNewColumnButtonClick = () => {
        setShowNewColumnButton(false)
    }

    const onNewColumnInputComplete = () => {
        setShowNewColumnButton(true);
        addNewColumn(value);
        setValue("");
    }





    const addNewColumn = (title) => {
        const newColumnOrder = Array.from(props.state.columnOrder);
        const newColumnId = 'column-' + Math.floor(Math.random() * 1000000);
        newColumnOrder.push(newColumnId)
    
    
        const newColumn = {
            id: newColumnId,
            title: title,
            taskIds: [],
        };

        props.setState({
            ...props.state,
            columnOrder: newColumnOrder,
            columns: {
                ...props.state.columns,
                  [newColumnId]: newColumn
            }
        })
    
    }



 return (
        <div>
            {
                showNewColumnButton ?
                <button onClick={onNewColumnButtonClick}>New Column</button> :
                <input type="text" value={value} onChange={handleInputChange} onBlur={onNewColumnInputComplete} />
            }
        </div>
    )
}

export default AddColumn
