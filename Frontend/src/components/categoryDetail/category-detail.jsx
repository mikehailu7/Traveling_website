/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { onCategoryHouseFetchStart } from "../../redux/place/place.creators";
import {
  HeaderTitle,
  Container,
  ListConfig,
} from "../reusable/styled-reusable";
import { Row, Col, Pagination } from "../../ad-imports";
import CardItem from "../card/card-component";
import { Spin } from "../../ad-imports";
import "./category-styles.scss";

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [pageNumber, setpageNumber] = useState(1);
  const isFetching = useSelector((state) => state.house.perCategoryFetching);
  const housePerCategory = useSelector(
    (state) => state.house.housesPerCategory
  );

  console.log({ housePerCategory })

  const dispatch = useDispatch();
  const perPage = 10;
  const totalPage = housePerCategory.length;

  const houseCategoryPerPage = housePerCategory.slice(
    (pageNumber - 1) * perPage,
    pageNumber * perPage
  );

  console.log({ houseCategoryPerPage })

  useEffect(() => {
    dispatch(onCategoryHouseFetchStart({ categoryId }));
  }, []);

  return (
    <div className='category-detail'>

      <div className='category-header'>
        <Spin spinning={isFetching}>
          <HeaderTitle className='display-6' widthWrap={30}>
            {categoryId} 
          </HeaderTitle>
        </Spin>
      </div>

      <div className='detail-houses'>
        {isFetching ? null : (
          <Container>
            <Row gutter={16}>
              {houseCategoryPerPage.map((el, idx) => {
                return (
                  <Col
                    {...ListConfig}
                    key={idx}
                    style={{ marginBottom: "2rem" }}>
                    <CardItem item={el} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        )}
      </div>

      <div className='category-pagination'>
        <Pagination
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onChange={(c, p) => setpageNumber(c)}
          defaultCurrent={pageNumber}
          total={totalPage}
        />
      </div>

    </div>
  );
}
