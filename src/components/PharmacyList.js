import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { errorNotify, warnNotify } from "../helpers/notify";
import { getAuthToken } from "../services/authService";
import { getPrescriptions } from "../services/prescriptionService";

const PharmacyList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [status, setStatus] = useState(0);

  const allPrescriptions = async () => {
    try {
      const { data } = await getPrescriptions(getAuthToken());
      setPrescriptions(data);
      setStatus(data.length);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Failed to retrieve prescription list. Please try after some time."
        );
      }
    }
  };

  useEffect(() => {
    allPrescriptions();
  }, []);

  return (
    <>
      <h5 className="text-center p-2 mb-2">Patient Queue ({status})</h5>
      {status === 0 ? (
        <h6 className="text-center text-muted">No Patient Found</h6>
      ) : null}
      <div className="list-group border-top p-3">
        <ol>
          {prescriptions &&
            prescriptions.map((prescription) => (
              <NavLink
                to={`/hospital/view-prescription/${prescription.id}`}
                key={prescription.id}
                className="list-group-item list-group-item-action"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="p-3">
                    <li>{prescription.patient_firstname}</li>
                  </h5>
                  <small>
                    <i>Prescribed </i>
                    {moment(prescription.date_added).fromNow()}
                  </small>
                </div>
              </NavLink>
            ))}
        </ol>
      </div>
    </>
  );
};

export default PharmacyList;
