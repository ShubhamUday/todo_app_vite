import { message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../apicalls/todos";
import { hideLoading, showLoading } from "../redux/loadersSlice";

function DeleteTodoModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTodo,
  setSelectedTodo,
  getData,
}) {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const todoId = selectedTodo._id;

      const response = await deleteTodo({ data: { todoId } });

      // console.log(todoId, response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        setSelectedTodo(null);
      }
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      setIsDeleteModalOpen(false);
      message.error(err.messagae);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <>
      <Modal
        title="Delete Todo?"
        open={isDeleteModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">Are you sure you want to delete this todo?</p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this todo data.
        </p>
      </Modal>
    </>
  );
}

export default DeleteTodoModal;
