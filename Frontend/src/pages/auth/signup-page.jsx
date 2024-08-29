import React, { Component } from "react";
import validator from "validator";
import {
  FormInput,
  FormPhone,
  CustomButton,
  LogoDecor,
} from "../../components/styled-reusable/styled-reusable";
import Logo from "../../assets/logo.png";
import { registerBackend } from "../../backend-utils/auth-utils";
import { Row, Col } from "../../ad-imports";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import { Link } from "react-router-dom";
import imageSlide1 from "../../assets/place/mountain.jpg"
import imageSlide2 from "../../assets/place/beaches.jpg"
import imageSlide3 from "../../assets/place/paris2.jpg"
SwiperCore.use(Autoplay);
export default class SignupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState, props) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  handleErrors = (msg) => {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        error: msg,
        success: "",
      };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, password, confirmPassword } =
      this.state;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      this.handleErrors("All fields are required!");
      return;
    }
    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
      this.handleErrors("first and last name should contain only letters");
      return;
    }
    if (!validator.isEmail(email)) {
      this.handleErrors("Invalid email format!");
      return;
    }
    if (password !== confirmPassword) {
      this.handleErrors("Password doesn't match");
      return;
    }

    let phoneNumber = phone;
    if (phone.startsWith("0")) {
      phoneNumber = "+251" + phone.substr(1);
    } else {
      phoneNumber = "+251" + phone;
    }
    console.log("passed", phoneNumber);

    const userData = await registerBackend({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    if (userData.error) {
      this.handleErrors("Error registering! please check your informations.");
      return;
    }

    this.setState((prevState, props) => {
      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        error: "",
        success: "Registered successfuly! please login.",
      };
    });
  };
  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      error,
      success,
    } = this.state;

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
                  style={{ backgroundImage: `url(${imageSlide1})` }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className='slide-bg'
                  style={{ backgroundImage: `url(${imageSlide2})` }}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className='slide-bg'
                  style={{ backgroundImage: `url(${imageSlide3})` }}></div>
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
              <h3 className='display-5'>Create Account</h3>
              <p className='text-muted mb-3'>
                Alx-Travel provides best of what you need!
              </p>
              {<small className='text-success '>{success}</small>}
              {<small className='text-danger '>{error}</small>}
              <form
                onSubmit={this.handleSubmit}
                className='needs-validation'
                noValidate>
                <FormInput
                  label='First Name'
                  name='firstName'
                  type='text'
                  value={firstName}
                  required
                  onChange={this.handleChange}
                />
                <FormInput
                  label='Last Name'
                  name='lastName'
                  type='text'
                  value={lastName}
                  onChange={this.handleChange}
                  required
                />
                <FormInput
                  label='Email'
                  name='email'
                  type='email'
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <FormPhone
                  label='phone'
                  name='phone'
                  type='text'
                  value={phone}
                  onChange={this.handleChange}
                  required
                />
                <FormInput
                  label='Password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <FormInput
                  label='Confirm Password'
                  type='password'
                  required
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={this.handleChange}
                />

                <CustomButton type='submit' color='white' className='mt-4 px-4'>
                  Register
                </CustomButton>
                <div className='text-center d-flex justify-content-between mt-4'>
                  <p>
                    Already have an account?{" "}
                    <Link to='/signin' className='font-italic text-muted'>
                      <u>Login</u>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
