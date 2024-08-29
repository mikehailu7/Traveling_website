import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSearch, faCartPlus, faNewspaper, faUser } from "@fortawesome/free-solid-svg-icons";
import "./styled-reusable-styles.scss";
import { ReactComponent as RightArrow } from "../../assets/arrow-right.svg";
import placeholderImg from "../../assets/place/lalibela.jpg"
import {
  Input,
  Space,
  Select,
  InputNumber,
  Rate,
  Form,
  Avatar,
  Badge,
  Dropdown,
  Menu,
} from "../../antd-imports";
// import { faUser, faCartPlus, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import React from "react";
// import React from "react";
// import React from "react";
import { useHistory, Link } from "react-router-dom";

// import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";


const { Item } = Form;

// rol-col breakpoint config
export const ListConfig = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
};

/**
 * Flexible container layout
 */

export const Container = ({ children }) => (
  <div className='wrapper-div'>{children}</div>
);

/**
 * Styled Buttons
 */

export const CustomButton = styled.button`
  padding: 0.3rem 1rem;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "black")};
  border-radius: ${({ brRadius }) => (brRadius ? brRadius : "4px")};
  color: ${({ color }) => (color ? color : "white")};
  font-style: bold;
  font-family: inherit;
`;

export const CustomButtonLink = styled.button`
  padding: 0.3rem 1rem;
  background-color: transparent;
  border: none;
  color: ${({ color }) => (color ? color : "black")};
  font-style: bold;
  font-family: inherit;
`;

export const CustomButtonOutlined = styled.button`
  padding: 0.4rem 2rem;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "white")};
  border: 1px solid "black";
  border-radius: ${({ brRadius }) => (brRadius ? brRadius : "4px")};
  color: ${({ color }) => (color ? color : "black")};
  font-style: bold;
  font-family: inherit;
`;

/**
 * Styled Typography
 */
export const HeaderTitle = styled.h1`
  font-family: "Open Sans", sans-serif;
  color: ${({ color }) => (color ? color : "#0c0c0c")};
  text-wrap: wrap;
  font-size: ${({ fontSize }) => (fontSize ? fontSize + "rem" : null)};
  width: ${({ widthWrap }) => (widthWrap ? widthWrap + "rem" : "auto")};
`;

/**
 * Rating stars
 */
export const StarRating = ({ count }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        color={i < count ? "#e5c31b" : "lightGrey"}
      />
    );
  }
  return stars;
};

/**
 * Form inputs
 */
export const FormInput = ({
  label,
  type,
  onChange,
  errorMsg,
  ...otherProps
}) => (
  <div>
    <div className='form-group mb-3 has-validation'>
      <label htmlFor={label} className='custom-control-label mb-1'>
        <small>{label}</small>
      </label>
      <input
        id={label}
        type={type}
        placeholder={`${label ? "Enter " + label.toLowerCase() : ""}`}
        onChange={onChange}
        {...otherProps}
        className='form-control rounded border-0 shadow-sm px-4'
      />
      <div className='invalid-feedback'>
        {errorMsg
          ? errorMsg
          : `${label ? label.toLowerCase() + "is required!" : ""}`}
      </div>
    </div>
  </div>
);

export const FormInputComponent = ({
  label,
  type,
  onChange,
  value,
  name,
  rules,
  ...otherProps
}) => (
  <Item label={label} rules={rules} {...otherProps}>
    <Input
      name={name}
      type={type}
      value={value}
      placeholder={`${label ? "Enter " + label.toLowerCase() : ""}`}
      onChange={onChange}
    />
  </Item>
);

export const TextAreaInput = ({ type, label, value, ...otherProps }) => {
  const { TextArea } = Input;
  const { cols, rows } = otherProps;
  return (
    <Space direction='vertical'>
      <label htmlFor={label}>{label}</label>
      <TextArea value={value} rows={rows} cols={cols} {...otherProps} />
    </Space>
  );
};

export const NumberInputBox = ({ onChange, max, min, defaultVal, value }) => {
  return (
    <InputNumber
      min={min}
      max={max}
      value={value}
      defaultValue={defaultVal}
      onChange={onChange}
    />
  );
};

export const SelectOptionsInput = ({ label, options, onSelected }) => {
  const { Option } = Select;
  return (
    <Select defaultValue={label} style={{ width: 120 }} onChange={onSelected}>
      {options.map((option, idx) => {
        return (
          <Option key={idx} value={option}>
            {option}
          </Option>
        );
      })}
    </Select>
  );
};
export const FormCheckBox = ({ label, onChange, ...otherProps }) => (
  <div className='form-check'>
    <input
      className='form-check-input'
      type='checkbox'
      onChange={onChange}
      {...otherProps}
    />
    <label className='form-check-label' htmlFor='inlineFormCheck'>
      {label}
    </label>
  </div>
);

export const FormPhone = ({
  label,
  options,
  maxWidth,
  onChange,
  onSelect,
  ...otherProps
}) => (
  <div className='form-group mb-3'>
    <label htmlFor='inputPhone' className='custom-control-label'>
      {label}
    </label>
    <div className='d-flex'>
      <div className='border-end border-4'>
        <select
          onSelect={onSelect}
          style={{ border: "1px solid lightgrey" }}
          className='form-control rounded border-0 shadow-sm px-4'>
          {!options ? (
            <option value='+251'>+251</option>
          ) : (
            options.map((el, idx) => (
              <option key={idx} value={el}>
                {el}
              </option>
            ))
          )}
        </select>
      </div>
      <div className='flex-fill'>
        <input
          placeholder={label}
          onChange={onChange}
          {...otherProps}
          className='form-control rounded border-0 shadow-sm px-4'
        />
      </div>
    </div>
  </div>
);

export const SearchBar = ({ message, icon, onSearch, ...otherProps }) => (
  <div className='p-1 bg-light rounded rounded-pill shadow-sm mb-4'>
    <div className='input-group'>
      <input
        type='search'
        placeholder={message ? message : "What're you searching for?"}
        aria-describedby='button-addon1'
        className='form-control border-0 bg-light custom-search'
        onChange={onSearch}
        {...otherProps}
      />
      <div className='input-group-append p-2 px-3 d-flex align-items-center'>
        <FontAwesomeIcon onClick={onSearch} icon={icon ? icon : faSearch} />
      </div>
    </div>
  </div>
);

export const SearchInputCompnent = ({
  onSearch,
  placeholder,
  isSearching,
  ...otherProps
}) => {
  const { Search } = Input;
  return (
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      enterButton
      loading={isSearching}
      {...otherProps}
    />
  );
};

export const StarRatingComponent = ({
  rateDefault,
  onChange,
  value,
  ...otherProps
}) => {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  return (
    <Rate
      allowHalf
      defaultValue={rateDefault}
      tooltips={desc}
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  );
};
// logo ddcoration

const LogoContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: transparent;
  position: relative;
`;

const LogoBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  transform: rotate(45deg);
`;

const TitleLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LogoDecor = ({ name }) => (
  <LogoContainer>
    <LogoBackground className='shadow-lg' style={{ opacity: 0.8 }} />
    <TitleLogo>
      <h1
        className='display-2 fw-bold'
        style={{
          fontFamily: "Open Sans",
          color: "brown",
        }}>
        {name}
      </h1>
    </TitleLogo>
  </LogoContainer>
);

export const PromoCard = ({
  title,
  text,
  subText,
  btnText,
  onClick,
  image,
  height,
  width,
  textColor,
  bgColor,
}) => (
  <div
    className='promo-banner'
    style={{ height: height, width: width, backgroundColor: bgColor }}>
    <div className='promo-image-container'>
      {image ? <img className='promo-image' src={image} alt='banner' /> : null}
    </div>
    <div
      className='promo-banner-content'
      style={{
        color: textColor,
      }}>
      <h2 className='promo-banner-title'>{title}</h2>
      <p className='promo-banner-text'>{text}</p>
      <div className='mt-5'>
        <p className='promo-banner-text'>{subText}</p>
        <CustomButtonOutlined onClick={onClick}>{btnText}</CustomButtonOutlined>
      </div>
    </div>
  </div>
);

export const MoreButton = ({ onClick, children }) => (
  <div className='btn-more' onClick={onClick}>
    {children}
    <RightArrow />
  </div>
);

/**
 * Slider breakpoint config
 */

export const Param = {
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
};

/**
 * Blurred image component
 */
export const BlurPlaceholder = () => (
  <img loading='lazy' alt='house' src={placeholderImg} />
);
export const LogOutComponent = ({ logoutUser, itemCount }) => {
  const history = useHistory();

  return (
    <ul className='navbar-nav ml-auto mb-2 mb-lg-0 d-lg-flex'>

      {/* <li className='nav-item order-lg-2'>
        <div className='nav-link'>
          <Link to='/notifaction'>
            <Badge count={5}>
              <Avatar
                size={40}
                icon={<FontAwesomeIcon icon={faNewspaper} />}
                style={{ backgroundColor: "black" }} />
            </Badge>
          </Link>
        </div>
      </li> */}

      <li className='nav-item order-lg-2'>
        <div className='nav-link'>
          <Link to='/profile'>
            <Badge count={itemCount}>
              <Avatar
                size={40}
                icon={<FontAwesomeIcon icon={faCartPlus} />}
                style={{ backgroundColor: "black" }} />
            </Badge>
          </Link>
        </div>
      </li>


      <li className='nav-item order-lg-2'>
        <div className='nav-link'>
          <Dropdown
            overlay={<Menu>
              <Menu.Item onClick={() => history.push("/profile")}>
                Profile
              </Menu.Item>
              <Menu.Item onClick={logoutUser}>Logout</Menu.Item>
            </Menu>}
            trigger={["click"]}>
            <Avatar
              size={40}
              icon={<FontAwesomeIcon icon={faUser} />}
              style={{ backgroundColor: "black" }} />
          </Dropdown>
        </div>
      </li>
    </ul>
  );
};
