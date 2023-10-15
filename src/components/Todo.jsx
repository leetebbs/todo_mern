import { useEffect, useState, useContext } from "react";
import axios from "axios";
import '../styles/todo.css'
import {IdContext} from '../App';
const Todo = () => {

  const [id, setId] = useContext(IdContext);
  const test = localStorage.getItem("userId");
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const [add, setAdd] = useState("");
console.log(test)

  const handleRemoveTodo = async (id) => {
    await axios.post("https://todo-express-zeta.vercel.app/deletetodo", {
      index: id,
    });
    handlefetchTodo();
  }
  const handleAddTodo = async (todo) => {
    if (todo === "") {
      return;
    }
    const response = await axios.post("https://todo-express-zeta.vercel.app/addtodo", {
      userId: id,
      todo: todo,
    });
    setTodo("");
    setAdd(response.data);
  };
  const handlefetchTodo = async () => {
    const response = await axios.post("https://todo-express-zeta.vercel.app/fetchtodo", {
      userId: id,
    });
    setData(response.data);
  };


  useEffect(() => {
    handlefetchTodo();
  }, [add]);

  return (
    <div className="todo_container">
      <h1>Things to do!</h1>
      {data.map((item, index) => (
        <div className="todos" key={index}>
    <div className="todoItem" key={index}>{item.todo}</div>
    <button className="removeBtn"  onClick={() => handleRemoveTodo(item._id)}><i className="fa-solid fa-trash-can"></i></button>
        </div>
    
      ))}
      <div className="submitTodo">
      <input
        type="text"
        value={todo}
        placeholder="Add A Todo"
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="todoBtn" onClick={() => handleAddTodo(todo)}>Add</button>
      </div>

    </div>
  );
};

export default Todo;
