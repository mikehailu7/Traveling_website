import Header from "../../components/header/h-component";
import Footer from "../../components/footer/footer-component";
import Banner from "../../components/banner/banner-component";
import Trending from "../../components/trending/trending-component";
import Category from "../../components/category/category-component";
import CollectionPreview from "../../components/collectionPreview/collection-preview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram,faYoutube } from '@fortawesome/free-brands-svg-icons';
import Alxtravel from "../../assets/alxtravel.png";
import {
  PromoCard,
  Container,
} from "../../components/reusable/styled-reusable";

import "./home-styles.scss";

const NewsLetterCard = () => (
  <div className='newsletter' style={{ width: "100%" }}>
    <div className='px-4 py-5 my-5 text-center'>
      <h1 className='fw-bold'>Follow Us On Social Media</h1>
      <p className='text-muted mb-4'>
        Subscribe to our channels to get the latest updates
      </p>
      <div className='d-flex justify-content-center'>
      <a href="#" className='mx-2'>
        <FontAwesomeIcon icon={faFacebook} size="2x" color="black"/>
      </a>
      <a href="#" className='mx-2'>
        <FontAwesomeIcon icon={faInstagram} size="2x" color="black"/>
      </a>
      <a href="#" className='mx-2'>
        <FontAwesomeIcon icon={faTelegram} size="2x" color="black" />
      </a>
      <a href="#" className='mx-2'>
          <FontAwesomeIcon icon={faYoutube} size="2x" color="black"/>
      </a>
      </div>
    </div>
  </div>
);

function HomePage() {
  return (
    <div className='home'>
      <Header />
      <Container>
        <Banner />
        <Trending />
        <Category />
        <PromoCard
          image={Alxtravel}
          title='Travel with ALX'
          text='Find a place to visit'
          btnText='Add To Wishlist'
        />
        <CollectionPreview
          title='Houses'
          subTitle='Explore houses'
          viewNum={6}
          limit={8}
        />
        <NewsLetterCard />
      </Container>
      <Footer />
    </div>
  );
}

export default HomePage;
