import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import './index.css'
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';
import GetEmailModal from '../GetEmailModal';

const { Meta } = Card;

const PRODUCTS = [
  {
    image: '/landing1.jpg',
    title: 'Мини лендинг',
    description: 'Базовая промо страница. Содержит описание преимуществ вашего продукта и ваши контакты',
    price: 5,
  },
  {
    image: '/landing3.png',
    title: 'Лендинг',
    description: 'Содержит описание преимуществ вашего продукта, ваши контакты, форму обратной связи подключенную к' +
      ' вашему email',
    price: 10,
  },
  {
    image: '/landing2.jpg',
    title: 'Макси лендинг',
    description: 'Содержит описание преимуществ вашего продукта, ваши контакты, возможность совершить покупку прямо' +
      ' с сайта!',
    price: 15,
  },
  {
    image: '/mini-corporate.jpg',
    title: 'Корпоративный мини-сайт',
    description: 'Сайт-визитка — это 1–10 страниц в интернете, которые полностью описывают основную информацию о вас, предлагаемых услугах и способах связи с вами.',
    price: 20,
  },
  {
    image: '/corporate.jpg',
    title: 'Корпоративный сайт',
    description: 'Сайт-визитка — это 1–10 страниц в интернете, которые полностью описывают основную информацию о вас' +
      ' + админ-панель из которой вы можете управлять сайтом',
    price: 25,
  },
  {
    image: '/max-corporate.jpg',
    title: 'Корпоративный макси-сайт',
    description: 'Сайт-визитка — это 1–10 страниц в интернете, которые полностью описывают основную информацию о' +
      ' вас. Так же есть возможность оформить и оплатить заказ прямо на сайте!',
    price: 30,
  },
  {
    image: '/mobile-app.png',
    title: 'Мобильное приложение',
    description: 'Мобильная версия сайта корректно работающего в на всех устройствах!',
    price: 30,
  },
  {
    image: '/ecommerce.png',
    title: 'Интернет магазин',
    description: 'Интернет-магазин на базе wordpress. Со функцианалом добавления товаров, совершения покупок,' +
      ' выгрузки отчетности и т.д.',
    price: 40,
  },
];

const Products = ({ visible, byCoupon, cancelByCoupon, submit }) => (
  <Container className="products">
    <PageTitle>Продукты</PageTitle>
    <div>Приобретая купон, вы получите скидку в размере 20% на разработку выбранного вами продукта!</div>
    <Row>
      {
        PRODUCTS.map((item, index) => (
          <Col span={6} key={`product-${index}`}>
            <div className="product">
              <Card
                cover={<img alt="example" src={item.image} />}
                actions={[<Button type="primary" onClick={byCoupon} ghost>Купить купон</Button>]}
              >
                <Meta
                  title={item.title}
                  description={item.description}
                />
                <div className="price">{item.price}$</div>
              </Card>
            </div>
          </Col>
        ))
      }
    </Row>
    <GetEmailModal visible={visible} handleCancel={cancelByCoupon} submit={submit} />
  </Container>
);

export default compose(
  withState('visible', 'setVisible', false),
  withHandlers({
    byCoupon: ({ setVisible }) => () => setVisible(true),
    cancelByCoupon: ({ setVisible }) => () => setVisible(false),
    submit: ({ setVisible }) => () => {
      setVisible(false);
    },
  })
)(Products);
