import React from "react";
import Content from "../layout/Content";
import DoctorViewPrescription from "../components/DoctorViewPrescription";

const Prescriptions = (props) => {
  const { profile } = props;

  return (
    <Content title="Prescription" profile={profile}>
      <div className="col-md-12">
        <h5 className="text-center p-1">Patients Prescribed</h5>
        <DoctorViewPrescription />
      </div>
    </Content>
  );
};

export default Prescriptions;
