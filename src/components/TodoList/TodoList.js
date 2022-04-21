import React from "react";
import { Col, Row, Input, Button } from "reactstrap";
import "./TodoList.scss";
import Task from "../Task/Task";
import { useState, useMemo } from "react";

export default function TodoList({
  todoList,
  onUpdateTask,
  onRemoveTask,
  getTaskChecked,
  onRemoveTaskChecked,
}) {
  // console.log("check todo list: ", todoList);
  const [search, setSearch] = useState("");

  const isChecked = useMemo(
    () => todoList.some((task) => task.isChecked),
    [todoList]
  );

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        <Row>
          <h3 className="title">To do list</h3>
        </Row>
        <Row className="search">
          <Input
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Row>

        <Row className="todo-list-tasks">
          {todoList
            .filter((task) =>
              task.name.toLowerCase().match(search.toLowerCase().trim())
            )
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((todo) => {
              const index = todoList.indexOf(todo);
              return (
                <Task
                  key={todo.id}
                  index={index}
                  todo={todo}
                  onUpdateTask={onUpdateTask}
                  onRemoveTask={onRemoveTask}
                  getTaskChecked={getTaskChecked}
                />
              );
            })}
        </Row>
      </div>

      {/* Bulk Action */}
      {isChecked && (
        <div className="bulk-action">
          <Row>
            <Col xs="8">Bulk Action:</Col>
            <Col xs="2">
              <Button disabled color="primary">
                Done
              </Button>
            </Col>
            <Col xs="2">
              <Button color="danger" onClick={onRemoveTaskChecked}>
                Remove
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
