/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPostsByUserId } from "../../backend-utils/houses-utils";
import { followUser, unFollowUser } from "../../backend-utils/user-utils";
import { onFetchUserStart } from "../../redux/customer/customer.creators";
import Header from "../../components/header/header-component";
import Footer from "../../components/footer/footer-component";
import { HorizontalCard } from "../../components/card/card-left-image-component";
import { UserOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Container } from "../../components/styled-reusable/styled-reusable";
import {
  Avatar,
  Row,
  Col,
  Skeleton,
  PageHeader,
  Button,
  Stat,
  Alert,
} from "../../ad-imports";
import Abay from "../../assets/place/abay.jpg";
import "./show-styles.scss";

export default function ShowPage() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { following } = currentUser;
  const [followStatus, setfollowStatus] = useState(["", ""]);

  const dispatch = useDispatch();

  if (!history.location.state.user) {
    history.goBack();
  }

  if (currentUser.id === history.location.state.user.id) {
    history.push("/profile");
  }
  useEffect(() => {
    setfollowStatus(["", ""]);
    setUser(history.location.state.user);
    setFetching(true);
    dispatch(onFetchUserStart());
    const fetchPosts = async () => {
      const posts = await getPostsByUserId(history.location.state.user.id);
      setPosts(posts.houses);
      setFetching(false);
    };
    fetchPosts();
  }, []);

  const follow = () => {
    const startFollow = async () => {
      const response = await followUser(user.id);
      if (response.error) {
        console.log(response.error);
        setfollowStatus(["", "Error subscribing"]);
        return;
      }
      setfollowStatus(["Successfully sbuscribed!", ""]);
      dispatch(onFetchUserStart());
    };
    startFollow();
  };
  const unFollow = () => {
    const startUnFollow = async () => {
      const response = await unFollowUser(user.id.trim());
      if (response.error) {
        console.log(response.error);
        setfollowStatus(["", "Error unsubscribing"]);
        return;
      }
      setfollowStatus(["Successfully unsbuscribed!", ""]);
      dispatch(onFetchUserStart());
    };
    startUnFollow();
  };

  return (
    <div>
      <Header />
      <Container>
        <div className='profile-header'>
          <div
            className='profile-cover'
            style={{
              backgroundImage: `url(${Abay})`,
            }}></div>
          <div className='profile-avatar'>
            <Avatar size={96} icon={<UserOutlined />} />{" "}
            <h1 style={{ marginLeft: "1rem", color: "white" }}>
              {`${user.firstname} ${user.lastname}`}
            </h1>
          </div>
        </div>
        <div className='profile-content'>
          <Row gutter={24}>
            <Col sm={24} md={6}>
              <PageHeader
                className='site-page-header'
                title={
                  <Stat
                    value='Contact Information'
                    title={following.includes(user.id) ? "S " : ""}
                  />
                }
              />
              <ul>
                <li>
                  <strong>Email: </strong>
                  {user.email}
                </li>
                <li>
                  <strong>Phone: </strong>
                  {user.phone}
                </li>
                <li>
                  <strong>Sold Items: </strong>
                  {user.soldItems}
                </li>
              </ul>
            </Col>
            <Col sm={24} md={18}>
              {followStatus[0] ? (
                <Alert
                  message='Success'
                  description={followStatus[0]}
                  type='success'
                  showIcon
                />
              ) : null}
              {followStatus[1] ? (
                <Alert
                  message='Error'
                  description={followStatus[1]}
                  type='error'
                  showIcon
                />
              ) : null}
              <PageHeader
                className='site-page-header'
                title='Recent Posts'
                extra={[
                  following.includes(user.id) ? (
                    <Button
                      key='33'
                      onClick={unFollow}
                      type='primary'
                      icon={<MinusOutlined />}>
                      Unsubscribe
                    </Button>
                  ) : (
                    <Button
                      key='34'
                      onClick={follow}
                      type='primary'
                      icon={<PlusOutlined />}>
                      Subscribe
                    </Button>
                  ),
                ]}
              />
              <Skeleton loading={fetching} active>
                {posts ? (
                  posts.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No posts.</p>
                  ) : (
                    posts.map((el) => (
                      <HorizontalCard key={el._id} item={el} hasAdd />
                    ))
                  )
                ) : null}
              </Skeleton>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
