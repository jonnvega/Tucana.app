import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import DatePicker, { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import fr from "date-fns/locale/fr";
import i18n from "i18next";
import Select from "react-select";
import {
  AlertIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DashIcon,
  LinkExternalIcon,
  PencilIcon,
  PlusIcon,
} from "@primer/octicons-react";

import {
  resetOfferOrigin,
  resetOfferDestination,
  setRideDate,
  setRideTime,
  setRideSeats,
  setRidePrice,
  setRideComment,
  submitFormOfferRide,
  setToast,
} from "../redux";

import { getArrayTimeRide, formatPrice } from "../helpers";
import LoadingSpinner from "../components/LoadingSpinner";
import InputSearchLocation from "../components/InputSearchLocation";

// Enable translation for the date picker
registerLocale("en", en);
registerLocale("es", es);
registerLocale("fr", fr);

const Offer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    formOfferRide,
    isLoadingSubmitFormOfferRide,
    submitFormOfferRideSuccess,
  } = useSelector((state) => state.ride);
  const { seatsMax, priceMin, priceMax } = useSelector((state) => state.global);

  const [date, setDate] = useState(formOfferRide.date);
  const [time, setTime] = useState(formOfferRide.time);
  const [seats, setSeats] = useState(formOfferRide.seats);
  const [price, setPrice] = useState(formOfferRide.price);
  const [comment, setComment] = useState(formOfferRide.comment);

  // Steps
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [stepSix, setStepSix] = useState(false);
  const [stepVerify, setStepVerify] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  var now = new Date();
  var dateMax;
  if (now.getMonth() === 11) {
    dateMax = new Date(now.getFullYear() + 1, 2, 0);
  } else {
    dateMax = new Date(now.getFullYear(), now.getMonth() + 4, 0);
  }

  const backButton = (handleBackToStep) => {
    return (
      <div className="pt-3 ps-2">
        <Button
          size={"sm"}
          onClick={handleBackToStep}
          variant="outline-secondary"
        >
          <ArrowLeftIcon size={24} className="me-2" />
          Back
        </Button>
      </div>
    );
  };

  // Step 1
  const handleClickStepOne = () => {
    setStepOne(false);
    setStepTwo(true);
  };

  const handleEditOrigin = () => {
    dispatch(resetOfferOrigin());
  };

  // Step 2
  const handleClickStepTwo = () => {
    setStepTwo(false);
    setStepThree(true);
  };

  const handleEditDestination = () => {
    dispatch(resetOfferDestination());
  };

  const handleBackToStepOne = () => {
    setStepOne(true);
    setStepTwo(false);
  };

  // Step 3
  const handleClickStepThree = () => {
    if (date !== "") {
      setStepThree(false);
      setStepFour(true);
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.chooseDate"),
          variant: "warning",
        })
      );
    }
  };

  const handleBackToStepTwo = () => {
    setStepTwo(true);
    setStepThree(false);
  };

  // Step 4
  const handleClickStepFour = () => {
    if (time.value === "" || time.value === undefined) {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.chooseTime"),
          variant: "warning",
        })
      );
    } else {
      setStepFour(false);
      setStepFive(true);
    }
  };

  const handleBackToStepThree = () => {
    setStepThree(true);
    setStepFour(false);
  };

  // Step 5
  const handleClickStepFive = () => {
    if (seats !== "") {
      if (isNaN(seats) || seats <= 0 || seats > seatsMax) {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.chooseSeatsAvailable"),
            variant: "warning",
          })
        );
      } else {
        dispatch(setRideSeats(seats));

        setStepFive(false);
        setStepSix(true);
      }
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.missingInfo"),
          variant: "warning",
        })
      );
    }
  };

  const handleBackToStepFour = () => {
    setStepFour(true);
    setStepFive(false);
  };

  // Step 6
  const handleClickStepSix = () => {
    if (seats !== "") {
      if (isNaN(seats) || seats <= 0 || seats > seatsMax) {
        dispatch(
          setToast({
            show: true,
            headerText: t("translation:global.errors.error"),
            bodyText: t("translation:global.errors.chooseSeatsAvailable"),
            variant: "warning",
          })
        );
      } else {
        dispatch(setRidePrice(price));

        setStepSix(false);
        setStepVerify(true);
      }
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: t("translation:global.errors.error"),
          bodyText: t("translation:global.errors.missingInfo"),
          variant: "warning",
        })
      );
    }
  };

  const handleBackToStepFive = () => {
    setStepFive(true);
    setStepSix(false);
  };

  // Step verify
  const handleBackToStepSix = () => {
    setStepSix(true);
    setStepVerify(false);
  };

  // Submit
  const handleSubmit = () => {
    setStepVerify(false);
    setSubmitted(true);
    dispatch(submitFormOfferRide(currentUser, formOfferRide));
  };

  // Handlers
  const handleChangeDate = (date) => {
    setDate(date);
    dispatch(setRideDate(date));
  };

  const handleChangeTime = (time) => {
    setTime(time);
    dispatch(setRideTime(time));
  };

  const handleDecreaseSeats = () => {
    setSeats(seats <= 1 ? 1 : seats - 1);
  };

  const handleIncreaseSeats = () => {
    setSeats(seats >= seatsMax ? seatsMax : seats + 1);
  };

  const handleDecreasePrice = () => {
    setPrice(price <= priceMin ? priceMin : price - 500);
  };

  const handleIncreasePrice = () => {
    setPrice(price >= priceMax ? priceMax : price + 500);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
    dispatch(setRideComment(e.target.value));
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid data-aos="fade-in">
      {currentUser.Driver ? (
        stepOne ? (
          <>
            <Row className="mt-5 pt-3 mb-3">
              <Col className="text-center">
                <h2>{t("translation:offer.whereFrom")}</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {formOfferRide.origin.city !== "" ? (
                  <Container className="px-0">
                    <Row className="mb-3">
                      <Col xs={12} className="text-center">
                        <h3 className="mb-0">
                          <strong>{formOfferRide.origin.city}</strong>,{" "}
                          <small>{formOfferRide.origin.province}</small>
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="text-center">
                        <Button
                          onClick={handleEditOrigin}
                          variant="warning"
                          className="me-2"
                        >
                          <PencilIcon size={24} className="me-2" />
                          {t("translation:global.edit")}
                        </Button>
                        <Button onClick={handleClickStepOne} variant="success">
                          {t("translation:global.next")}
                          <ArrowRightIcon size={24} className="ms-2" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <InputSearchLocation inputLocation="offerOrigin" />
                )}
              </Col>
            </Row>
          </>
        ) : stepTwo ? (
          <>
            <Row className="mb-3">
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {backButton(handleBackToStepOne)}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:offer.whereTo")}</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {formOfferRide.destination.city !== "" ? (
                  <Container className="px-0">
                    <Row className="mb-3">
                      <Col xs={12} className="text-center">
                        <h3 className="mb-0">
                          <strong>{formOfferRide.destination.city}</strong>,{" "}
                          <small>{formOfferRide.destination.province}</small>
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="text-center">
                        <Button
                          onClick={handleEditDestination}
                          variant="warning"
                          className="me-2"
                        >
                          <PencilIcon size={24} className="me-2" />
                          {t("translation:global.edit")}
                        </Button>
                        <Button onClick={handleClickStepTwo} variant="success">
                          {t("translation:global.next")}
                          <ArrowRightIcon size={24} className="ms-2" />
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <InputSearchLocation inputLocation="offerDestination" />
                )}
              </Col>
            </Row>
          </>
        ) : stepThree ? (
          <>
            <Row className="mb-3">
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {backButton(handleBackToStepTwo)}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:offer.when")}</h2>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col className="text-center">
                <DatePicker
                  selected={date}
                  onChange={handleChangeDate}
                  minDate={now}
                  maxDate={dateMax}
                  locale={i18n.language}
                  inline
                />
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepThree} variant="success">
                  {t("translation:global.next")}
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepFour ? (
          <>
            <Row className="mb-3">
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {backButton(handleBackToStepThree)}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:offer.whatTime")}</h2>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col xs={10} md={8} lg={6} xl={4} className="text-center mx-auto">
                <Select
                  placeholder={t("translation:offer.chooseTime")}
                  value={time}
                  onChange={handleChangeTime}
                  options={getArrayTimeRide()}
                />
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepFour} variant="success">
                  {t("translation:global.next")}
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepFive ? (
          <>
            <Row className="mb-3">
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {backButton(handleBackToStepFour)}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:offer.seatsAvailable")}</h2>
              </Col>
            </Row>

            <Row className="justify-content-center mb-4">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="text-center mx-auto"
              >
                <Container>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <Button
                        onClick={handleDecreaseSeats}
                        variant="outline-success"
                        disabled={seats === 1}
                        className="p-0"
                      >
                        <DashIcon size={36} />
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <h1 className="display-3 fw-bold">{seats}</h1>
                    </Col>
                    <Col xs={3}>
                      <Button
                        onClick={handleIncreaseSeats}
                        variant="outline-success"
                        disabled={seats === seatsMax}
                        className="p-0"
                      >
                        <PlusIcon size={36} />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepFive} variant="success">
                  {t("translation:global.next")}
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepSix ? (
          <>
            <Row className="mb-3">
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {backButton(handleBackToStepFive)}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:offer.priceTitle")}</h2>
              </Col>
            </Row>

            <Row className="justify-content-center mb-4">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="text-center mx-auto"
              >
                <Container>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <Button
                        onClick={handleDecreasePrice}
                        variant="outline-success"
                        disabled={price === priceMin}
                        className="p-0"
                      >
                        <DashIcon size={36} />
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <h1 className="display-3 fw-bold">
                        {formatPrice(price)}
                      </h1>
                    </Col>
                    <Col xs={3}>
                      <Button
                        onClick={handleIncreasePrice}
                        variant="outline-success"
                        className="p-0"
                        disabled={price === priceMax}
                      >
                        <PlusIcon size={36} />
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col xs={12} sm={6} md={4} className="text-end mx-auto">
                <Button onClick={handleClickStepSix} variant="success">
                  {t("translation:global.next")}
                  <ArrowRightIcon size={24} className="ms-2" />
                </Button>
              </Col>
            </Row>
          </>
        ) : stepVerify ? (
          <>
            <Row className="mb-3">
              <Col xs={10} md={8} lg={6} xl={4} className="mx-auto">
                {backButton(handleBackToStepSix)}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <h2>{t("translation:offer.summary")}</h2>
              </Col>
            </Row>

            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="bg-light border shadow rounded-5 mx-auto"
              >
                <Container className="py-3 px-2">
                  <Row className="mb-2">
                    <Col className="text-center">
                      <p className="mb-0">
                        {dateFormat(formOfferRide.date, "dd/mm/yyyy")} -{" "}
                        {time.label}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="text-center">
                      <h2 className="fw-bold mb-0">
                        {formOfferRide.origin.city}
                      </h2>
                      <p className="small mb-0">
                        {formOfferRide.origin.province}
                      </p>

                      <ArrowDownIcon size={24} className="text-success" />

                      <h2 className="fw-bold mb-0">
                        {formOfferRide.destination.city}
                      </h2>
                      <p className="small mb-0">
                        {formOfferRide.destination.province}
                      </p>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col className="text-center">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=${formOfferRide.origin.address}&destination=${formOfferRide.destination.address}&travelmode=driving`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline-success">
                          {t("translation:offer.previewTrip")}
                          <LinkExternalIcon size={24} className="ms-2" />
                        </Button>
                      </a>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="bg-light border shadow rounded-5 mx-auto"
              >
                <Container className="py-3 px-2">
                  <Row>
                    <Col xs={6} className="text-center">
                      <p className="mb-0">
                        {t("translation:global.seat")}
                        {seats > 1 ? "s" : null}: <strong>{seats}</strong>
                      </p>
                    </Col>
                    <Col xs={6} className="text-center">
                      <p className="mb-0">
                        {t("translation:global.price")}:{" "}
                        <strong>{formatPrice(price)}</strong>
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="mb-3 mx-1 mx-sm-0">
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="bg-light border shadow rounded-5 mx-auto"
              >
                <Container className="py-3 px-2">
                  <Row>
                    <Col>
                      <p>{t("translation:global.comment")}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="text-center">
                      <Form.Group>
                        <Form.Control
                          name="comment"
                          as="textarea"
                          rows={2}
                          type="textarea"
                          value={comment}
                          placeholder={t(
                            "translation:offer.placeholderComment"
                          )}
                          className="rounded mb-3"
                          onChange={handleChangeComment}
                        />
                        <Form.Label className="mb-0">
                          <p className="small text-secondary mb-0">
                            <AlertIcon
                              size={24}
                              className="text-warning me-2"
                            />
                            {t("translation:global.doNotShare")}
                          </p>
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>

            <Row className="my-5">
              <Col className="text-end">
                <Button onClick={handleSubmit} size={"lg"} variant="success">
                  {t("translation:global.submit")}
                </Button>
              </Col>
            </Row>
          </>
        ) : submitted ? (
          <>
            {isLoadingSubmitFormOfferRide ? (
              <Row>
                <Col className="text-center">
                  <LoadingSpinner />
                </Col>
              </Row>
            ) : submitFormOfferRideSuccess ? (
              <Row className="mt-5">
                <Col className="text-center">
                  <h1 className="text-success">
                    {t("translation:global.congratulations")}
                  </h1>
                  <p>
                    {t("translation:offer.rideOnline1")}{" "}
                    <LinkContainer
                      to="/rides/driver"
                      className="cursor-pointer"
                    >
                      <u className="link-primary">
                        {t("translation:offer.rideOnline2")}
                      </u>
                    </LinkContainer>
                  </p>
                </Col>
              </Row>
            ) : null}
          </>
        ) : null
      ) : (
        <Row className="mt-5 mx-1 mx-sm-0">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="border shadow-sm rounded text-center pt-3 pb-4 mx-auto"
          >
            <Container>
              <Row>
                <Col>
                  <h1 className="title display-4">
                    {t("translation:offer.title")}
                  </h1>
                  <p className="mb-0">
                    {t("translation:offer.onlyVerifiedDriver")}
                  </p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <p>
                    <Link to="/become-driver">
                      <Button variant="success" size="lg">
                        {t("translation:global.becomeDriver")}
                      </Button>
                    </Link>
                  </p>
                  <p className="mb-0">
                    <Link to="/find">
                      <Button variant="warning">
                        {t("translation:offer.findRide")}
                      </Button>
                    </Link>
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Offer;
