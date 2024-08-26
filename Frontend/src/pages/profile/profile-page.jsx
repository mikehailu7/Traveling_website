/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onFetchPostStart,
  onDeletePostStart,
} from "../../redux/user/userAction.creators";
import Header from "../../components/header/header-component";
import Footer from "../../components/footer/footer-component";
import ProfilePosts from "./profile-posts";
import ProfileSettings from "./profile-settings";
import { HorizontalCard } from "../../components/card/card-left-image-component";
import { UserOutlined } from "@ant-design/icons";
import { Container } from "../../components/styled-reusable/styled-reusable";
import { Avatar, Tabs, PageHeader } from "../../antd-imports";
import "./profile-styles.scss";

import livingRoom from "../../assets/house/house1.jpg";
const { TabPane } = Tabs;

export default function ProfilePage({ socket }) {
  const wishlists = useSelector((state) => state.wishlist.wishlists);
  let user = useSelector((state) => state.user.currentUser);
  const posts = useSelector((state) => state.user.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onFetchPostStart());
  }, []);

  const deletePost = (id) => {
    dispatch(onDeletePostStart(id));
  };

  return (
    <div>
      <Header />
      <Container>
        <div className='profile-header'>
          <div
            className='profile-cover'
            style={{
              backgroundImage: `url(${user.avatar ? user.avatar : livingRoom})`,
            }}></div>
          <div className='profile-avatar'>
            <Avatar size={96} icon={<UserOutlined />} />{" "}
            <h1 style={{ marginLeft: "1rem", color: "white" }}>
              {`${user.firstname} ${user.lastname}`}
            </h1>
          </div>
        </div>
        <div className='profile-content'>
          <Tabs tabPosition='left'>
            <TabPane tab='Wishlist' key='13'>
              <PageHeader className='site-page-header' title='Wish Lists' />
              {!wishlists
                ? "No items in the wishlist"
                : wishlists.map((el) => (
                    <HorizontalCard key={el._id} item={el} hasRemove />
                  ))}
            </TabPane>
            <TabPane tab='Settings' key='14'>
              <ProfileSettings />
            </TabPane>
            <TabPane tab='Posts' key='15'>
              <ProfilePosts socket={socket} />
              {!posts
                ? "You didn't post any house yet."
                : posts.map((el) => (
                    <HorizontalCard
                      key={el._id}
                      item={el}
                      removePost
                      deletePost={deletePost}
                    />
                  ))}
            </TabPane>
          </Tabs>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
