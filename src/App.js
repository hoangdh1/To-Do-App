import NewTask from "./components/NewTask/NewTask";
import TodoList from "./components/TodoList/TodoList";
import { Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useCallback, useEffect } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);

  const [inputNewTask, setInputNewTask] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [priority, setPriority] = useState("Normal");

  // Local storage
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  // Set states for task
  const onInputNewTaskChange = useCallback((e) => {
    setInputNewTask(e.target.value);
  }, []);

  const onInputDescriptionChange = useCallback((e) => {
    setInputDescription(e.target.value);
  }, []);

  const onDueDateChange = useCallback((e) => {
    setDueDate(e.target.value);
  }, []);

  const onPriorityChange = useCallback((e) => {
    setPriority(e.target.value);
  }, []);

  // Add new task
  const onAddBtnClick = useCallback(
    (e) => {
      setTodoList([
        ...todoList,
        {
          id: v4(),
          name: inputNewTask,
          description: inputDescription,
          dueDate: dueDate,
          priority: priority,
          isChecked: false,
        },
      ]);

      setInputNewTask("");
      setInputDescription("");
      setDueDate(new Date().toISOString().substr(0, 10));
      setPriority("Normal");

      // console.log("check state after click add btn: ", priority);
    },
    [todoList, inputNewTask, inputDescription, dueDate, priority]
  );

  // Update task
  const onUpdateTask = useCallback((task, index) => {
    setTodoList((prevState) => {
      const temp = [...prevState];
      temp[index] = task;
      return temp;
    });
  }, []);

  // Remove task
  const onRemoveTask = useCallback((index) => {
    setTodoList((prevState) => {
      const temp = [...prevState];

      temp.splice(index, 1);

      return temp;
    });

    // console.log("check todolist after remove: ", todoList);
    // console.log("check index", index);
  }, []);

  const getTaskChecked = useCallback((e, index) => {
    setTodoList((prevState) => {
      const temp = [...prevState];
      temp[index] = { ...temp[index], isChecked: e.target.checked };

      // console.log("check todo list after get task checked", temp);

      return temp;
    });
  }, []);

  const onRemoveTaskChecked = useCallback(() => {
    const temp = [...todoList];
    const checkedTasks = temp.filter((task) => task.isChecked === false);

    // console.log("check after filter", checkedTasks);
    setTodoList(checkedTasks);
  }, [todoList]);

  // console.log("check todoList: ", todoList);

  return (
    <Row>
      <Col xs="6">
        <NewTask
          inputNewTask={inputNewTask}
          onInputNewTaskChange={onInputNewTaskChange}
          inputDescription={inputDescription}
          onInputDescriptionChange={onInputDescriptionChange}
          dueDate={dueDate}
          onDueDateChange={onDueDateChange}
          priority={priority}
          onPriorityChange={onPriorityChange}
          onAddBtnClick={onAddBtnClick}
        />
      </Col>
      <Col xs="6">
        <TodoList
          todoList={todoList}
          onUpdateTask={onUpdateTask}
          onRemoveTask={onRemoveTask}
          getTaskChecked={getTaskChecked}
          onRemoveTaskChecked={onRemoveTaskChecked}
        />
      </Col>
    </Row>
  );
}

export default App;
