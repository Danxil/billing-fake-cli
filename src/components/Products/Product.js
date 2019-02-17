import React from 'react';
import { Card, Col, Button } from 'antd';
import { compose } from 'recompose';

const { Meta } = Card;

const Product = ({ byCoupon, image, title, description, price }) => (
  <Col span={6}>
    <div className="product">
      <Card
        cover={<img alt="example" src={image} />}
        actions={[<Button type="primary" onClick={() => byCoupon({ product: title, price })} id={title} ghost>Купить купон</Button>]}
      >
        <Meta
          title={title}
          description={description}
        />
        <div className="price">{price}$</div>
      </Card>
    </div>
  </Col>
);

export default Product;
