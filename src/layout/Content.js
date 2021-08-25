import React from "react";
import PageHeader from "./PageHeader";
import Sidebar from "./Sidebar";

const Content = (props) => {
  const { children, profile, title } = props;

  return (
    <div className="row mt-5">
      <div className="col-md-2 p-2">
        <Sidebar profile={profile} />
      </div>
      <div className="col-md-10 mt-2">
        <div className="row">
          <div className="col-md-12 p-2">
            <PageHeader title={title} profile={profile} />
          </div>
          <div className="col-md-12">
            <div className="row justify-content-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
