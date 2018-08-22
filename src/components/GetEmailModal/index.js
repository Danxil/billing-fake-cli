import React from 'react';
import { Modal, Form, Input } from 'antd';
import { compose, withHandlers } from 'recompose';

const FormItem = Form.Item;

const GetEmailModal = ({ handleSubmit, handleCancel, visible, form: { getFieldDecorator } }) => {
  return (
    <Modal
      visible={visible}
      title="Введите ваш email"
      okText="ОК"
      cancelText="Отмена"
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <Form layout="vertical">
        <FormItem label="Email">
          {
            getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Заполните это поле!' },
                { type: 'email', message: 'Не корректный email!' },
              ],
            })(
              <Input/>
            )
          }
        </FormItem>
      </Form>
    </Modal>
  );
};

export default compose(
  Form.create(),
  withHandlers({
    handleSubmit: ({ form, submit }) => (e) => {
      e.preventDefault();

      form.validateFields((err) => {
        if (!err) {
          submit()
        }
      });
    }
  }),
)(GetEmailModal);
