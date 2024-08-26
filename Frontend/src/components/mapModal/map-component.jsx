import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Modal } from "../../antd-imports";
import "./map-styles.scss";
import styled from "styled-components";

const StyledDiv = styled.div`
  height: 400px;
`;

const R = ({ coordinates }) => {
  console.log(coordinates);
  let ltd = coordinates[0];
  let lngd = coordinates[1];
  if (ltd > 90 || ltd < -90) {
    ltd = 33.452;
  }
  if (lngd > 90 || lngd < -90) {
    lngd = 33.452;
  }
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(lngd);
  const [lat, setLat] = useState(ltd);
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return <StyledDiv ref={mapContainer} className='map-container' />;
};

export default function MapComponent({
  show,
  handleOk,
  handleCancel,
  location,
}) {
  return (
    <Modal
      width={650}
      title='House Map'
      visible={show}
      onOk={handleOk}
      onCancel={handleCancel}>
      {!location ? (
        "This house doesn't have location."
      ) : (
        <R coordinates={location.coordinates} />
      )}
    </Modal>
  );
}
