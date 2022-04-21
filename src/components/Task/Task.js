import React from "react";
import { Col, Row, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";
import "./Task.scss";

export default function Task({
  todo,
  index,
  onUpdateTask,
  onRemoveTask,
  getTaskChecked,
}) {
  const [task, setTask] = useState();
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  useEffect(() => setTask(todo), [todo]);

  // console.log("check task: ", task);

  return (
    <div className="tasks">
      <Row
        className="task-title"
        style={{ "border-bottom": "1px solid black" }}
      >
        <Col>
          <Input
            type="checkbox"
            checked={todo.isChecked}
            onChange={(e) => getTaskChecked(e, index)}
          />
        </Col>
        <Col>{todo.name}</Col>
        <Col>
          <Button
            className="detail-btn"
            color="info"
            onClick={() => {
              setIsOpenDetail(!isOpenDetail);
            }}
          >
            Detail
          </Button>
          <Button
            className="remove-btn"
            color="danger"
            onClick={() => onRemoveTask(index)}
          >
            Remove
          </Button>
        </Col>
      </Row>

      {isOpenDetail && (
        <div className="task-item">
          <Row className="task-name">
            <Input
              placeholder="Update task ..."
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
            />
          </Row>

          {/* <Todo task={task} setTask={setTask} /> */}
          <Row className="todo">
            <Row className="description">
              <Row>Description</Row>
              <textarea
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </Row>
            <Row className="more-info">
              <Col xs="6" className="due-date">
                <Row>Due date</Row>
                <Row>
                  <Input
                    type="date"
                    name="dueDate"
                    min={new Date().toISOString().substr(0, 10)}
                    value={task.dueDate}
                    onChange={(e) =>
                      setTask({ ...task, dueDate: e.target.value })
                    }
                  ></Input>
                </Row>
              </Col>
              <Col xs="6" className="priority">
                <Row>Priority</Row>
                <Row>
                  <Input
                    type="select"
                    name="priority"
                    value={task.priority}
                    onChange={(e) =>
                      setTask({ ...task, priority: e.target.value })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </Input>
                </Row>
              </Col>
            </Row>
          </Row>

          <Row className="update-btn">
            <Button
              className="btn btn-success"
              onClick={() => onUpdateTask(task, index)}
            >
              Update
            </Button>
          </Row>
        </div>
      )}
    </div>
  );
}
