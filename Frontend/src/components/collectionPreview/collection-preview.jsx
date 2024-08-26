import React from "react";
import { useHistory } from "react-router-dom";
import { MoreButton, ListConfig } from "../styled-reusable/styled-reusable";
import "./collection-preview-styles.scss";
import CardItem from "../card/card-component";
import { Row, Col } from "../../antd-imports";

const CollectionPreview = ({ title, subTitle, viewNum, limit, items }) => {
  const history = useHistory();

  if (items) {
    return (
      <div className='collection-preview px-sm-0'>
        <div className='products-preview mt-4'>
          <div className='collection-header'>
            <div>
              <h3 style={{ fontFamily: "Open Sans" }}>{title}</h3>
              <p>{subTitle}</p>
            </div>
            <div>
              <MoreButton
                onClick={() =>
                  history.push(
                    `${history.location.pathname}/${items[0].category}`
                  )
                }>
                View all
              </MoreButton>
            </div>
          </div>

          <Row gutter={16}>
            {items.slice(0, limit).map((el, idx) => (
              <Col
                {...ListConfig}
                lg={viewNum ? viewNum : 6}
                key={idx}
                style={{ marginBottom: "2rem" }}>
                <CardItem item={el} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
  return null;
};

export default CollectionPreview;
