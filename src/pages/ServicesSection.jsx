import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUtensils, FaShoppingCart, FaHeadset, FaUserTie } from "react-icons/fa";
import {  FaBiking, FaTruck, FaConciergeBell, FaWineGlassAlt } from "react-icons/fa";

const services2 = [

  { icon: <FaBiking size={50} style={{ color: "#f55540" }} />, title: "Fast Delivery" },
  { icon: <FaTruck size={50} style={{ color: "#f55540" }} />, title: "Fresh Ingredients" },
  { icon: <FaConciergeBell size={50} style={{ color: "#f55540" }} />, title: "Table Service" },
  { icon: <FaWineGlassAlt size={50} style={{ color: "#f55540" }} />, title: "Premium Drinks" },
];

const services = [
  { icon: <FaUserTie size={50} style={{ color: "#f55540" }} />, title: "Master Chefs" },
  { icon: <FaUtensils size={50} style={{ color: "#f55540" }} />, title: "Quality Food" },
  { icon: <FaShoppingCart size={50} style={{ color: "#f55540" }} />, title: "Online Order" },
  { icon: <FaHeadset size={50} style={{ color: "#f55540" }} />, title: "24/7 Service" },
];


const ServicesSection = () => {
  return (
    <Container className="py-5">
      <Row className="g-4">
        {services.map((service, index) => (
          <Col md={6} lg={3} key={index}>
            <Card className="text-center shadow-sm p-4 border-0">
              <div className="mb-3">{service.icon}</div>
              <Card.Title className="fw-bold">{service.title}</Card.Title>
              <Card.Text className="text-muted">
                Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.
              </Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="g-4 mt-5">
        {services2.map((service2, index) => (
          <Col md={6} lg={3} key={index}>
            <Card className="text-center shadow-sm p-4 border-0">
              <div className="mb-3">{service2.icon}</div>
              <Card.Title className="fw-bold">{service2.title}</Card.Title>
              <Card.Text className="text-muted">
                Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam.
              </Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    
  );
};

export default ServicesSection;
