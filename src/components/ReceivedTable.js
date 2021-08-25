import React, { useState, useEffect } from "react";
import { getAllIncomingOrders } from "../services/orderService";
import { getAuthToken } from "../services/authService";
import moment from "moment";
import TableController from "../controller/TableController";
import TableHeadController from "../controller/TableHeadController";
import ModalController from "../controller/ModalController";
import ViewOrderDetailsForm from "./ViewOrderDetailsForm";

const headCells = [
  { id: 0, title: "#" },
  { id: 1, title: "Reference No" },
  { id: 2, title: "Date" },
  { id: 3, title: "Quantity" },
  { id: 4, title: "Medicine Name" },
  { id: 5, title: "Action" },
];

const ReceivedTable = (props) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [transactionId, setTransactionId] = useState(0);

  const { organization_number, setPendingCount } = props;

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id) => {
    setTransactionId(id);
    setShow(true);
  };

  const getPendingOrders = async () => {
    try {
      const { data } = await getAllIncomingOrders(
        organization_number,
        getAuthToken()
      );
      setPendingOrders(data);
      setPendingCount(data.length);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    getPendingOrders();
  }, [show]);

  return (
    <React.Fragment>
      <TableController>
        <TableHeadController headCells={headCells} />
        <tbody>
          {pendingOrders &&
            pendingOrders.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.reference_number}</td>
                <td>{moment(item.date_added).format("LL")}</td>
                <td>{item.quantity}</td>
                <td>{item.drug_name}</td>
                <td>
                  <button
                    onClick={() => handleShow(item.id)}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="fa fa-check-circle-o" /> Accept
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </TableController>
      {pendingOrders.length === 0 && (
        <em className="text-center">No data found</em>
      )}
      <ModalController show={show} btnText="Cancel" handleClose={handleClose}>
        <ViewOrderDetailsForm setShow={setShow} transactionId={transactionId} />
      </ModalController>
    </React.Fragment>
  );
};

export default ReceivedTable;
