import React from 'react';
import { Layout, Menu } from 'antd';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Main from '../Main';
import Products from '../Products';
import Contacts from '../Contacts';

import './index.css'

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout style={{ background: 'white' }}>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.50)', }}>
      <div className="logo">Web-Guru</div>
      <div className="menu">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <AnchorLink offset={70} href="#about">О нас</AnchorLink>
          </Menu.Item>
          <Menu.Item key="2">
            <AnchorLink offset={70} href="#products">Продукты</AnchorLink>
          </Menu.Item>
          <Menu.Item key="3">
            <AnchorLink offset={70} href="#contacts">Контакты</AnchorLink>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
    <Content style={{ marginTop: 64 }}>
      <section id="about">
        <Main />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="contacts">
        <Contacts />
      </section>
    </Content>
    <Footer className="footer">
      <div className="copyright">Web-Guru ©2018</div>
      <div></div>
    </Footer>
  </Layout>
);

export default App;
