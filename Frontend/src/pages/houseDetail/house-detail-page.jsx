/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { postReview } from "../../backend-utils/review-utils";
import { getOneHouse } from "../../backend-utils/houses-utils";
import Header from "../../components/header/header-component";
import Footer from "../../components/footer/footer-component";
import {
  Container,
  SelectOptionsInput,
  CustomButton,
} from "../../components/styled-reusable/styled-reusable";

import ImagesDisplay from "../../components/houseDetailCard/image-display.component";
import ItemInfo from "../../components/houseDetailCard/item-info.component";
import SingleReview from "../../components/singleReview/single-review.component";
import {
  PageHeader,
  Button,
  Row,
  Col,
  Alert,
  Form,
  Input,
  Select,
} from "../../antd-imports";
import "./house-detail-styles.scss";

import MapModal from "../../components/mapModal/map-component";
const { Item } = Form;
const { TextArea } = Input;

const HouseDetail = () => {
  const { houseId } = useParams();
  const history = useHistory();

  const [reviewStatus, setReviewStatus] = useState(["", ""]);
  const [houseError, setHouseError] = useState(null);
  const [house, setHouse] = useState({});
  const { reviews, location, postedBy } = house;

  const [form] = Form.useForm();

  useEffect(() => {
    setReviewStatus(["", ""]);
    const getHouse = async () => {
      const house = await getOneHouse(houseId);
      if (house.error) {
        setHouseError(house.error);
        return;
      }

      setHouse(house.house);
    };
    getHouse();
  }, []);

  const handleUserSubmit = async (data) => {
    postReview(houseId, data)
      .then((r) => {
        console.log(r);
        setReviewStatus(["", "Unable to submit review!"]);
        form.resetFields();
      })
      .catch((e) => {
        setReviewStatus(["Review submitted successfully!", ""]);
        console.log(e);
      });
  };

  const [mapShow, setMapShow] = useState(false);

  return (
    <div>
      <Header />
      <Container>
        {houseError && house ? (
          <Alert
            message='Error'
            description='Unable to get house.'
            type='error'
            showIcon
          />
        ) : (
          <div>
            <MapModal
              show={mapShow}
              handleOk={() => setMapShow(false)}
              handleCancel={() => setMapShow(false)}
              location={location}
            />
            <PageHeader
              className='site-page-header'
              onBack={() => history.goBack()}
              title={house.title}
              subTitle={` ${
                house.postedBy ? "From: " + house.postedBy.firstname : ""
              }`}
              extra={[
                <Button
                  key='11'
                  onClick={() => {
                    if (postedBy)
                      return history.push({
                        pathname: "/profile/visit",
                        state: { user: house.postedBy },
                      });
                    return;
                  }}>
                  Visit Supplier
                </Button>,
                <Button
                  key='12'
                  type='primary'
                  onClick={() => setMapShow(true)}>
                  Show On Map
                </Button>,
              ]}
            />
            <div className='item-detail-card'>
              <Row>
                <Col sm={24} md={12}>
                  <ImagesDisplay images={[house.imageCover]} horizontal />
                </Col>
                <Col sm={24} md={12}>
                  <ItemInfo item={house} />
                </Col>
              </Row>
              <div className='item-reviews'>
                <h2>Reviews</h2>
                {reviewStatus[1] ? (
                  <Alert
                    message='Error'
                    description='Unable to post review.'
                    type='error'
                    showIcon
                  />
                ) : null}
                {reviewStatus[0] ? (
                  <Alert
                    message='Review submitted successfully!.'
                    type='success'
                    showIcon
                  />
                ) : null}
                <div className='reviews'>
                  <div className='review-list'>
                    <div className='review-sort'>
                      <SelectOptionsInput
                        label='Sort By'
                        options={[
                          "newest",
                          "oldest",
                          "high rating",
                          "low rating",
                        ]}
                        onChange
                      />
                    </div>
                    {reviews ? (
                      <div className='load-reviews'>
                        {reviews.length === 0
                          ? "No reviews yet! Care to give one?"
                          : reviews.map((el) => (
                              <SingleReview key={el.id} review={el} />
                            ))}
                      </div>
                    ) : null}
                    {/* <Button size='10'>Load More Reviews</Button> */}
                  </div>
                  <div className='review-input'>
                    <div>
                      <h3 className='h4 pb-2'>Write a review</h3>
                      <Form
                        form={form}
                        name='user-change'
                        layout='vertical'
                        onFinish={handleUserSubmit}>
                        <Item
                          label='Title'
                          name='title'
                          rules={[
                            {
                              required: true,
                              message: "Please input title!",
                            },
                          ]}>
                          <Input placeholder='input title' />
                        </Item>
                        <Item
                          label='Rating'
                          name='rating'
                          rules={[
                            {
                              required: true,
                              message: "Please input rating!",
                            },
                          ]}>
                          <Select>
                            <Select.Option value='5'>5</Select.Option>
                            <Select.Option value='4'>4</Select.Option>
                            <Select.Option value='3'>3</Select.Option>
                            <Select.Option value='2'>2</Select.Option>
                            <Select.Option value='1'>1</Select.Option>
                          </Select>
                        </Item>
                        <Item
                          label='Write Comment'
                          name='comment'
                          rules={[{ required: true }]}>
                          <TextArea name='description' />
                        </Item>
                        <CustomButton
                          htmlType='submit'
                          color='white'
                          className='mt-4 px-4'>
                          Submit Review
                        </CustomButton>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default HouseDetail;
