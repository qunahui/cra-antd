import React, { useState } from 'react';
import { Switch, Redirect, useHistory } from 'react-router-dom';
import { Layout, Menu, Row, Col, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import PrivateRoute from '../PrivateRoute';
import { routes } from '../../_routes';
import { useAuth } from 'contexts/auth';
import './styles.less';

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {
  const history = useHistory();
  const { isAuthenticated, user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  const renderRoutes = () =>
    routes.map((route) => (
      <PrivateRoute key={route.key || route.path} {...route} />
    ));

  return (
    <Layout>
      {isAuthenticated && (
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '4px 0',
            }}
          >
            <div
              className="site-logo"
              style={{
                backgroundImage: `url('/assets/png/logo.png')`,
              }}
              onClick={() => history.push('/')}
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
      )}
      <Layout className="site-layout">
        <Header
          className="site-layout-background header"
          style={{ padding: 0 }}
        >
          {!isAuthenticated && (
            <div
              className="site-logo"
              style={{
                backgroundImage: `url('/assets/png/logo.png')`,
                marginLeft: 10,
              }}
              onClick={() => history.push('/')}
            />
          )}
          {isAuthenticated && (
            <Row
              justify={'space-between'}
              style={{ padding: '0 24px', width: '100%' }}
            >
              <Col>
                <span className="trigger" onClick={toggleSider}>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </span>
              </Col>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Row gutter={10}>
                  <Col>{user.username}</Col>
                  <Col style={{ display: 'flex', alignItems: 'center' }}>
                    <Menu
                      className={'user-menu'}
                      triggerSubMenuAction={'click'}
                      mode={'vertical'}
                    >
                      <Menu.SubMenu
                        className={'user-submenu'}
                        key={'user-submenu'}
                        icon={
                          <Avatar
                            icon={<UserOutlined />}
                            size={'large'}
                            style={{
                              cursor: 'pointer',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          />
                        }
                        style={{ padding: 0 }}
                      >
                        <Menu.Item key="logout" onClick={() => logout()}>
                          Logout
                        </Menu.Item>
                      </Menu.SubMenu>
                    </Menu>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
          }}
        >
          <Switch>
            {renderRoutes()}
            <Redirect to="/404" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
