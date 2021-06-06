import React from "react";
import { Button, Typography, Layout, Divider, Input, List, Space } from "antd";
import "./App.less";
import logo from "./entree-logo.svg";
import illustration from "./illustration.svg";

const { Title, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const landingPage = () => {
  return (
    <Layout className="layout">
      <Header style={{ backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="EntreE" style={{ width: "110px" }} />
          <Space align="center" size={0}>
            {/* <Search placeholder="input search text" style={{ float: "left" }} /> */}
            <Button
              type="text"
              // shape="round"
              onClick={() => console.log("clicked")}
            >
              Sign in
            </Button>{" "}
            <Button
              // key="1"
              type="primary"
              shape="round"
              // style={{ backgroundColor: "#5F3CC8", border: "#5F3CC8" }}
              onClick={() => console.log("clicked")}
            >
              Sign up
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: "100px 0", backgroundColor: "white" }}>
        <div align="center">
          <Space size={50}>
            <Space size={20} direction="vertical" align="start">
              <div style={{ width: "350px", textAlign: "left" }}>
                <span className="title">
                  Start your business with{" "}
                  <span
                    style={{
                      color: "#666AF6",
                      fontFamily: "Century Gothic",
                    }}
                  >
                    Entre
                  </span>
                  <span
                    style={{
                      color: "#666AF6",
                    }}
                  >
                    E
                  </span>
                </span>
              </div>
              <Button
                // key="1"
                type="primary"
                shape="round"
                size="large"
                onClick={() => console.log("clicked")}
              >
                <span>
                  Get started for free
                  {/* <span style={{ fontFamily: "Century Gothic Bold" }}> FREE</span>{" "} */}
                </span>
              </Button>
            </Space>
            <img
              src={illustration}
              alt="illustration"
              style={{ width: "360px" }}
            />
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

export default landingPage;
