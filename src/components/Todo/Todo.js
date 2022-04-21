import React from "react";
import { Col, Row, Input } from "reactstrap";
import "./Todo.scss";

export default function Todo({
  inputDescription,
  onInputDescriptionChange,
  dueDate,
  onDueDateChange,
  priority,
  onPriorityChange,
}) {
  return (
    <Row className="todo">
      <Row className="description">
        <Row>Description</Row>
        <textarea
          value={inputDescription}
          onChange={onInputDescriptionChange}
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
              value={dueDate}
              onChange={onDueDateChange}
            ></Input>
          </Row>
        </Col>
        <Col xs="6" className="priority">
          <Row>Priority</Row>
          <Row>
            <Input
              type="select"
              name="priority"
              value={priority}
              onChange={onPriorityChange}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </Input>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}
