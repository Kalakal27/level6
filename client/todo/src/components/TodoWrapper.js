import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from "./Todo.js";
uuidv4();



const TodoWrapper = (props) => {
  const [todos, setTodos] = useState([])
  const { logout } = props
  


  
const addTodo = todo => {
  setTodos([...todos, {id: uuidv4(), task: todo,
  completed: false, idEditing: false}])
  console.log(todos)
}  
  const toggleComplete = (id) =>{
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  // const editTodo = (id) => setTodos(todos.map((todo) => todo.id === id ? {...todo, isEditing: !todo.isEditing } : todo))


  
  return (
    <div className='TodoWrapper'>
      <h1>Terraria Todo Guide</h1>
      {/* <button onClick={logout}>Logout</button> */}
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo task={todo} key={todo.id}
        toggleComplete={{toggleComplete}}
        deleteTodo={deleteTodo} 
        // editTodo={editTodo}/>
        />
        
      ))}
    </div>
  )
}



export default TodoWrapper
