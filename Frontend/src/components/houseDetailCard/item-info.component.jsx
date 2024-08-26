import React from "react";
import { useDispatch } from "react-redux";
import { addItemAction } from "../../redux/wishlist/wishlistAction.creators";
import styled from "styled-components";
import { HeartFilled } from "@ant-design/icons";
import { Button, Stat } from "../../antd-imports";
import { StarRatingComponent } from "../styled-reusable/styled-reusable";

const ItemReviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.6rem;
`;

const ItemInfo = ({ item }) => {
  const dispatch = useDispatch();
  const {
    title,
    category,
    description,
    averageRating,
    price,
    totalLike,
    isSold,
    ratingQuantity,
  } = item;

  return (
    <div className='item-detal'>
      <ul style={{ listStyle: "none" }}>
        <Stat title={category} value={title} />
        <li>
          <ItemReviewContainer>
            <div>
              <StarRatingComponent rateDefault={averageRating} disabled />{" "}
              {ratingQuantity} Reviews
            </div>
            <div>
              <HeartFilled style={false ? { color: "red" } : null} />
              <span style={{ color: "gray", paddingLeft: ".4rem" }}>
                {totalLike}
              </span>
            </div>
          </ItemReviewContainer>
        </li>
        <li>
          <h2>${price}</h2>
        </li>
        <li>{isSold ? <span>Not Available</span> : <span>Available</span>}</li>
        <li>
          <h5>Descriptions</h5>
          <p>{description}</p>
        </li>
        <li>
          <Button
            type='primary'
            danger
            styles={{ width: "100%" }}
            onClick={() => dispatch(addItemAction(item))}>
            Add to Cart
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ItemInfo;
