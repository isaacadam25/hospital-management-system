import React from "react";
import { Link } from "react-router-dom";
import Content from "../layout/Content";

const Dashboard = (props) => {
  const { profile } = props;

  const { first_name, last_name, usertype_name: role } = profile;
  return (
    <>
      <Content title="Dashboard" profile={profile}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="h3 p-2">
                Welcome, {first_name} {last_name}
              </h3>
              <hr />
            </div>
            {role === "doctor" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Appointment Management</h5>
                    <p className="card-text">
                      Involve patients registered from the system, Here you can
                      view a list of waiting patients.
                    </p>
                    <Link
                      to="/hospital/appointment-list"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-eye" /> View
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "doctor" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Prescription Management</h5>
                    <p className="card-text">
                      Here as a doctor you can view a list of prescribed
                      patients. View all patients precribed from you.
                    </p>
                    <Link
                      to="/hospital/appointment-list"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-medkit" /> View
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "doctor" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Reports Management</h5>
                    <p className="card-text">
                      Here as a doctor you can view a list of prescribed
                      patients. View all patients precribed from you.
                    </p>
                    <Link to="/hospital/reports" className="btn btn-primary">
                      <i className="fa fa-folder-open" /> Reports
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "receptionist" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Patient registration</h5>
                    <p className="card-text">
                      Involve patients registration form. Add new patient to the
                      system.
                    </p>
                    <Link
                      to="/hospital/manage-patients"
                      className="btn btn-primary"
                    >
                      <i className="fa fa-wheelchair-alt" /> Register
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "receptionist" && (
              <div className="col-sm-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Manage patients</h5>
                    <p className="card-text">
                      Update registered patients from the system, here you can
                      edit registered patients details.
                    </p>
                    <Link to="/hospital/patients" className="btn btn-primary">
                      <i className="fa fa-ambulance" /> Manage
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "receptionist" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Reports</h5>
                    <p className="card-text">
                      Here you can view different reports from the system. View
                      total reports directly.
                    </p>
                    <Link to="/hospital/reports" className="btn btn-primary">
                      <i className="fa fa-folder-open" /> Reports
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "pharmacy" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Queue management</h5>
                    <p className="card-text">
                      Here you can view a list of prescribed patients from
                      doctor, give them medicines in your window.
                    </p>
                    <Link to="/hospital/queue" className="btn btn-primary">
                      <i className="fa fa-users" /> Manage
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "pharmacy" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Store management</h5>
                    <p className="card-text">
                      This is where you can find details about stored medicines,
                      orders and Transactions performed by you
                    </p>
                    <Link to="/hospital/store" className="btn btn-primary">
                      <i className="fa fa-university" /> View
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {role === "pharmacy" && (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Report management</h5>
                    <p className="card-text">
                      Here you can view different reports from the system. View
                      total reports directly.
                    </p>
                    <Link to="/hospital/reports" className="btn btn-primary">
                      <i className="fa fa-folder-open" /> Reports
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <hr className="mt-3" />
            <div className="col-md-12 mt-1">
              <h6 className="h6">View Appointment lists</h6>
              {/* TODO FIx Me View list of appointments here */}
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Dashboard;
