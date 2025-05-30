import { Button, Col, DatePicker, Form, Input, Modal, Row, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useDispatch } from "react-redux";

function TodoFormModal({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedTodo,
  setSelectedTodo,
  getData,
}) {
  const [isDueDateEnabled, setIseDueDateEnable] = useState(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const onFinish = async (values) => {
    let response = null;
    try {
      dispatch(showLoading());
      if (formType === "add") {
        // values.role = "owner";
        // response = await addOwner(values);
      } else {
        // response = await updateOwner({
        //   ...values,
        //   ownerId: selectedOwner._id,
        // });
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
                name="Title"
                rules={[{ required: true }]}
              >
                <Input id="title" type="text" placeholder="Title"></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                htmlFor="task"
                name="Task"
                rules={[{ required: true }]}
              >
                <TextArea id="task" placeholder="Task" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Set Due Date"
                name="dueDate"
                rules={[{ message: "Please select a date" }]}
              >
                <Switch onChange={onChange}></Switch>
              </Form.Item>
            </Col>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[
                { required: isDueDateEnabled, message: "Please select a date" },
              ]}
            >
              <Col span={12}>
                <DatePicker disabled={!isDueDateEnabled} />
              </Col>
            </Form.Item>
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
