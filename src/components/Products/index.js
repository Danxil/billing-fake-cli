import React from 'react';
import { Card, Col, Row, Button, message } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import './index.css'
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';
import GetEmailModal from '../GetEmailModal';
import Product from './Product';

const { Meta } = Card;

const PRODUCTS = [
  {
    image: '/corporate.jpg',
    title: 'Лендинг',
    description: 'Содержит описание преимуществ вашего продукта, ваши контакты, форму обратной связи подключенную к' +
      ' вашему email',
    price: 10,
  },
  {
    image: '/mobile-app.png',
    title: 'Мобильная версия сайта',
    description: 'Мобильная версия вашего сайта корректно работающего в на всех устройствах',
    price: 15,
  },
  {
    image: '/landing3.png',
    title: 'Корпоративный сайт',
    description: 'Сайт-визитка — это 1–10 страниц в интернете, которые полностью описывают основную информацию о вас' +
      ' + админ-панель из которой вы можете управлять сайтом',
    price: 25,
  },
  {
    image: '/ecommerce.png',
    title: 'Интернет магазин',
    description: 'Интернет-магазин на базе wordpress. С функцианалом добавления товаров, совершения покупок,' +
      ' выгрузки отчетности',
    price: 50,
  },
];

const Products = ({ product, visible, byCoupon, cancelByCoupon, submit }) => (
  <Container className="products">
    <PageTitle>Продукты</PageTitle>
    <div>Приобретая купон, вы получите скидку в размере 20% на разработку выбранного вами продукта!</div>
    <Row type="flex" justify="center">
      {
        PRODUCTS.map((item, index) => (
          <Product
            key={`product-${index}`}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            byCoupon={byCoupon}
          />
        ))
      }
    </Row>
    <GetEmailModal product={product} visible={visible} handleCancel={cancelByCoupon} submit={submit} />
  </Container>
);

export default compose(
  withState('visible', 'setVisible', false),
  withState('product', 'setProduct', null),
  withState('price', 'setPrice', null),
  withHandlers({
    byCoupon: ({ setVisible, setProduct, setPrice }) => ({ product, price }) => {
      setProduct(product);
      setPrice(price);
      setVisible(true)
    },
    cancelByCoupon: ({ setVisible, setProduct, setPrice }) => () =>{
      setVisible(false);
    },
    submit: ({ setVisible, setProduct, setPrice, product, price }) => (values) => {
      // setVisible(false);
      fetch('http://localhost:4000/by', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, product, price }),
      });
      message.success('Ожидайте письма от нашего менеджера!');
      setVisible(false);
    },
  })
)(Products);
