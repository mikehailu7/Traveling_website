import React from "react";
import "./card-styles.scss";
import CAPITALS from "../../assets/place/paris.jpg";
import AFRICA from "../../assets/place/addis.jpg";
import BEACHES from "../../assets/place/beaches.jpg";
import RIVERS from "../../assets/place/abay.jpg";
import TOP_VISITED from "../../assets/place/Top.jpg";

export default function RectCardComponent({ hoverText, image, onClick }) {
  if (hoverText === "CAPITALS") {
    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${CAPITALS})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );
  }
  else if (hoverText === "AFRICA") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${AFRICA})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }
  else if (hoverText === "BEACHES") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${BEACHES})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }
  else if (hoverText === "RIVERS") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${RIVERS})`
          }}>

        </div>
        <h2 className='card-image-caption'>{hoverText}</h2>
      </div>
    );

  }
  else if (hoverText === "TOP_VISITED") {

    return (
      <div className='rect-card' onClick={onClick}>
        <div
          className='card-rect-item'
          style={{
            backgroundImage: `url(${TOP_VISITED})`
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
