import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import chefImage from "../assets/banner-image.png"; // Importing image
import "../HeroSection.css";

const HeroSection = () => {
  return (
    <Container className="hero-section ">
      <Row className="align-items-center">
        {/* Left Side - Text Content */}
        <Col lg={6} className="text-center text-lg-start">
          <h1 className="hero-title">
          Enjoy Our<br/>
          Delicious Meal
          </h1>
          <p className="hero-subtext">
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
          </p>
          <div className="mt-4">
            <Button className="btn-custom me-3">Book A Table</Button>
            <Button className="btn-outline-custom">Scan Now</Button>
          </div>
        </Col>

        {/* Right Side - Image Content */}
        <Col lg={6} className="position-relative text-center">
          <div className="hero-image">
            <div className="background-shape"></div>
            <img src={chefImage} className="img-fluid rounded" alt="Chef" />
            {/* Floating Recipe Card */}
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
