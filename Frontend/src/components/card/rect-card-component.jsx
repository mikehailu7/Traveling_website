import React from "react";
import "./card-styles.scss";
import APARTMENT from "../../assets/house/house2.jpg";
import GUEST from "../../assets/house/house4.jpg";
import HOUSE from "../../assets/house/house3.jpg";
import LEXHOUSE from "../../assets/house/house5.jpg";
import CONDO from "../../assets/house/house6.jpg";

export default function RectCardComponent({ hoverText, image, onClick }) {
  if (hoverText === "APARTMENT") {
    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${APARTMENT})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );
  }
  else if (hoverText === "GUEST HOUSE") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${GUEST})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }
  else if (hoverText === "HOUSE") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${HOUSE})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }
  else if (hoverText === "LUXURY HOUSE") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${LEXHOUSE})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }
  else if (hoverText === "CONDO") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${CONDO})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }
  else {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            // backgroundImage: `url(${GUEST})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }

}
