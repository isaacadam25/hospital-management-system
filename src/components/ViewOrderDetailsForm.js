import React, { useState, useEffect } from "react";
import moment from "moment";
import { errorNotify, successNotify, warnNotify } from "../helpers/notify";
import {
  acceptSingleOrder,
  addHospitalBatch,
  getTransactionById,
} from "../services/orderService";
import { getAuthToken } from "../services/authService";
import TextFieldController from "../controller/TextFieldController";
import TableController from "../controller/TableController";

const ViewOrderDetailsForm = (props) => {
  const [transaction, setTransaction] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [received, setReceived] = useState(0);
  const [quantityError, setQuantityError] = useState("");

  const { transactionId, setShow } = props;

  const validate = () => {
    if (quantity > received) {
      setQuantityError("Quantity can not be greater than quantity received");
      return false;
    } else {
      setQuantityError("");
    }
    if (Number(quantity) <= 0) {
      setQuantityError("Quantity value is not valid");
      return false;
    } else {
      setQuantityError("");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await acceptOrder(transactionId);
    } else {
      warnNotify("There is errors in your form field. Please check it.");
    }
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const getTransaction = async (id) => {
    try {
      const { data } = await getTransactionById(id, getAuthToken());
      setTransaction(data);
      setReceived(data.quantity);
      console.log(data);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Error occurred during retrieving transaction details. Please try after some time."
        );
      }
      console.log(ex.response);
    }
  };

  const acceptOrder = async (id) => {
    const payload = {
      batch_number: transaction.batch_number,
      unit_measure: transaction.drug_type,
      medicine_brand: transaction.drug_manufacturer,
      medicine_name: transaction.drug_name,
      expiry_date: transaction.expiry_date,
      manufacturing_date: transaction.production_date,
      concentration: transaction.concentration,
      quantity_measure: transaction.quantity_measure,
      quantity_received: quantity,
    };

    try {
      const response = await acceptSingleOrder(id, payload, getAuthToken());
      console.log(response);
      try {
        const response2 = await addHospitalBatch(payload, getAuthToken());
        console.log(response2);
        successNotify("Transaction accepted successfully.");
        setShow(false);
      } catch (ex) {
        if (Number(ex.response.status) >= 500) {
          errorNotify("An unexpected error occurred. Please try again later.");
        } else {
          warnNotify(
            "Error occurred during registering batch details. Please try after some time."
          );
        }
      }
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Error occurred during accepting order. Please try after some time."
        );
      }
    }
  };

  useEffect(() => {
    getTransaction(transactionId);
  }, [transactionId]);

  return (
    <>
      <div className="row justify-content-center p-1">
        <h5 className="text-center h5">Order Details</h5>
        <div className="col-md-12">
          <TableController>
            <tbody>
              <tr>
                <td>
                  <b>Reference No</b>
                </td>
                <td>{transaction.reference_number}</td>
                <td>
                  <b>Batch No</b>
                </td>
                <td>{transaction.batch_number}</td>
              </tr>
              <tr>
                <td>
                  <b>Medicine name</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.drug_name}
                </td>
                <td>
                  <b>Medicine type</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.drug_type}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Concentration</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.concentration}
                </td>
                <td>
                  <b>Manufacturer</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.drug_manufacturer}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Prod date</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.production_date}
                </td>
                <td>
                  <b>Exp date</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.expiry_date}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Source name</b>
                </td>
                <td style={{ textTransform: "uppercase" }}>
                  {transaction.source_name}
                </td>
                <td>
                  <b>Destination</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.destination_name}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Date sent</b>
                </td>
                <td>{moment(transaction.date_added).format("ll")}</td>
                <td>
                  <b>Status</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.is_accepted ? (
                    <em className="text-success">Accepted</em>
                  ) : (
                    <em className="text-danger">Pending</em>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Unit measure</b>
                </td>
                <td style={{ textTransform: "uppercase" }}>
                  {transaction.quantity_measure}
                </td>
                <td>
                  <b>Quantity sent</b>
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {transaction.quantity}
                </td>
              </tr>
            </tbody>
          </TableController>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-8">
              <TextFieldController
                label="Quantity Received"
                name="quantity"
                type="number"
                id="quantity"
                placeholder="Enter quantity received to hospital"
                onChange={handleChange}
                readOnly={false}
                required={true}
                invalidText={quantityError}
              />
            </div>
            <div className="col-8">
              <button
                type="submit"
                className="btn btn-primary btn-sm float-end"
              >
                Accept
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ViewOrderDetailsForm;
