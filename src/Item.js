import React from "react"

function Item(props) {
    const { todo, handleChange } = props;
    return (
        <div className="todo-item">
            <div  className="switch_box box_1">
                <input 
                    className="switch_1"
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={() => handleChange({ ...todo, completed: !todo.completed })} 
                />
            </div>
            <p className="todo-text">{todo.text}</p>
        </div>
    )
}

export default Item