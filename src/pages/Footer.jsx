import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: "#0b0e1e", color: "#ffffff" }}>
      <Container>
        <Row className="mb-4">
          {/* Company Section */}
          <Col md={3}>
            <h5 className="fw-bold" style={{ color: "#f55540" }}>Company</h5>
            <ul className="list-unstyled">
              <li>➤ About Us</li>
              <li>➤ Contact Us</li>
              <li>➤ Reservation</li>
              <li>➤ Privacy Policy</li>
              <li>➤ Terms & Condition</li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={3}>
            <h5 className="fw-bold" style={{ color: "#f55540" }}>Contact</h5>
            <p><FaMapMarkerAlt /> 123 Street, New York, USA</p>
            <p><FaPhoneAlt /> +012 345 67890</p>
            <p><FaEnvelope /> info@example.com</p>

            {/* Social Icons */}
            <div className="d-flex gap-3">
              <a href="#" style={{ color: "#f55540", fontSize: "20px" }}><FaTwitter /></a>
              <a href="#" style={{ color: "#f55540", fontSize: "20px" }}><FaFacebookF /></a>
              <a href="#" style={{ color: "#f55540", fontSize: "20px" }}><FaYoutube /></a>
              <a href="#" style={{ color: "#f55540", fontSize: "20px" }}><FaLinkedinIn /></a>
            </div>
          </Col>

          {/* Opening Hours */}
          <Col md={3}>
            <h5 className="fw-bold" style={{ color: "#f55540" }}>Opening</h5>
            <p>Monday - Saturday<br />09AM - 09PM</p>
            <p>Sunday<br />10AM - 08PM</p>
          </Col>

          {/* Newsletter Subscription */}
          <Col md={3}>
            <h5 className="fw-bold" style={{ color: "#f55540" }}>Newsletter</h5>
            <p>Stay updated with our latest news and offers.</p>
            <Form className="d-flex">
              <Form.Control type="email" placeholder="Your email" className="me-2" />
              <Button style={{ backgroundColor: "#f55540", border: "none" }}>SIGNUP</Button>
            </Form>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <hr style={{ borderColor: "#ffffff20" }} />
        <Row className="text-center">
          <Col>
            <p>© Your Site Name, All Rights Reserved. Designed By HTML Codex</p>
            <p>Distributed By ThemeWagon</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
