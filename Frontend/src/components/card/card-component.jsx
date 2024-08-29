import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addItemAction } from "../../redux/wishlist/wishlistAction.creators";
import "antd/dist/antd.css";
import { IMAGE_SERVER_URL } from "../../URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapModal from "../mapModal/map-component";
import {
  faLocationArrow,
  faHeart,
  faMapMarked,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./card-styles.scss";
import { Card, Skeleton, Chip, Avatar } from "../../ad-imports";
import {
  StarRating,
  BlurPlaceholder,
} from "../styled-reusable/styled-reusable";


const { Meta } = Card;


const CardComponent = ({ isLoading, item }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [mapShow, setMapShow] = useState(false);

  if (item) {
    const {
      _id,
      title,
      category,
      description,
      averageRating,
      imageCover,
      price,
      totalLike,
      isSold,
      location,
      ratingQuantity,
    } = item;

    console.log({ imageCover })

    return (
      <div className='custom-card'>
        {/* map model */}
        <MapModal
          show={mapShow}
          handleOk={() => setMapShow(false)}
          handleCancel={() => setMapShow(false)}
          location={location}
        />
        <div className='card-cart-add'>
          {/* font awesome */}
          <FontAwesomeIcon
            onClick={() => dispatch(addItemAction(item))}
            size='2x'
            icon={faCartPlus}
          />
        </div>
        {/* falocation arrow */}
        <div className='card-info'>
          <div>{isSold ? <Chip color='#f50'>Sold</Chip> : ""}</div>
          <div className='card-location' onClick={() => setMapShow(true)}>
            <Avatar
              size={38}
              style={{ backgroundColor: "#030c6b" }}
              icon={<FontAwesomeIcon icon={faLocationArrow} />}
            />
          </div>
        </div>

        <Card
          onClick={() => history.push(`/houses/${_id}`)}
          cover={
            isLoading ? (
              <BlurPlaceholder />
            ) : (
              <img src={`${IMAGE_SERVER_URL}/${imageCover}`} alt={title} />
            )
          }
          className='card-ant-edit'>

          <Skeleton loading={isLoading} active>
            <div className='custom-card-content'>
              <small className='text' style={{ fontSize: "11px" }}>
                {totalLike} LIKES
              </small>
              <h5>${price}</h5>
              <Meta title={title} description={description.substr(0, 70)} />
              {/* <div className='mt-4'>
                <FontAwesomeIcon icon={faMapMarked} />{" "}
                {location.address ? location.address : "Unkown"}
              </div> */}
              <div className='card-reviews d-flex align-items-center mt-3'>
                <div className='d-flex'>
                  <StarRating count={averageRating} />
                </div>
                <div className='mx-2'>
                  <small style={{ fontSize: "12" }}>
                    {ratingQuantity} Reviews
                  </small>
                </div>
              </div>
            </div>
          </Skeleton>

        </Card>
      </div>
    );
  } else {
    return (
      <div className='custom-card'>
        <div className='card-likes'>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className='card-info'>
          <div>{""}</div>
          <div className='card-location'>
            <Avatar
              size={38}
              style={{ backgroundColor: "#030c6b" }}
              icon={<FontAwesomeIcon icon={faLocationArrow} />}
            />
          </div>
        </div>

        <Card
          cover={isLoading ? <BlurPlaceholder /> : <BlurPlaceholder />}
          className='card-ant-edit'>
          <Skeleton loading={isLoading} active>
            <div className='custom-card-content'>
              <small className='text' style={{ fontSize: "11px" }}>
                456 LIKES
              </small>
              <h4 className='font-weight-bold card-title'>$4,233</h4>
              <small className='card-text text-muted'>
                lorem askjansa asjindjasnd
              </small>
              <div className='mt-4'>
                <FontAwesomeIcon icon={faMapMarked} /> Addis sefer merkato
              </div>
              <div className='card-reviews d-flex align-items-center mt-3'>
                <div className='d-flex'>
                  <StarRating count={3} />
                </div>
                <div className='mx-2'>
                  <small style={{ fontSize: "12" }}>35 Reviews</small>
                </div>
              </div>
            </div>
          </Skeleton>
        </Card>
      </div>
    );
  }
};

export default CardComponent;
