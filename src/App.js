import "./App.css";
import "antd/dist/antd.css";
import { Table, Modal } from "antd";
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

  const [todoData, setTodoData] = useState(initialState);
  const [todoList, setTodoList] = useState([]);
  const titleRef = useRef();
  const descRef = useRef();

  function handleTodoData(e) {
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

  function handleTodoList() {
    if (titleRef.current.value.length > 0 && descRef.current.value.length > 0) {
      setTodoList((prev) => {
        return [...prev, todoData];
      });
      setTodoData(initialState);
    } else {
      alert("Please fill both title and description");
    }
  }

  function handleDelete(record) {
    setTodoList((prev) => prev.filter((item) => item.id !== record.id));
  }

  function handleEdit(record) {}

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
        <button className="add_btn" onClick={handleTodoList}>
          Add Task
        </button>
      </div>
      <Table
        dataSource={todoList}
        columns={columns}
        style={{ width: 800, margin: "0 auto" }}
      ></Table>
    </div>
  );
}

export default App;
