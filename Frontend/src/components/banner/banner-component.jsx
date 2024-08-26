import React from "react";
import { Link } from "react-router-dom";
import "./banner-styles.scss";
import AlxTravel from "../../assets/alxtravel.png";
import { HeaderTitle } from "../styled-reusable/styled-reusable";

export default function BannerComponent() {
  return (
    <section>
      <div className='my-5 banner-container'>
        <div className='d-flex flex-column'>
          <HeaderTitle className='display-3 header-title-1'>
            Travel the world 
          </HeaderTitle>
          <h4
            className='text-wrap  py-2 header-title-3'
            style={{ width: "20rem" }}>
            Traveling has never been easier.
          </h4>

        </div>

        <div className='banner-bg'>
          <img className='banner-img-f object' src={AlxTravel} alt='banner' />
          <div className='banner-img-b'></div>
        </div>
      </div>
    </section>
  );
}
