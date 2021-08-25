import React from "react";
import { useParams } from "react-router-dom";
import Content from "../layout/Content";
import PrescribeForm from "../components/PrescribeForm";

const PrescribePatient = (props) => {
  const { profile } = props;

  const { appointmentId } = useParams();

  return (
    <Content title="Prescribe Patient" profile={profile}>
      <div className="col-md-9 p-3">
        <PrescribeForm appointmentId={appointmentId} />
      </div>
    </Content>
  );
};

export default PrescribePatient;
