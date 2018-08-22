import React from 'react';
import { compose, withHandlers } from 'recompose';
import { Form, Input, Button, notification } from 'antd';
import './index.css'
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';

const FormItem = Form.Item;
const { TextArea } = Input;

const Contacts = ({ form: { getFieldDecorator }, handleSubmit }) => {
  return (
    <Container className="contacts">
      <PageTitle>Контакты</PageTitle>
      <Form onSubmit={handleSubmit} className="contact-form">
        <FormItem>
          {
            getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Заполните это поле!' },
                { type: 'email', message: 'Не корректный email!' },
              ],
            })(
              <Input placeholder="Ваш email" />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('message', {
              rules: [{ required: true, message: 'Заполните это поле!' }],
            })(
              <TextArea placeholder="Ваш вопрос" rows={5} />
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </FormItem>
      </Form>
    </Container>
  )
};

export default compose(
  Form.create(),
  withHandlers({
    handleSubmit: ({ form }) => (e) => {
      e.preventDefault();

      form.validateFields((err) => {
        if (!err) {
          notification.open({
            message: 'Спасибо!',
            description: 'Спасибо! В ближайшее время мы вам ответим!',
          });
        }
      });
    }
  }),
)(Contacts);
