import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { ChevronRightIcon } from "@primer/octicons-react";

import GoBack from "../../components/GoBack";

const Legal = () => {
  return (
    <div>
      <GoBack />

      <Container fluid data-aos="fade-in">
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <ListGroup variant="flush">
              <Link to="/privacy" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Privacy policy</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/terms" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Terms &amp; Conditions</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/data-protection" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Data protection</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/legal-notice" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Legal notice</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>

              <Link to="/credits" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Credits</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Legal;
