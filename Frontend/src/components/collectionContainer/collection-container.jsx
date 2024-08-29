//Author: Mikias Hail and yared tsgie
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin, Pagination } from "../../ad-imports";
import CollectionPreview from "../collectionPreview/collection-preview";
import { HeaderTitle } from "../styled-reusable/styled-reusable";

const CollectionContainer = () => {
  //variable declaration
  const [pageSize, setPageSize] = useState(1);
  const perPage = 10;
  const totalPage = categoryHouses.length;
  const isFetching = useSelector((state) => state.house.categoryFetching);
  const categoryHouses = useSelector((state) => state.house.categoryHouses);

  const houseCategoryPerPage = categoryHouses.slice(
    (pageSize - 1) * perPage,
    pageSize * perPage
  );
//header
  return (
    <div>
      <Spin spinning={isFetching}>
        <div className='category-header'>
          <HeaderTitle>Explore House Variety</HeaderTitle>
        </div>
      </Spin>

      <div>
        {isFetching
          ? null
          : houseCategoryPerPage.map((el, idx) => (
            <CollectionPreview
              key={idx}
              title={el._id}
              subTitle={`Buy best ${el._id.toLowerCase()} here.`}
              viewNum={6}
              limit={6}
              items={el.houses}
            />
          ))}
      </div>
{/* //pagination  */}
      <div>
        <Pagination
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onChange={(c, p) => setPageSize(c)}
          defaultCurrent={pageSize}
          total={totalPage}
        />
      </div>

    </div>
  );
};

export default CollectionContainer;
