import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import AdminProductData from './AdminProductData';
import UserAdminData from './UserAdminData';
import { MenuInfo } from 'rc-menu/es/interface';
const { Sider, Content } = Layout;
type MenuItemKey = '1' | '2';

export const AdminPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); 
  const onCollapse = (collapsed: boolean | ((prevState: boolean) => boolean)) => {
    setCollapsed(collapsed);
  };

  const handleMenuClick = (e: MenuInfo) => {
    setSelectedKey(e.key as MenuItemKey);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
          All Items 
          </Menu.Item>
          <Menu.Item key="2" icon={<LaptopOutlined />}>
            user Data
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            {selectedKey === '1' && <AdminProductData />}
            {selectedKey === '2' && <UserAdminData />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};