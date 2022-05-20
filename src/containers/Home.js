import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTranslation } from "react-i18next";
import { ArrowRightIcon, LinkExternalIcon } from "@primer/octicons-react";

// Importing assets
import logo from "../assets/images/OPTI_noir.png";
import carpooling from "../assets/images/undraw_trip.svg";

function Home() {
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn) {
    return <Redirect to="/find" />;
  }

  return (
    <>
      <Container>
        <Row className="min-vh-100 align-items-center">
          <Col>
            <Container className="p-0">
              <Row className="mb-5">
                <Col
                  xs={10}
                  sm={8}
                  md={6}
                  lg={4}
                  className="text-center px-0 mx-auto"
                >
                  <img src={logo} alt="Tucána logo" className="img-fluid" />
                  <p className="lead mb-0">{t("translation:global.slogan")}</p>
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center">
                <Col
                  xs={10}
                  sm={8}
                  md={6}
                  xl={4}
                  className="text-center mb-5 mb-md-0"
                >
                  <img
                    src={carpooling}
                    alt="Tucána logo"
                    width={300}
                    className="img-fluid"
                  />
                </Col>
                <Col xs={10} sm={8} md={6} xl={4} className="text-center">
                  <h2 className="text-success mb-0">
                    {t("translation:homepage.catchPhrase")}
                  </h2>
                  <LinkContainer to="/login" href="/login" className="my-2">
                    <Button variant="success" size="lg">
                      {t("translation:homepage.start")}
                      <ArrowRightIcon
                        size={24}
                        verticalAlign="middle"
                        className="mb-1 ms-2"
                      />
                    </Button>
                  </LinkContainer>
                  <p className="mb-0">{t("translation:homepage.paragraph")}</p>
                  <p>
                    <a
                      href="http://ridecr.atwebpages.com/"
                      target={"_blank"}
                      rel="noreferrer"
                      className="link-success small"
                    >
                      {t("translation:global.learnMore")}
                      <LinkExternalIcon size={12} className="mb-1 ms-2" />
                    </a>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Home;
