import React from "react";
import styled from "styled-components";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import "./single-review.styles.scss";
import avatar from "../../assets/logo.png";
import { StarRatingComponent } from "../styled-reusable/styled-reusable";

const ProfileAvatar = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: cover;
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  border-radius: 50%;
`;

const SingleReview = ({ review, onVote }) => {
  const { createdAt, title, rating, comment, user } = review;
  return (
    <div className='single-review'>
      <div className='single-review-header'>
        <div className='user-avatar'>
          <ProfileAvatar size='3' image={user.avatar ? user.avatar : avatar} />
          <div className='user-title'>
            <h3>
              {user.firstname}
              {user.lastname}
            </h3>
            <strong>{title}</strong>
          </div>
        </div>
        <div className='user-rating'>
          <StarRatingComponent rateDefault={rating} disabled />
          <p>{new Date(Date.parse(createdAt)).toUTCString()}</p>
        </div>
      </div>
      <p className='review-content'>{comment}</p>
      <div className='review-votes'>
        <span>Vote</span>
        <div className='vote-btn'>
          22 <CaretUpFilled className='up-vote' />
          66 <CaretDownFilled className='down-vote' />
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
