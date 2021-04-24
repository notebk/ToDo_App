import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// 2️⃣: uncomment below
import { GetTodos, TodoType } from "./agent";
// 3️⃣: uncomment below
import { ModifyTodo } from "./agent";
// 1️⃣: uncomment below
import { CreateTodo } from "./agent";
import { BuiltWithBrev } from "built-with-brev";

function App() {
  const [newTodo, setNewTodo] = useState("Hello");

  const [todoList, setTodoList] = useState<TodoType[]>([]);
  //                              useState<>(());
  //                                      <TodoType[]>

  const refreshTodoList = async () => {
    let response = await GetTodos();
    console.log(response);
    setTodoList(response.todos);
  };

  const createTodo = async () => {
    let response = await CreateTodo(newTodo);
    refreshTodoList();
  };

  const modifyTodo = async (id: string) => {
    let response = await ModifyTodo(id);
    refreshTodoList();
  };

  useEffect(() => {
    refreshTodoList();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className={"todo-container"}>
          {todoList.map((element) => {
            return <div>{element.isComplete}</div>;
          })}

          {todoList.map((t) => {
            return !t.isComplete ? (
              <Checkbox
                todo={t}
                onChange={() => {
                  modifyTodo(t.id);
                }}
              />
            ) : (
              ""
            );
          })}
          {todoList.map((t) => {
            return t.isComplete ? (
              <Checkbox
                todo={t}
                onChange={() => {
                  modifyTodo(t.id);
                }}
              />
            ) : (
              ""
            );
          })}
        </div>

        <input
          value={newTodo}
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
        />

        <button onClick={createTodo}>add todo</button>

        <div className={"footer"}>
          <BuiltWithBrev />
        </div>
      </header>
    </div>
  );
}

export default App;

interface CheckboxProps {
  todo: TodoType;
  onChange: (id: string) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(props.todo.isComplete);

  return (
    <label>
      <input
        type={"checkbox"}
        onChange={() => {
          setIsChecked(!isChecked);
          props.onChange(props.todo.id);
        }}
        value={props.todo.title}
        checked={isChecked}
      />
      {props.todo.title}
    </label>
  );
};
