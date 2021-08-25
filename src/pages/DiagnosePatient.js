import React from "react";
import { useParams } from "react-router-dom";
import Content from "../layout/Content";
import DiagnoseForm from "../components/DiagnoseForm";

const DiagnosePatient = (props) => {
  const { profile } = props;

  const { appointmentId } = useParams();

  return (
    <Content title="Diagnose Patient" profile={profile}>
      <div className="col-md-8">
        <DiagnoseForm appointmentId={appointmentId} />
      </div>
    </Content>
  );
};

export default DiagnosePatient;
