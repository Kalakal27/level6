import React from 'react'



export const Todo = ({task, toggleComplete, deleteTodo }) => {
  return (
    <div className='Todo'>
      <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
      <div>
        {/* <button onClick={() => EditTodoForm(task.id)}>Edit</button> */}
        <button onClick={() => deleteTodo(task.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Todo
