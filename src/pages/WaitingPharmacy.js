import React from "react";
import Content from "../layout/Content";
import PharmacyList from "../components/PharmacyList";

const WaitingPharmacy = (props) => {
  const { profile } = props;

  return (
    <Content title="Patient queue" profile={profile}>
      <div className="col-md-10">
        <PharmacyList />
      </div>
    </Content>
  );
};

export default WaitingPharmacy;
