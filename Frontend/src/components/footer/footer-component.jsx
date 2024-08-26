import React from "react";
import "./footer-styles.scss";

export default function FooterComponent() {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row '>
          <div className='col-sm'></div>
          <div className='col-sm ml-auto'>
            <div className='row py-4'>
              {" "}
              <small className='ml-4 ml-sm-5 mb-2'>
                Copyright &copy; {new Date().getFullYear()}. All rights
                reserved. Developer{" Mikias Hailu and Yared Tsegie"}
              </small>
              <div className='social-contact ml-4 ml-sm-auto'>
                {" "}
                <span className='fa fa-facebook mr-4 text-sm'></span>{" "}
                <span className='fa fa-google-plus mr-4 text-sm'></span>{" "}
                <span className='fa fa-linkedin mr-4 text-sm'></span>{" "}
                <span className='fa fa-twitter mr-4 mr-sm-5 text-sm'></span>{" "}
              </div>
            </div>
          </div>
          <div className='col-sm'></div>
        </div>
      </div>
    </footer>
  );
}
