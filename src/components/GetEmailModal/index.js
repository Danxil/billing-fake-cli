import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Modal, Form, Input } from 'antd';
import { compose, withHandlers, withProps, withState } from 'recompose';

const FormItem = Form.Item;

const GetEmailModal = ({
  product,
  handleSubmit,
  handleCancel,
  visible,
  form: { getFieldDecorator },
  recaptchaRef,
  reacapchaCb,
}) => {
  return (
    <Modal
      visible={visible}
      title="Покупка купона"
      okText="ОК"
      cancelText="Отмена"
      onCancel={handleCancel}
      onOk={handleSubmit}
    >
      <Form layout="vertical">
        <div>
          <p>
            Купон: <strong>Скидка -20% на разработку продукта "{product}"</strong>
          </p>
          <p>
            После оплаты, в течении суток, наш менеджер свяжется с вами по указанному email-адресу для уточнения деталей по вашему проекту.
          </p>
          <p>
            Рекомендуем проверять папку "Спам"!
          </p>
        </div>
        <br/>
        <FormItem label="Ваш email">
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
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6LeuC5IUAAAAAKTwuNp2eketTKDRTCVJJjbRIVfx"
          onChange={reacapchaCb}
        />
      </Form>
    </Modal>
  );
};

export default compose(
  Form.create(),
  withProps({
    recaptchaRef: React.createRef(),
  }),
  withHandlers({
    reacapchaCb: ({ form, submit, recaptchaRef }) => () => {
      if (recaptchaRef.current.getValue()) {
        form.validateFields((err, values) => {
          if (!err) {
            submit(values);
            recaptchaRef.current.reset();
          }
        });
      } else {
        recaptchaRef.current.execute();
      }
    }
  }),
  withHandlers({
    handleSubmit: ({ reacapchaCb, recaptchaRef }) => (e) => {
      e.preventDefault();
      if (!recaptchaRef.current.getValue()) {
        recaptchaRef.current.execute();
      } else {
        reacapchaCb();
      }
    },
  }),
)(GetEmailModal);
