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
    setTodoList((prev) => prev.filter((item) => item.id !== record.id));
  }

  function handleEdit(record) {
    // to open modal of edit button
    console.log(record.title);
    setIsEditModal(true);
    setEditing(record.title);
  }

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serial",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "id",
      render: (title) => {
        return <a>{title}</a>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "id",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Actions",
      key: "8116",
      render: (record) => {
        return (
          <>
            <EditOutlined
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

  function editTask() {
    // modal button edit
    setIsEditModal(false);
  }

  return (
    <div>
      <div className="input-container">
        <h1>Todo App</h1>
        <input
          type="text"
          placeholder="Title"
          className="title_input"
          name="title"
          ref={titleRef}
          value={todoData.title}
          onChange={handleTodoData}
        />
        <input
          type="text"
          placeholder="Description"
          className="desc_input"
          name="description"
          ref={descRef}
          value={todoData.description}
          onChange={handleTodoData}
        />
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
        onCancel={() => setIsEditModal(false)}
        onOk={() => editTask()}
      >
        <Input value={editing} />
      </Modal>
    </div>
  );
}

export default App;
