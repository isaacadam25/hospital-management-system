import React, { useEffect, useState } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { errorNotify, warnNotify } from "../helpers/notify";
import { getPendingAppointment } from "../services/appointmentServices";
import { getAuthToken } from "../services/authService";

const ShowListing = () => {
  const [pendingAppointment, setPendingAppointment] = useState([]);
  const [status, setStatus] = useState(0);

  const allPendingAppointment = async () => {
    try {
      const { data } = await getPendingAppointment(getAuthToken());
      setPendingAppointment(data);
      setStatus(data.length);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Pending appointment failed to load. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    allPendingAppointment();
  }, []);

  return (
    <>
      {status === 0 ? (
        <h6 className="text-center text-muted">No Appointment Found</h6>
      ) : null}
      <div className="list-group">
        {pendingAppointment &&
          pendingAppointment.map((appointment, index) => (
            <NavLink
              to={`/hospital/diagnose-patient/${appointment.id}`}
              key={appointment.id}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="p-3">
                  {index + 1}. {appointment.appointment_number}
                </h5>
                <small>
                  <i>Registered </i>
                  {moment(appointment.date_added).fromNow()}
                </small>
              </div>
            </NavLink>
          ))}
      </div>
    </>
  );
};

export default ShowListing;
