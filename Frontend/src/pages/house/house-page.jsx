import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import "./house-styles.scss";
import Header from "../../components/header/header-component";
import Footer from "../../components/footer/footer-component";
import CollectionContainer from "../../components/collectionContainer/collection-container";
import CategoryDetail from "../../components/categoryDetail/category-detail";
import { Container } from "../../components/styled-reusable/styled-reusable";

function HousePage({ match }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <Header />
      <div className='houses'>
        <Container>
          <Route
            exact
            path={`${match.path}/`}
            render={() =>
              currentUser ? <CollectionContainer /> : <Redirect to='/signin' />
            }
          />
          <Route
            path={`${match.path}/:categoryId`}
            render={() =>
              currentUser ? <CategoryDetail /> : <Redirect to='/signin' />
            }
          />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
export default HousePage;
