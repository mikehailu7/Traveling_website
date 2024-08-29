/* Authoer: Mikias Hailu and Yared Tsgie*/
import React, { useState, useEffect } from "react";
import HouseDetailPage from "./pages/place_detail/place";
import SearchPage from "./pages/Search/Search-pa";
import ProfilePage from "./pages/customer_profile/customer-page"
import axios from "axios";
import HomePage from "./pages/home/home-page";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SigninPage from "./pages/auth/signin-page";
import SignupPage from "./pages/auth/signup-page";
import HousePage from "./pages/place/place-page";
import ShowPage from "./pages/show/show-page";
import { Notification, Button } from "./ad-imports";
import "./App.css";

import mapboxgl from "mapbox-gl";

import { io } from "socket.io-client";

const NotFound = () => <div>Not found</div>;

const App = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hvZGFuaSIsImEiOiJja3I1aTVqeWYwMmxmMnByb2IwdTQ3bHQ5In0.xsuYlqV01wrdlTuRYHDqvA";
  if (!currentUser) {
    history.push("/signin");
  }
 /* token initiated*/
  const token = useSelector((state) => state.user.token);
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  const [socket, setSocket] = useState();
  useEffect(() => {
    const s = io("http://localhost:5440");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
 /*use effect initiated*/
  const openNotification = (data) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type='primary'
        size='small'
        onClick={() =>
          history.push({
            pathname: "/profile/visit",
            state: { user: data },
          })
        }>
        Checkout
      </Button>
    );
    Notification.open({
      btn,
      key,
      message: `New item from ${data.from}`,
      description: "A new item is added to my store. Please check them out!",
    });
  };

  useEffect(() => {
    if (socket && currentUser) {
      const { following } = currentUser;
      console.log(following);
      socket.emit("join", following);
      socket.on("receive-item-added", (userData) => {
        openNotification(userData);
      });
    }
  }, [socket]);

  return (
    <div className='App'>
      <Switch>
        <Route
          exact
          path='/'
          render={() =>
            currentUser ? <HomePage /> : <Redirect to='/signin' />
          }
        />
        <Route exact path='/search' component={SearchPage} />
        <Route
          exact
          path='/profile'
          render={() =>
            currentUser ? (
              <ProfilePage socket={socket} />
            ) : (
              <Redirect to='/signin' />
            )
          }
        />
        {/* route of sign in*/}
        <Route
          exact
          path='/profile/visit'
          render={() =>
            currentUser ? <ShowPage /> : <Redirect to='/signin' />
          }
        />
          {/* route of place page*/}
        <Route path='/houses/category' component={placePage} />
        <Route
          path='/houses/:houseId'
          render={() =>
            currentUser ? <HouseDetailPage /> : <Redirect to='/signin' />
          }
        />
          {/* route of sign in and sign up */}
        <Route
          exact
          path='/signin'
          render={() => (!currentUser ? <SigninPage /> : <Redirect to='/' />)}
        />
        <Route
          exact
          path='/signup'
          render={() => (!currentUser ? <SignupPage /> : <Redirect to='/' />)}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
