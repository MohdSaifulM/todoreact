import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, settodos] = useState([]);
  const [todo, settodo] = useState({});
  useEffect(() => {
    fetch();
  }, []);
  async function fetch() {
    try {
      let resp = await axios.get("http://localhost:8080/todos");
      // console.log(resp.data);
      settodos(resp.data.todos);
    } catch (error) {
      console.log(error);
    }
  }
  function changeHandler(e) {
    settodo((todo) => ({ ...todo, [e.target.name]: e.target.value }));
  }
  async function addTodo() {
    console.log(todo);
    try {
      let resp = await axios.post("http://localhost:8080/todos", todo);
      // console.log(resp.data);
      // settodos((todos) => [...todos, todo]);
      fetch();
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <div className="App">
      <div>
        <div>
          <input name="title" onChange={changeHandler} />
        </div>
        <div>
          <textarea name="description" onChange={changeHandler}></textarea>
        </div>
        <button onClick={addTodo}>Add todo</button>
      </div>
      <h3>Todos List</h3>
      {todos.map((todo) => (
        <li key={todo._id}>{todo.title}</li>
      ))}
    </div>
  );
}

export default App;
