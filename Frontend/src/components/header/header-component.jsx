import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartItemsCount } from "../../redux/wishlist/wishlist.selectors";
import { onUserSignOutStart } from "../../redux/user/userAction.creators";
import {
  CustomButton,
  CustomButtonLink,
} from "../styled-reusable/styled-reusable";
import { Link } from "react-router-dom";
import "./header-styles.scss";
import "antd/dist/antd.css";
import { LogOutComponent } from "../styled-reusable/styled-reusable";

const LoginComponent = () => {
  return (
    <ul className='navbar-nav ml-auto mb-2 mb-lg-0 d-lg-flex'>
      <li className='nav-item order-lg-1'>
        <div className='nav-link'>
          <Link to='/signin'>
            <CustomButtonLink>Login</CustomButtonLink>
          </Link>
        </div>
      </li>
      <li className='nav-item order-lg-2'>
        <div className='nav-link'>
          <Link to='/signup'>
            <CustomButton>Create New</CustomButton>
          </Link>
        </div>
      </li>
    </ul>
  );
};

function HeaderComponent({ currentUser, logoutUser, itemCount }) {
  return (
    <div className=''>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            <h2 className='brand-logo'>Alx-Travel</h2>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mx-auto mb-2 mb-lg-2'>
              <li className='nav-item'>
                <Link to='/' className='nav-link active'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/houses/category'>
                  Places
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/search' className='nav-link'>
                  Search
                </Link>
              </li>
            </ul>
            {currentUser ? (
              <LogOutComponent itemCount={itemCount} logoutUser={logoutUser} />
            ) : (
              <LoginComponent />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  itemCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(onUserSignOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
