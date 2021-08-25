import React from "react";

const PageHeader = (props) => {
  const { profile, title } = props;

  const { usertype_name: role } = profile;

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h5 className="card-title">
              {" "}
              <i className="fa fa-th" /> {title}
            </h5>
          </div>
          <div className="col-md-4">
            <h6
              className="h6 card-title text-muted float-end p-1"
              style={{ textTransform: "capitalize" }}
            >
              Logged in as: {role}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
