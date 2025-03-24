import React from "react";
import TaskManager from "./TaskManager"; // Import your Task Manager component
import { Layout } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are applied

const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "white", fontSize: "20px" }}>Task Manager</Header>
      <Content style={{ padding: "20px" }}>
        <TaskManager />
      </Content>
    </Layout>
  );
}

export default App;
