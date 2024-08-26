import React, { useState } from "react";
import styled, { css } from "styled-components";
import { IMAGE_SERVER_URL } from "../../URL";


const HDisplay = css`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const VDisplay = css`
  flex-direction: column;
  justify-content: center;
  align-items: space-evenly;
`;
const ImageDisplayConatiner = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: space-evenly;
  }
  ${(props) => (props.horizontal ? VDisplay : HDisplay)};

  .image-display {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-evenly;
    order: 0;
    align-self: flex-start;
    margin-top: 1rem;

    @media screen and (max-width: 800px) {
      order: 2;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
    }

    .image-cover {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 0;
      margin-right: 1rem;
      border: 1px solid rgba($color: #000000, $alpha: 0.2);

      img {
        height: 60%;
        width: 60%;
      }

      &.item-active {
        border: 1px solid red;
      }
    }
  }
  .images-preview {
    order: ${(props) => (props.horizontal ? 0 : 1)};
    flex: 5;
    margin-left: auto;
    img {
      height: 80%;
      width: 80%;
    }
  }
`;

const ImagesDisplay = ({ images }) => {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <ImageDisplayConatiner>
      <div className='image-display'>
        {images.map((el, idx) => {
          console.log({ el })
          return (
            <div
              key={idx}
              onClick={() => setActiveImg(idx)}
              className={`image-cover ${idx === activeImg ? "item-active" : ""
                }`}>
              <img src={`${IMAGE_SERVER_URL}/${el}`} alt='desktop' />
            </div>
          );
        })}
      </div>
      <div className='images-preview'>
        <img src={`${IMAGE_SERVER_URL}/${images[activeImg]}`} alt='desktop' />
      </div>
    </ImageDisplayConatiner>
  );
};

export default ImagesDisplay;
