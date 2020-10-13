import React from 'react';
import { Row, Col, Menu, Input, List, Avatar } from 'antd';
import {
  MessageOutlined,
  HomeOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const { Search } = Input;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function Main(props) {
  return (
    <div>
      <Row>
        <Col span={7}>
          <div className="left_sidebar">
            <div className="left_app_title">
              <p>Viewbook</p>
            </div>
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}>
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                Profile
              </Menu.Item>
              <Menu.Item key="3" icon={<MessageOutlined />}>
                Chats
              </Menu.Item>
              <Menu.Item key="4" icon={<LogoutOutlined />}>
                Logout
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col span={10}> </Col>
        <Col span={7}>
          <div className="right_sidebar">
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              style={{ width: 200 }}
            />
            <div className="chats_wrap">
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="/">{item.title}</a>}                      
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Main;