import React, { useEffect, useState } from "react";
import { errorNotify, successNotify, warnNotify } from "../helpers/notify";
import { useParams, useHistory } from "react-router-dom";
import { getAuthToken } from "../services/authService";
import {
  acceptPrescription,
  getSinglePrescription,
} from "../services/prescriptionService";
import Content from "../layout/Content";

const SinglePrescription = (props) => {
  const [prescription, setPrescription] = useState({});

  const { profile } = props;

  const { prescriptionId } = useParams();

  const history = useHistory();

  const getPrescription = async () => {
    try {
      const { data } = await getSinglePrescription(
        prescriptionId,
        getAuthToken()
      );
      setPrescription(data);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Error occurred during retrieving prescription. Please try after some time."
        );
      }
    }
  };

  const accept = async () => {
    try {
      await acceptPrescription(prescriptionId, getAuthToken());
      successNotify("Prescription accepted successfully.");
      history.push("/hospital/queue");
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Error occurred during accepting prescription. Please try after some time."
        );
      }
    }
  };

  useEffect(() => {
    getPrescription();
  }, []);

  return (
    <Content profile={profile}>
      <div className="col-md-10">
        <h6 className="p-3 text-center h6">
          {prescription.patient_firstname} {prescription.patient_lastname}{" "}
          Prescription
        </h6>
        <table className="table table-hover table-striped">
          <tbody>
            <tr>
              <td>
                <b>Full Name: </b>
              </td>
              <td>
                {prescription.patient_firstname} {prescription.patient_lastname}
              </td>
              <td>
                <b>Department: </b>
              </td>
              <td>{prescription.patient_type}</td>
            </tr>
            <tr>
              <td>
                <b>Medicine Name: </b>
              </td>
              <td>{prescription.medicine_name}</td>
              <td>
                <b>Quantity: </b>
              </td>
              <td>{prescription.quantity}</td>
            </tr>
            <tr>
              <td>
                <b>Description: </b>
              </td>
              <td>{prescription.description}</td>
              <td>
                <b>Prescription Status: </b>
              </td>
              <td className="text-danger">
                {prescription.is_sold ? "Processed" : "Pending"}
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <button
                  onClick={accept}
                  className="btn btn-primary btn-sm float-end"
                >
                  <i className="fa fa-check-circle" /> Accept Prescription
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Content>
  );
};

export default SinglePrescription;
