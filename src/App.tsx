import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TasksStateType = {
  [todolistId: string]: Array<TaskType>
}

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistId1, title: 'What to learn', filter: 'active'},
    {id: todolistId2, title: 'What to buy', filter: 'completed'},
  ]);
  const [tasks, setTasks] = useState<TasksStateType>({
      [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
      ],
      [todolistId2]: [
        {id: v1(), title: 'Book', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
      ],
    }
  );

  function removeTask(todolistId: string, id: string) {
    const filteredTasks = tasks[todolistId].filter(task => task.id !== id);
    setTasks({...tasks, [todolistId]: filteredTasks});
  }
  function addTask(todolistId: string, title: string) {
    const newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
  }
  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)});

  }
  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, filter: value} : todo));
  }
  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(todo => todo.id !== todolistId))
    delete tasks[todolistId]
  }

  return (
    <div className="App">
      {todolists.map(todo => {
        let tasksForTodolist = tasks[todo.id];
        if (todo.filter === 'active') {
          tasksForTodolist = tasks[todo.id].filter(task => !task.isDone);
        }
        if (todo.filter === 'completed') {
          tasksForTodolist = tasks[todo.id].filter(task => task.isDone);
        }
        return (
          <Todolist id={todo.id}
                    key={todo.id}
                    title={todo.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={todo.filter}
                    removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
