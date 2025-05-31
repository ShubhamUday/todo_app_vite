import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Checkbox, Col, Divider, Flex, FloatButton, Input, Layout, message, Radio, Tag } from "antd";
import TodoFormModal from "../components/TodoFormModal";
import { hideLoading, showLoading } from "../redux/loadersSlice";
import { getAllTodoByOwner, updateTodo } from "../apicalls/todos";
import moment from "moment";
import DeleteTodoModal from "../components/DeleteTodoModal";

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const [todos, setTodos] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [searchTodo, setSearchTodo] = useState("");
  const [filterTodo, setFilterTodo] = useState("allTodo");

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
      <Flex gap="middle" wrap justify="center">
        <Layout
          style={{
            width: 100,
            padding: 24,
            borderRadius: 12,
            background: "rgba(15, 225, 248, 0.49)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Flex
            wrap
            align="center"
            justify="space-between"
            style={{ marginTop: 16, gap: 12 }}
          >
            <Col span={12}>
              <Input
                size="small"
                placeholder="Search todo..."
                allowClear
                style={{ flex: 1, minWidth: 200 }}
                value={searchTodo}
                onChange={(e) => setSearchTodo(e.target.value)}
              />
            </Col>

            <Flex align="center" gap="small">
              <Radio.Group
                value={filterTodo}
                onChange={(e) => setFilterTodo(e.target.value)}
                // buttonStyle="solid"
                size="large"
              >
                <Radio.Button value="active">Active</Radio.Button>
                <Radio.Button value="completed">Completed</Radio.Button>
                <Radio.Button value="allTodo">All</Radio.Button>
              </Radio.Group>
            </Flex>
          </Flex>
          <Divider />

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
            {todos
              ?.filter((todo) => {
                const search = searchTodo.toLowerCase();
                const matchesSearch =
                  todo.title.toLowerCase().includes(search) ||
                  todo.task.toLowerCase().includes(search);

                const matchesFilter =
                  filterTodo === "allTodo" ||
                  (filterTodo === "active" && !todo.completed) ||
                  (filterTodo === "completed" && todo.completed);

                return matchesSearch && matchesFilter;
              })
              .map((data, index) => (
                <Card
                  key={index}
                  size="small"
                  title={
                    <span
                      style={{
                        textDecoration: data.completed
                          ? "line-through"
                          : "none",
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
                    <EditOutlined
                      key="edit"
                      onClick={() => handleEdit(data)}
                    />,
                    <Checkbox
                      checked={data?.completed}
                      onChange={(e) =>
                        handleComplete(data._id, e.target.checked)
                      }
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
                  <div style={{ marginTop: 8 }}>
                    <Tag color="blue">
                      Created: {moment(data.createdAt).format("DD-MM-YYYY")}
                    </Tag>
                    <Tag color="green">
                      Updated: {moment(data.updatedAt).format("DD-MM-YYYY")}
                    </Tag>
                  </div>
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
