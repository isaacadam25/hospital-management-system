import React, { useState, useEffect } from "react";
import { errorNotify, warnNotify } from "../helpers/notify";
import { getAuthToken } from "../services/authService";
import {
  getPrescriptions,
  getSinglePrescription,
} from "../services/prescriptionService";
import TableController from "../controller/TableController";
import TableHeadController from "../controller/TableHeadController";
import ModalController from "../controller/ModalController";
import PrescriptionInfo from "./PrescriptionInfo";

const headCells = [
  { id: 1, title: "#" },
  { id: 2, title: "Full Name" },
  { id: 3, title: "Medicine" },
  { id: 4, title: "Quantity" },
  { id: 5, title: "Department" },
  { id: 8, title: "Action" },
];

const DoctorViewPrescription = () => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [singlePrescription, setSinglePrescription] = useState({});

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = async (id) => {
    setShow(true);
    try {
      const { data } = await getSinglePrescription(id, getAuthToken());
      setSinglePrescription(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorNotify("An unexpected error occured. Plaese try again.");
      } else {
        warnNotify(
          "Prescription details trying to view is not available. Please try again later."
        );
      }
    }
  };

  const getPrescription = async () => {
    try {
      const { data } = await getPrescriptions(getAuthToken());
      setItems(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorNotify("An unexpected error occured. Plaese try again.");
      } else {
        warnNotify("Failed to load prescription details. Please try again.");
      }
    }
  };

  useEffect(() => {
    getPrescription();
  }, []);

  return (
    <React.Fragment>
      <TableController>
        <TableHeadController headCells={headCells} />
        <tbody>
          {items &&
            items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.patient_firstname} {item.patient_lastname}
                </td>
                <td>{item.medicine_brand}</td>
                <td>{item.quantity}</td>
                <td>{item.patient_type}</td>
                <td>
                  <button
                    onClick={() => handleShow(item.id)}
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="fa fa-eye" /> View Prescription
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </TableController>

      <ModalController btnText="OK" show={show} handleClose={handleClose}>
        <PrescriptionInfo data={singlePrescription} />
      </ModalController>
    </React.Fragment>
  );
};

export default DoctorViewPrescription;
