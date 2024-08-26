import React, { useState } from "react";
import { searchHouses } from "../../backend-utils/houses-utils";
import { useSelector } from "react-redux";

import Header from "../../components/header/header-component";
import Footer from "../../components/footer/footer-component";
import {
  Container,
  SearchInputCompnent,
} from "../../components/styled-reusable/styled-reusable";
import { HorizontalCard } from "../../components/card/card-left-image-component";
import "./search-styles.scss";
import { Row, Col, Menu, PageHeader, Spin, Slider } from "../../antd-imports";
const { SubMenu, Item } = Menu;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [filters1, setFilters1] = useState([]);
  const [filters2, setFilters2] = useState([]);
  const [filters3, setFilters3] = useState([]);

  const [houses, setHouses] = useState([]);
  const [fetching, setFetching] = useState(false);
  const category = useSelector((state) =>
    state.house.categoryHouses.map((el) => el._id)
  );

  const handleSearch = (q) => {
    setQuery(q);
    if (!query.trim()) return;
    setFetching(true);
    searchHouses(query, [...filters1, ...filters2, ...filters3])
      .then((result) => {
        setHouses(result.houses);
        setFetching(false);
      })
      .catch((e) => console.log(e));
  };

  const filterCategory = (e) => {
    const [val, type] = e.keyPath;
    setFilters3([{ key: type, value: val }]);
    handleSearch(query);
  };

  const handlePriceChange = (val) => {
    const [min, max] = val;
    setFilters1([
      { key: `price[lte]`, value: max },
      { key: `price[gte]`, value: min },
    ]);
    handleSearch(query);
  };

  const handleRatingChange = (val) => {
    setFilters2([{ key: `averageRating[gte]`, value: val }]);
    handleSearch(query);
  };

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col sm={24} md={6} lg={4}>
            <div className='collections-filters'>
              <PageHeader className='site-page-header' title='Filters' />
              <div style={{ padding: "1rem" }}>
                <span>Rating above</span>
                <Slider
                  onAfterChange={handleRatingChange}
                  max={5}
                  min={1}
                  step={1}
                />
              </div>
              <div style={{ padding: "1rem" }}>
                <span>Price</span>
                <Slider
                  onAfterChange={handlePriceChange}
                  min={100}
                  max={100000}
                  range
                  defaultValue={[2000, 50000]}
                />
              </div>
              <Menu
                defaultOpenKeys={["Category"]}
                mode='inline'
                onClick={filterCategory}>
                <SubMenu key='category' title='Category'>
                  {category.slice(0, 4).map((el) => (
                    <Item key={el}>{el}</Item>
                  ))}
                </SubMenu>
                <SubMenu key='isSold' title='Availablity'>
                  <Item key='true'>Sold</Item>
                  <Item key='false'>Available</Item>
                </SubMenu>
              </Menu>
            </div>
          </Col>
          <Col sm={24} md={18} lg={20}>
            <div className='house-search'>
              <div style={{ width: "60%" }} className='s-component'>
                <SearchInputCompnent
                  onSearch={handleSearch}
                  enterButton='Search'
                  size='large'
                  isSearching={fetching}
                />
              </div>
            </div>
            <Spin spinning={fetching} size='large'>
              <div className='search-result'>
                {houses ? (
                  houses.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No result found</p>
                  ) : (
                    houses.map((el) => (
                      <HorizontalCard hasAdd mb='1rem' item={el} key={el._id} />
                    ))
                  )
                ) : (
                  <p style={{ textAlign: "center" }}>No result found</p>
                )}
              </div>
            </Spin>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SearchPage;
