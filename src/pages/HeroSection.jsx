import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import chefImage from "../assets/banner-image.png";
import "../HeroSection.css";
import Lottie from "lottie-react";
import foodLoader from "../animations/homeanimation.json";

const HeroSection = () => {
  return (
    <div className="hero-wrapper">
      <Container className="hero-section py-5">
        <Row className="align-items-center">
          <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="hero-title">
              Enjoy Our<br />
              Delicious Meal
            </h1>
            <p className="hero-subtext">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
            </p>
            <div className="mt-4">
              <Button className="btn-custom me-3">Book A Table</Button>
              <Button className="btn-outline-custom">Scan Now</Button>
            </div>
          </Col>
          <Col lg={6} className="position-relative text-center">
          <div className="hero-image">
            <div className="background-shape"></div>
            <img src={chefImage} className="img-fluid rounded" alt="Chef" />            
          </div>
        </Col>
        </Row>
      </Container>

      {/* Section 2: Lottie Animation and Text */}
      <Container className="hero-section py-5">
        <Row className="align-items-center flex-column-reverse flex-lg-row">
        <Col lg={6} className="text-center">
            <div className="lottie-wrapper mx-auto" style={{ maxWidth: 300 }}>
              <Lottie animationData={foodLoader} loop={true} />
            </div>
          </Col>
          <Col lg={6} className="text-center text-lg-start mt-4 mt-lg-0">
            <h1 className="hero-title">
              Scan to Order<br />
              At Your Table
            </h1>
            <p className="hero-subtext">
              No need to wait! Just scan and place your order directly from your table.
              Enjoy quick and seamless dining with our QR-based ordering system.
            </p>
            <div className="mt-4">
              <Button className="btn-custom">Scan Now</Button>
            </div>
          </Col>
         
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
