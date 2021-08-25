import React from "react";
import Content from "../layout/Content";
import ShowListing from "../components/ShowListing";

const AppointmentList = (props) => {
  const { profile } = props;

  return (
    <Content profile={profile}>
      <div className="col-md-10 ">
        <h5 className="h5 text-center">List of waiting patients</h5>
        <hr />
        <ShowListing />
      </div>
    </Content>
  );
};

export default AppointmentList;
