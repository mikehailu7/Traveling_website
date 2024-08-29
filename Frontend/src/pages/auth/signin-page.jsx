import React, { useState, useEffect } from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import "./auth-styles.scss";
import {
  FormInput,
  FormCheckBox,
  CustomButton,
  LogoDecor,
} from "../../components/styled-reusable/styled-reusable";
import Logo from "../../assets/logo.png";
import Paris from "../../assets/place/paris.jpg";
import Rome from "../../assets/place/rome.jpg";
import Addis from "../../assets/place/addis.jpg";


import {
  emailLoginStart,
  clearUserError,
} from "../../redux/user/userAction.creators";
import { selectAuthError } from "../../redux/user/user.selectors";
import { Row, Col } from "../../antd-imports";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
SwiperCore.use(Autoplay);

const SigninComponent = ({ startEmailLogin, authError }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
    error: "",
  });
  const { email, password, rememberMe, error } = credentials;

  useEffect(() => {
    setCredentials({ email: "", password: "", rememberMe: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleErrors = (msg) => {
    setCredentials({ ...credentials, error: msg });
  };
  const handleChecked = (e) => {
    setCredentials({ ...credentials, rememberMe: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      handleErrors("All fields are required!");
      return;
    }
    if (!validator.isEmail(email)) {
      handleErrors("Invalid email format!");
      return;
    }

    startEmailLogin(email, password);
  };

  return (
    <div className=''>
      <Row>
        <Col xs={0} sm={0} md={10} lg={12}>
          <div className='logo-decoder'>
            <LogoDecor name='Alx' />
          </div>
          <Swiper
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            centeredSlides
            spaceBetween={0}
            slidesPerView={1}>
            <SwiperSlide>
              <div
                className='slide-bg'
                style={{ backgroundImage: `url(${Paris})` }}></div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className='slide-bg'
                style={{ backgroundImage: `url(${Addis})` }}></div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className='slide-bg'
                style={{ backgroundImage: `url(${Rome})` }}></div>
            </SwiperSlide>
          </Swiper>
        </Col>
        <Col sm={24} md={14} lg={12}>
          <div className='auth-form-container'>
            <img
              style={{ height: "60px", marginTop: "-1rem" }}
              src={Logo}
              alt='brand'
            />
            <h3 className='display-5 mt-3'>Sign In</h3>
            <p className='text-muted mb-4'>Welcome back to Alx-Travel!</p>
            {<small className='text-danger '>{authError}</small>}
            {<small className='text-danger '>{error}</small>}
            <form
              onSubmit={handleSubmit}
              className='needs-validation'
              noValidate>
              <FormInput
                label='Email'
                type='email'
                name='email'
                required
                value={email}
                onChange={handleChange}
              />
              <FormInput
                label='Password'
                type='password'
                name='password'
                required
                value={password}
                onChange={handleChange}
              />
              <FormCheckBox
                label='Remember Me'
                name='rememberMe'
                value={rememberMe}
                onChange={handleChecked}
              />
              <CustomButton type='submit' color='white' className='mt-4 px-4'>
                Login
              </CustomButton>

              <div className='text-center d-flex justify-content-between mt-4'>
                <p>
                  Don't have an account yet?{" "}
                  <Link to='/signup' className='font-italic text-muted'>
                    <u>Register</u>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  authError: selectAuthError,
});

const mapDispatchToProps = (dispatch) => ({
  startEmailLogin: (email, password) =>
    dispatch(emailLoginStart({ email, password })),
  clearErrors: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninComponent);
