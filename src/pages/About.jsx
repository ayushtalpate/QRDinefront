import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import restaurant1 from "../assets/about-1.jpg"; // Replace with actual paths
import restaurant2 from "../assets/about-2.jpg";
import restaurant3 from "../assets/about-3.jpg";
import restaurant4 from "../assets/about-4.jpg";

const About = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        {/* Left Side - Images in 2x2 Grid */}
        <Col lg={6}>
          <Row>
            <Col xs={5} className="p-2">
              <img src={restaurant1} alt="Restaurant" className="img-fluid rounded" />
            </Col>
            <Col xs={6} className="p-2">
              <img src={restaurant2} alt="Restaurant" className="img-fluid rounded" />
            </Col>
          </Row>
          <Row>
            <Col xs={4} className="p-2">
              <img src={restaurant3} alt="Food" className="img-fluid rounded" />
            </Col>
            <Col xs={5} className="p-2">
              <img src={restaurant4} alt="Food" className="img-fluid rounded" />
            </Col>
          </Row>
        </Col>

        {/* Right Side - Content */}
        <Col lg={6}>
          <h5 className="fw-bold" style={{ color: "#f55540" }}>About Us</h5>
          <h2 className="fw-bold">
            Welcome to <span style={{ color: "#f55540" }}>🍴 Restoran</span>
          </h2>
          <p>Experience the finest cuisine with expert chefs.</p>

          {/* Experience & Chefs Stats */}
          <Row className="mt-4">
            <Col sm={6}>
              <h2 className="fw-bold" style={{ color: "#f55540" }}>15</h2>
              <p><span className="fw-bold">Years of</span> EXPERIENCE</p>
            </Col>
            <Col sm={6}>
              <h2 className="fw-bold" style={{ color: "#f55540" }}>50</h2>
              <p><span className="fw-bold">Popular</span> MASTER CHEFS</p>
            </Col>
          </Row>

          {/* Read More Button */}
          <Button style={{ backgroundColor: "#f55540", border: "none" }} className="px-4 py-2 fw-bold text-white mt-3">
            READ MORE
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
