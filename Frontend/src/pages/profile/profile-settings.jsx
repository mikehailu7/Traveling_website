/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUser,
  changePassword,
  getUser,
} from "../../backend-utils/user-utils";
import { setCurrentUser } from "../../redux/user/userAction.creators";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components/styled-reusable/styled-reusable";
import {
  PageHeader,
  Button,
  Input,
  Row,
  Col,
  Form,
  Alert,
} from "../../antd-imports";
const { Item } = Form;

export default function ProfileSettings() {
  const user = useSelector((state) => state.user.currentUser);
  const [userStatus, setuserStatus] = useState(["", ""]);
  const [passwordStatus, setpasswordStatus] = useState(["", ""]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const cleanError = () => {
    setuserStatus(["", ""]);
    setpasswordStatus(["", ""]);
  };

  useEffect(() => {
    form.setFieldsValue({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    });
    cleanError();
  }, []);

  const handlePasswordChange = async (data) => {
    cleanError();
    const user = await changePassword(data);
    if (user.error) {
      setuserStatus(["", user.error]);
      return;
    }
    setuserStatus(["Password changed successfully!", ""]);
  };

  const handleUserSubmit = async (data) => {
    cleanError();
    const user = await updateUser(data);
    if (user.error) {
      setuserStatus(["", user.error]);
      return;
    }
    setuserStatus(["Profile updated successfully!", ""]);
    const updatedUser = await getUser();
    if (user.error) {
      return;
    }
    dispatch(setCurrentUser(updatedUser.user));
  };
  return (
    <div>
      <PageHeader
        className='site-page-header'
        title='Settings'
        extra={[
          <Button key='3' type='danger'>
            Delete My Account
          </Button>,
        ]}
      />
      <Row gutter={24}>
        <Col sm={24} md={14}>
          {userStatus[0] ? (
            <Alert
              message='Success'
              description={userStatus[0]}
              type='success'
              showIcon
            />
          ) : null}
          {userStatus[1] ? (
            <Alert
              message='Error'
              description={userStatus[1]}
              type='error'
              showIcon
            />
          ) : null}
          <Form form={form} name='user-change' onFinish={handleUserSubmit}>
            <Item
              label='First Name'
              name='firstname'
              rules={[{ required: true, message: "Please input first name!" }]}>
              <Input placeholder='input first name' />
            </Item>

            <Item
              label='Last Name'
              name='lastname'
              rules={[{ required: true, message: "Please input last name!" }]}>
              <Input placeholder='input last name' />
            </Item>
            <Item
              label='Email'
              name='email'
              rules={[{ required: true, message: "Please input email!" }]}>
              <Input type='email' placeholder='input email' />
            </Item>
            <Item
              label='Phone Number'
              name='phone'
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}>
              <Input placeholder='input phone number' />
            </Item>

            <CustomButton htmlType='submit' color='white' className='mt-4 px-4'>
              Update
            </CustomButton>
          </Form>
        </Col>
        <Col sm={24} md={10}>
          {passwordStatus[0] ? (
            <Alert
              message='Success'
              description={passwordStatus[0]}
              type='success'
              showIcon
            />
          ) : null}
          {passwordStatus[1] ? (
            <Alert
              message='Error'
              description={passwordStatus[1]}
              type='error'
              showIcon
            />
          ) : null}
          <Form name='password-change' onFinish={handlePasswordChange}>
            <Item
              label='Old Password'
              name='oldPassword'
              rules={[
                { required: true, message: "Please input old password!" },
              ]}>
              <Input.Password />
            </Item>
            <Item
              label='New Password'
              name='newPassword'
              rules={[
                { required: true, message: "Please input new password!" },
              ]}>
              <Input.Password />
            </Item>

            <Item>
              <CustomButton
                htmlType='submit'
                color='white'
                className='mt-4 px-4'>
                Change Password
              </CustomButton>
            </Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
