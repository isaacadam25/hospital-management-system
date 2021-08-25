import React from "react";
import Content from "../layout/Content";
import AddPatientForm from "../components/AddPatientForm";

const RegisterPatients = (props) => {
  const { profile } = props;

  return (
    <Content title="Patient Registration" profile={profile}>
      <div className="col-md-11 card p-4">
        <AddPatientForm />
      </div>
    </Content>
  );
};

export default RegisterPatients;
