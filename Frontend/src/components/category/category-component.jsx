//author: mikias hailu and yared tsgie
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import RectCardComponent from "../card/rect-card-component";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { onCategoryFetchStart } from "../../redux/place/place.creators";
import { HeaderTitle, Param } from "../reusable/styled-reusable";

import "swiper/swiper-bundle.css";

SwiperCore.use(Navigation);

export default function CategoryComponent() {
  const category = useSelector((state) =>
    state.house.categoryHouses.map((el) => [el._id, el.houses[0].imageCover])
  );

  const history = useHistory();

  const navigateCategory = (category) => {
    history.push(`/houses/category/${category}`);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onCategoryFetchStart(2));
  }, []);
// header
  return (
    <div className='mt-4'>
      <div className='category-header d-flex align-items-center justify-content-between'>
        <div className='category-title'>
          <small className='text-muted'>Expolore Category</small>
          <HeaderTitle className='display-6' widthWrap={30}>
            Category
          </HeaderTitle>
        </div>
      </div>
      <div className='my-3'>
        <Swiper {...Param} navigation>
          {category.map((el, idx) => (

            < SwiperSlide key={idx} >
              <RectCardComponent
                hoverText={el[0]}
                image={el[1]}
                onClick={() => navigateCategory(el[0])}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div >
  );
}
