import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addItemAction,
  purgeWishItem,
} from "../../redux/wishlist/wistAc.creators";
import { useHistory } from "react-router-dom";

import Alxtravel from "../../assets/alxtravel.png";
import MapModal from "../map/map-component";
import { HeartFilled } from "@ant-design/icons";
import "./card-styles.scss";
import { IMAGE_SERVER_URL } from "../../URL";

import { Row, Col, Image, Stat, Button } from "../../ad-imports";
import { StarRatingComponent } from "../reusable/styled-reusable";


export const HorizontalCard = ({
  item,
  mb,
  onClick,
  hasRemove,
  hasAdd,
  removePost,
  deletePost,
  ...props
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    _id,
    title,
    category,
    price,
    description,
    totalLike,
    ratingQuantity,
    averageRating,
    imageCover,
    location,
  } = item;

  const [mapShow, setMapShow] = useState(false);
  return (
    <div className='horizontal-card' style={{ marginBottom: mb }}>
      <MapModal
        show={mapShow}
        handleOk={() => setMapShow(false)}
        handleCancel={() => setMapShow(false)}
        location={location}
      />
      <Row>
        {/* imagecover */}
        <Col sm={24} md={6}>
          <div className='image-container'>
            <Image
              className='card-image'
              src={imageCover ? `${IMAGE_SERVER_URL}/${imageCover}` : Alxtravel}
              alt='place'
            />
          </div>
        </Col>
        {/* horizontal card */}
        <Col sm={24} md={18}>
          <div className='horizontal-card-body'>
            <div
              className='horizontal-card-header'
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/houses/${_id}`)}>
              <div>
                <Stat title={category} value={title} />
              </div>
              <div>
                <Stat title={<HeartFilled color='#f00' />} value={totalLike} />
              </div>
            </div>
            {/* price */}
            <p>Price ${price}</p>
            <p
              style={{
                overflowY: "hidden",
                textOverflow: "ellipsis",
                paddingBottom: "2rem",
              }}>
              {description}
            </p>
              {/* show map */}
            <div className='horizontal-card-actions'>
              <div>
                <StarRatingComponent value={averageRating} disabled />
                <span style={{ marginLeft: "0.5rem" }}>
                  {ratingQuantity} reviews
                </span>
              </div>
              <div>
                <Button type='primary' onClick={() => setMapShow(true)}>
                  View on Map
                </Button>
                {removePost ? (
                  <Button
                    onClick={() => deletePost(_id)}
                    style={{
                      marginLeft: "1.5rem",
                      backgroundColor: "red",
                      color: "white",
                    }}>
                    Delete This Post
                  </Button>
                ) : null}
                {hasRemove ? (
                  <Button
                    onClick={() => dispatch(purgeWishItem(item))}
                    style={{
                      marginLeft: "1.5rem",
                      backgroundColor: "red",
                      color: "white",
                    }}>
                    Remove from Wishlist
                  </Button>
                ) : null}
                {hasAdd ? (
                  <Button
                    onClick={() => dispatch(addItemAction(item))}
                    style={{
                      marginLeft: "1.5rem",
                      backgroundColor: "black",
                      color: "white",
                    }}>
                    Add to Wishlist
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

//cart left
