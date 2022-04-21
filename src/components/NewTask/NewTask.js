import React from "react";
import Todo from "../Todo/Todo";
import { Input } from "reactstrap";
import "./NewTask.scss";
import { Row, Button } from "reactstrap";

export default function NewTask({
  inputNewTask,
  onInputNewTaskChange,
  inputDescription,
  onInputDescriptionChange,
  dueDate,
  onDueDateChange,
  priority,
  onPriorityChange,
  onAddBtnClick,
}) {
  return (
    <Row className="newTask">
      <h3 className="title">New Task</h3>
      <Row className="title-task">
        <Input
          placeholder="Add new task ..."
          value={inputNewTask}
          onChange={onInputNewTaskChange}
        />
      </Row>

      <Todo
        className="todo"
        inputDescription={inputDescription}
        onInputDescriptionChange={onInputDescriptionChange}
        dueDate={dueDate}
        onDueDateChange={onDueDateChange}
        priority={priority}
        onPriorityChange={onPriorityChange}
      />

      <Row>
        <Button
          className="btn btn-success"
          onClick={onAddBtnClick}
          disabled={!inputNewTask}
        >
          Add
        </Button>
      </Row>
    </Row>
  );
}
