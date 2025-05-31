import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Checkbox, Flex, FloatButton, Layout, message, Tag } from "antd";
import TodoFormModal from "../components/TodoFormModal";
import { hideLoading, showLoading } from "../redux/loadersSlice";
import { getAllTodoByOwner, updateTodo } from "../apicalls/todos";
import moment from "moment";
import DeleteTodoModal from "../components/DeleteTodoModal";

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const [todos, setTodos] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTodoByOwner({ user: user._id });
      console.log("allTodo response", response);

      if (response.success) {
        const allTodos = response.data;
        setTodos(
          allTodos.map(function (item) {
            return { ...item, key: `todo${item._id}` };
          })
        );
        console.log("Todo's", todos);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const handleEdit = (todo) => {
    setFormType("edit");
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  const handleComplete = async (id, isChecked) => {
    console.log("handleCheckbox", id, isChecked);
    try {
      const response = await updateTodo({
        todoId: id,
        completed: isChecked,
      });
      getData();
    } catch (err) {
      console.error("Failed to update todo status:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Flex gap="middle" wrap>
        <Layout style={{ width: 100, borderRadius: 8 }}>
          <h1
            className="m-0"
            style={{
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Todo's
          </h1>

          <FloatButton
            trigger="click"
            style={{ insetInlineEnd: 40 }}
            icon={<PlusOutlined />}
            tooltip={{
              title: "Add Todo",
              color: "blue",
              placement: "top",
            }}
            onClick={() => {
              setIsModalOpen(true);
              setFormType("add");
            }}
          />

          <Flex wrap gap="small" style={{ margin: 5 }}>
            {todos?.map((data, index) => (
              <Card
                key={index}
                size="small"
                title={
                  <span
                    style={{
                      textDecoration: data.completed ? "line-through" : "none",
                    }}
                  >
                    {data.title}
                  </span>
                }
                extra={
                  data.dueDate && (
                    <Tag color="magenta" style={{ margin: 8 }}>
                      {moment(data?.dueDate).format("DD-MM-YYYY")}
                    </Tag>
                  )
                }
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(data)} />,
                  <Checkbox
                    checked={data?.completed}
                    onChange={(e) => handleComplete(data._id, e.target.checked)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedTodo(data);
                    }}
                  />,
                ]}
                style={{
                  width: "auto",
                  opacity: data.completed ? 0.6 : 1, // Optional: make it faded
                  backgroundColor: data.completed ? "#f6ffed" : "white", // Optional: greenish tint for completed
                }}
              >
                <p>{data.task}</p>
              </Card>
            ))}
          </Flex>

          {isModalOpen && (
            <TodoFormModal
              isModalOpen={isModalOpen}
              selectedTodo={selectedTodo}
              setSelectedTodo={setSelectedTodo}
              setIsModalOpen={setIsModalOpen}
              formType={formType}
              getData={getData}
            />
          )}

          {isDeleteModalOpen && (
            <DeleteTodoModal
              isDeleteModalOpen={isDeleteModalOpen}
              selectedTodo={selectedTodo}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setSelectedTodo={setSelectedTodo}
              getData={getData}
            />

            // <DeletePropertyModal
            //   isDeleteModalOpen={isDeleteModalOpen}
            //   selectedProperty={selectedProperty}
            //   setIsDeleteModalOpen={setIsDeleteModalOpen}
            //   setSelectedProperty={setSelectedProperty}
            //   getData={getData}
            // />
          )}
        </Layout>
      </Flex>
    </>
  );
}

export default Dashboard;
