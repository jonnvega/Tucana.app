import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";

import { getPassengersDetails } from "../redux";
import SendMessageButton from "./SendMessageButton";

const PassengersDetails = ({ rideId, booking }) => {
  const dispatch = useDispatch();
  const { isLoadingPassengersDetails, passengersDetailsData } = useSelector(
    (state) => state.ride
  );

  // const difference = Math.abs(dateRide - today);
  // const diffHours = Math.ceil(difference / (1000 * 60 * 60));
  // const diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  // // If the ride happens in the next 24h or happened within the last 7 days, unlock the passengers contact details
  // const lockPassengersDetails =
  //   (!isDateInPast(today, dateRide) && diffDays > daysLockPassengersDetails) ||
  //   diffHours > hoursUnlockPassengersDetail;

  // if (passengersDetailsData.length > 0) console.log(passengersDetailsData);

  const totalPassengers = passengersDetailsData.reduce(
    (accumulator, passengerDetails) =>
      accumulator + passengerDetails.seatsBooked,

    0
  );

  useEffect(() => {
    dispatch(getPassengersDetails(rideId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLoadingPassengersDetails && passengersDetailsData.length > 0 ? (
        <>
          <Row>
            <Col>
              <p>
                Total: <span className="text-success">{totalPassengers}</span>{" "}
                passenger(s) with{" "}
                <span className="text-success">
                  {passengersDetailsData.length}
                </span>{" "}
                booking(s)
              </p>
            </Col>
          </Row>
          {passengersDetailsData.map((booking, index) => (
            <Row key={index} className="mb-2">
              <Col className="d-inline-flex align-items-center">
                <p className="flex-grow-1 mb-0">
                  Passenger:{" "}
                  <span className="text-success">{booking.User.firstName}</span>{" "}
                  | Seats:{" "}
                  <span className="text-success">{booking.seatsBooked}</span>{" "}
                </p>
                <div className="text-end">
                  <SendMessageButton
                    type="button"
                    driverId={booking.DriverId}
                    userId={booking.UserId}
                    receiverName={booking.User.firstName}
                    rideId={booking.Ride}
                  />
                </div>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        <Row>
          <Col>
            <p className="mb-0">You do not have passengers for this ride yet</p>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PassengersDetails;
