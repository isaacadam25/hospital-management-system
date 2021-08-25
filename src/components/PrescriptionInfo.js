import React from "react";

const PrescriptionInfo = (props) => {
  const { data } = props;

  return (
    <>
      <h5 className="h5 text-center p-2">Prescription Details</h5>
      <table className="table table-striped table-hover">
        <tbody>
          <tr>
            <td>
              <b>Full Name</b>
            </td>
            <td>
              {data.patient_firstname} {data.patient_lastname}
            </td>
            <td>
              <b>Medicine</b>
            </td>
            <td>{data.medicine_brand}</td>
          </tr>
          <tr>
            <td>
              <b>Medicine Quantity</b>
            </td>
            <td>{data.quantity}</td>
            <td>
              <b>Department</b>
            </td>
            <td>{data.patient_type}</td>
          </tr>
          <tr>
            <td>
              <b>Doctor Name</b>
            </td>
            <td>
              {data.prescriber_firstname} {data.prescriber_lastname}
            </td>
            <td>
              <b>Description</b>
            </td>
            <td>{data.description}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PrescriptionInfo;
