import React from 'react';
import './home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <div>
      <div id="carouselExampleControls" className="carousel-slide" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="pre-fall-webBanners-ftb.webp" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="pre-fall-webBanners-new-2.webp" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="pre-fall-webBanners-nisha-2.webp" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <section>
      <div class="grid-container">
  <div class="grid-item1">
  <Link to={`/category/${"women"}`}>  <img src="pexels-dhanno-19248024.jpg" alt="Unstitched" />
    <div class="caption">UNSTITCHED</div></Link>
  </div>
  <div class="grid-item2">
  <Link to={`/category/${"women"}`}> <img src="pexels-dhanno-19389291.jpg" alt="Luxury" />
    <div class="caption">LUXURY</div></Link>
  </div>
  <div class="grid-item3">
  <Link to={`/category/${"women"}`}>    <img src="pexels-dhanno-19389373.jpg" alt="Ready to Stitch" />
    <div class="caption">READY TO STITCH</div></Link>
  </div>
  <div class="grid-item4">
  <Link to={`/category/${"women"}`}>    <img src="pexels-dhanno-19401523.jpg" alt="Pret" />
    <div class="caption">PRET</div></Link>
  </div>
  <div class="grid-item5">
  <Link to={`/category/${"men"}`}>    <img src="pexels-spora-weddings-278507062-23961118.jpg" alt="Men" />
    <div class="caption">MEN</div></Link>
  </div>
  <div class="grid-item6">
 <Link to={`/category/${"women"}`}>   <img src="pexels-dhanno-19401634.jpg" alt="Freedom to Buy" />
    <div class="caption">FREEDOM TO BUY</div></Link>
  </div>
</div>
      </section>
      <div >
      <img className="banner-image" src="pret-mid-summer-sale-web-Banners-genaric-2.webp" alt="Freedom to Buy" />
      </div>
      <div className="fabrication-section">
    <h2 className="fabrication-title">SHOP BY FABRICATION</h2>
    <div className="fabrication-items">
        <div className="fabrication-item">
            <img src="pexels-dhanno-20420587.jpg" alt="Lawn" />
            <p>LAWN</p>
        </div>
        <div className="fabrication-item">
            <img src="pexels-dhanno-27284032.jpg" alt="Jacquard" />
            <p>JACQUARD</p>
        </div>
        <div className="fabrication-item">
            <img src="pexels-dhanno-27603276.jpg" alt="Cambric" />
            <p>CAMBRIC</p>
        </div>
        <div className="fabrication-item">
            <img src="pexels-dhanno-27603285.jpg" alt="Swiss Lawn" />
            <p>SWISS LAWN</p>
        </div>
        <div className="fabrication-item">
            <img src="pexels-dhanno-27603286.jpg" alt="Grid Lawn" />
            <p>GRID LAWN</p>
        </div>
        <div className="fabrication-item">
            <img src="pexels-dhanno-27603289.jpg" alt="Dobby" />
            <p>DOBBY</p>
        </div>
    </div>
</div>
    </div>
  );
};

export default Home;
