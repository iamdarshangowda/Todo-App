import "./App.css";
import "antd/dist/antd.css";
import { Table, Modal, Input } from "antd";
import { useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const initialState = {
    id: Math.random() * 1000,
    serial: 0,
    title: "",
    description: "",
    date: new Date().toLocaleTimeString(),
    due: "",
  };

  const [todoData, setTodoData] = useState(initialState); // data from input
  const [todoList, setTodoList] = useState([]); // stores all todo data to display in table
  const [isClearModal, setIsClearModal] = useState(false); // to open and close Modal
  const [isEditModal, setIsEditModal] = useState(false); // to open and close Modal
  const [editing, setEditing] = useState(""); // contains single task to edit
  const titleRef = useRef(); // to check if title is empty
  const descRef = useRef(); // to check if description is empty

  function handleTodoData(e) {
    // update current todo data is state
    const { name, value } = e.target;
    setTodoData((prev) => ({
      ...prev,
      serial:
        todoList.length === 0
          ? 1
          : Number(todoList[todoList.length - 1].serial) + 1,
      [name]: value,
      date: new Date().toLocaleTimeString(),
      status: "OPEN",
    }));
  }

  function handleAddTodoList() {
    // to add tasks to table
    if (titleRef.current.value.length > 0 && descRef.current.value.length > 0) {
      setTodoList((prev) => {
        return [...prev, todoData];
      });
      setTodoData(initialState);
    } else {
      alert("Please fill both title and description");
    }
  }

  function handleClearTodoList() {
    // to open "all tasks clear" button
    setIsClearModal(true);
  }

  function handleDelete(record) {
    // delete tasks on click delete button
    Modal.confirm({
      title: "Are you sure want to delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTodoList((prev) => prev.filter((item) => item.id !== record.id));
      },
    });
  }

  function handleEdit(record) {
    // to open modal of edit button
    setIsEditModal(true);
    setEditing(record);
  }

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serial",
      key: "id",
      sorter: (a, b) => a.serial - b.serial,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "id",
      sorter: (a, b) => a.title - b.title,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
      sorter: (a, b) => a.description - b.description,
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "id",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Due Date",
      dataIndex: "due",
      key: "id",
      sorter: (a, b) => a.due - b.due,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
    },
    {
      title: "Actions",
      key: "id",
      render: (record) => {
        return (
          <>
            <EditOutlined
              id={todoData.id}
              onClick={() => {
                handleEdit(record);
              }}
            />
            <DeleteOutlined
              id={todoData.id}
              onClick={() => {
                handleDelete(record);
              }}
              style={{ color: "red", marginLeft: 25 }}
            />
          </>
        );
      },
    },
  ];

  function clearAllTasks() {
    // modal button clear all
    setTodoList([]);
    setIsClearModal(false);
  }

  function editTask(e) {
    // modal button edit
    setIsEditModal(false);
    console.log(e.id);
    setTodoList((prev) => {
      return prev.map((item) => {
        if (
          (item.title.toLowerCase() !== e.title.toLowerCase() ||
            item.description.toLowerCase() !== e.title.toLowerCase()) &&
          item.id === e.id
        ) {
          return { ...item, ...editing };
        } else {
          return { ...item };
        }
      });
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditing((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div>
      <div className="top-container">
        <div className="input-container">
          <h1>Todo App</h1>
          <p>Create new task:</p>
          <input
            type="text"
            placeholder="Title"
            maxLength="100"
            className="title_input"
            name="title"
            ref={titleRef}
            value={todoData.title}
            onChange={handleTodoData}
          />
          <input
            type="text"
            placeholder="Description"
            maxLength="100"
            className="desc_input"
            name="description"
            ref={descRef}
            value={todoData.description}
            onChange={handleTodoData}
          />
          <div className="picker_input">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              className="due_input"
              name="due"
              min={new Date().toISOString().split("T")[0]}
              value={todoData.due}
              onChange={handleTodoData}
            />
            <label for="status">Status:</label>
            <select name="status" id="status" className="status_input" required>
              <option value="open">Open</option>
              <option value="working">Working</option>
              <option value="done">Done</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn add_btn" onClick={handleAddTodoList}>
            Add Task
          </button>
          <button className="btn clear_btn" onClick={handleClearTodoList}>
            Clear All Tasks
          </button>
        </div>
      </div>
      <Table
        dataSource={todoList}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ width: 800, margin: "0 auto" }}
      ></Table>
      <Modal
        title="Are you sure?"
        visible={isClearModal}
        onCancel={() => setIsClearModal(false)}
        onOk={() => clearAllTasks()}
      ></Modal>
      <Modal
        title="Edit Task"
        visible={isEditModal}
        id={editing.id}
        onCancel={() => setIsEditModal(false)}
        onOk={() => editTask(editing)}
      >
        <Input
          type="text"
          name="title"
          value={editing.title}
          onChange={handleEditChange}
        />
        <Input
          type="text"
          name="description"
          value={editing.description}
          onChange={handleEditChange}
        />
        <Input
          type="date"
          name="due"
          min={new Date().toISOString().split("T")[0]}
          value={editing.due}
          onChange={handleEditChange}
        />
      </Modal>
    </div>
  );
}

export default App;
