import { Form, Input, Modal } from 'antd';
import InputMask from 'react-input-mask';

const CartModal = ({ isModalOpen, onClose, form, onOk }) => {
  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          okText="Submit"
          onOk={onOk}
          okButtonProps={{ type: 'null' }}
          onCancel={onClose}
          title="Fill Out The Form to Make An Order"
        >
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'This field cannot be empty!',
                },
                {
                  pattern: /^\+380\d{3}\d{2}\d{2}\d{2}$/,
                  message:
                    'The Number You Entered Does Not Match The Pattern +380XXXXXXXXX!',
                },
              ]}
            >
              <InputMask mask="+380-999-999-999" maskChar={null}>
                {inputProps => (
                  <Input {...inputProps} placeholder="+380XXXXXXXXX" />
                )}
              </InputMask>
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'This field cannot be empty!',
                },
              ]}
            >
              <Input placeholder="Kyiv, Hrechatyk St.44" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default CartModal;
