import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { FloatButton, message } from "antd";
import TodoFormModal from "../components/TodoFormModal";
import { hideLoading, showLoading } from "../redux/loadersSlice";

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const [formType, setFormType] = useState("add");

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      //   const response = await getAllOwner();
      if (response.success) {
        // const allOwners = response.data;
        // setOwners(
        //   allOwners.map(function (item) {
        //     return { ...item, key: `owner${item._id}` };
        //   })
        // );
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
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
    </>
  );
}

export default Dashboard;
