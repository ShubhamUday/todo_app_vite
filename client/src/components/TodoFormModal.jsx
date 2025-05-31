import { Button, Col, Form, Input, message, Modal, Row, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../apicalls/todos";
import { hideLoading, showLoading } from "../redux/loadersSlice";

function TodoFormModal({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedTodo,
  setSelectedTodo,
  getData,
}) {
  const { user } = useSelector((state) => state.user);
  const [isDueDateEnabled, setIseDueDateEnable] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const onFinish = async (values) => {
    let response = null;
    console.log("value", values);
    try {
      dispatch(showLoading());
      if (formType === "add") {
        values.userId = user._id;
        response = await addTodo(values);
      } else {
        response = await updateTodo({
          ...values,
          todoId: selectedTodo._id,
        });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(response.message);
    }
  };

  const onChange = (checked) => {
    setIseDueDateEnable(checked);
  };

  return (
    <>
      <Modal
      className="custom-modal"
        centered
        title={formType === "add" ? "Add Todo" : "Edit Todo"}
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <Form
          size="small"
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          style={{ width: "100%" }}
          initialValues={selectedTodo}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                htmlFor="title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input id="title" type="text" placeholder="Title" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                htmlFor="task"
                name="task"
                rules={[{ required: true }]}
              >
                <TextArea id="task" placeholder="Task" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Set Due Date" valuePropName="checked">
                <Switch onChange={onChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Due Date"
                name="dueDate"
                htmlFor="dueDate"
                rules={[
                  {
                    required: isDueDateEnabled,
                    message: "Please select a date",
                  },
                ]}
              >
                {/* <DatePicker disabled={!isDueDateEnabled} /> */}
                <Input id="dueDate" type="date" disabled={!isDueDateEnabled} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button block onClick={handleCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default TodoFormModal;
