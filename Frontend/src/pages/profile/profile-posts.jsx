/* eslint-disable no-template-curly-in-string */
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from '@material-ui/core';
import { onPublishPostStart } from "../../redux/customer/customer.creators";
import { SelectOptionsInput } from "../../components/styled-reusable/styled-reusable";
import {
  PageHeader,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
} from "../../ad-imports";
import "./profile-styles.scss";
import UploadAvatar from "../../components/upload/UploadAvatar";

const { Item } = Form;
const { TextArea } = Input;

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function ProfilePosts({ socket }) {
  const user = useSelector((state) => state.user.currentUser);
  const categories = useSelector((state) =>
    state.house.categoryHouses.map((el) => el._id)
  );

  const [showModal, setShowModal] = useState(false);

  const [post, setPost] = useState({
    title: "",
    description: "",
    price: "",
    longitude: "",
    latitude: "",
    category: "",
    imageCover: {
      file: null,
      preview: "",
      value: ""
    },
    postedBy: user.id,
  });

  const ref = useRef(null);
  const dispatch = useDispatch();

  const {
    title,
    description,
    price,
    longitude,
    latitude,
    category,
    imageCover,
    postedBy,
  } = post;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleInput = (val, type) => {
    switch (type) {
      case "price":
        setPost({ ...post, price: val });
        break;
      case "category":
        setPost({ ...post, category: val });
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setPost({
      title: "",
      description: "",
      price: "",
      longitude: "",
      latitude: "",
      category: "",
      imageCover: "",
      postedBy: user.id,
    });
  };

  const sendNotification = (sender) => {
    if (socket) {
      socket.emit("notify-item-added", { id: sender.id, content: sender });
    }
  };

  const handleSubmit = async (e) => {
    if (ref) {

      ref.current.submit();

      const data = {
        latitude, longitude,
        title,
        description,
        price,
        imageCover,
        category,
        postedBy,
      };

      console.log(data);
      dispatch(onPublishPostStart(data));
      resetForm();
      sendNotification(user);

    }
  };

  const handlefile = async (e) => {
    const { name, value } = e.target;
    let file = e.target.files[0];

    if (file !== null) {

      const preview = URL.createObjectURL(file)
      const newobj = Object.assign({}, {
        file,
        preview: preview,
        value: value
      });

      setPost({
        ...post,
        [name]: newobj,
      });
      return;

    }
    else {

      setPost({
        ...post,
        [name]: {
          file: null,
          preview: "",
          value: ""
        },
      });

    }


    // const file = URL.createObjectURL(value)
    // console.log({ file })
    // const file = acceptedFiles[0];
    // console.log({ file })
    // if (file) {
    //   setPost('imageCover', {
    //     file,
    //     preview: URL.createObjectURL(file)
    //   });
    // }
    // const file = acceptedFiles[0];
    // if (file) {
    //   setFieldValue('avatarUrl', {
    //     file,
    //     preview: URL.createObjectURL(file)
    //   });
    // }
  }


  return (
    <div>

      <PageHeader
        className='site-page-header'
        title='My Posts'
        extra={[
          <Button key='35' type='primary' onClick={() => setShowModal(true)}>
            Add New Post
          </Button>,
        ]}
      />

      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
        title='House Post Form'
        footer={[
          <Button key='37' onClick={handleSubmit}>
            Post
          </Button>,
        ]}>

        <Form ref={ref} validateMessages={validateMessages}>

          <Item label='Title' rules={[{ required: true }]}>
            <Input
              name='title'
              placeholder='Enter title'
              value={title}
              onChange={handleChange}
            />
          </Item>

          <Item label='Price' rules={[{ required: true }]}>
            <InputNumber
              name='price'
              onChange={(e) => handleInput(e, "price")}
            />
          </Item>
          <Item label='Category'>
            <SelectOptionsInput
              label='Category'
              options={categories}
              onSelected={(e) => handleInput(e, "category")}
            />
          </Item>
          <Item label='House Image' rules={[{ required: true }]}>
            <Input
              name='imageCover'
              type="file"
              accept="image/*"
              value={imageCover.value}
              placeholder='Enter image url'
              onChange={handlefile}
            />

          </Item>

          <Item name='location' label='Location'>
            <Item
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}>
              <Input
                name='longitude'
                value={longitude}
                placeholder='Input Longitude'
                onChange={handleChange}
              />
            </Item>
            <Item
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}>
              <Input
                name='latitude'
                value={latitude}
                placeholder='Input Latitude'
                onChange={handleChange}
              />
            </Item>
          </Item>

          <Item label='Description' rules={[{ required: true }]}>
            <TextArea
              name='description'
              value={description}
              onChange={handleChange}
            />
          </Item>

        </Form>

      </Modal>

    </div>

  );
}
