import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      message.error("Failed to load tasks");
    }
    setLoading(false);
  };

  const handleCreate = async (values) => {
    try {
      await axios.post(API_URL, values);
      message.success("Task created successfully");
      fetchTasks();
    } catch (error) {
      message.error("Failed to create task");
    }
  };

  const handleExecute = async (taskId) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}/execute`);
      setSelectedTask(response.data);
      setIsModalVisible(true);
    } catch (error) {
      message.error("Execution failed");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Command", dataIndex: "command", key: "command" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleExecute(record.id)}>
          Execute
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <Form form={form} onFinish={handleCreate} layout="inline">
        <Form.Item name="name" rules={[{ required: true, message: "Enter task name" }]}> 
          <Input placeholder="Task Name" />
        </Form.Item>
        <Form.Item name="command" rules={[{ required: true, message: "Enter command" }]}> 
          <Input placeholder="Command" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Task</Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={tasks} loading={loading} rowKey="id" style={{ marginTop: 20 }} />
      <Modal
        title="Task Execution Result"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedTask && <p>Output: {selectedTask.output}</p>}
      </Modal>
    </div>
  );
};

export default TaskManager;
