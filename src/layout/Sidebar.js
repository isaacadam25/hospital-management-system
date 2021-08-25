import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  const { profile } = props;

  const { usertype_name: role } = profile;

  return (
    <div className="list-group list-group-flush mt-2">
      <NavLink
        to="/hospital"
        className="list-group-item list-group-item-action"
      >
        <i className="fa fa-dashboard" /> Dashboard
      </NavLink>
      {role === "receptionist" && (
        <NavLink
          to="/hospital/manage-patients"
          className="list-group-item list-group-item-action"
        >
          <i className="fa fa-plus-square" /> Register Patients
        </NavLink>
      )}
      {role === "receptionist" && (
        <NavLink
          to="/hospital/patients"
          className="list-group-item list-group-item-action"
        >
          <i className="fa fa-users" /> Manage Patients
        </NavLink>
      )}
      {role === "doctor" && (
        <NavLink
          to="/hospital/appointment-list"
          className="list-group-item list-group-item-action"
        >
          <i className="fa fa-calendar-check-o" /> Appointments List
        </NavLink>
      )}
      {role === "doctor" && (
        <NavLink
          to="/hospital/prescriptions"
          className="list-group-item list-group-item-action"
        >
          <i className="fa fa-medkit" /> Prescription
        </NavLink>
      )}
      {role === "pharmacy" && (
        <NavLink
          to="/hospital/queue"
          className="list-group-item list-group-item-action"
        >
          <i className="fa fa-group" /> Patient Queue
        </NavLink>
      )}
      {role === "pharmacy" && (
        <NavLink
          to="/hospital/store"
          className="list-group-item list-group-item-action"
        >
          <i className="fa fa-university" /> Store Management
        </NavLink>
      )}
      <NavLink
        to="/hospital/reports"
        className="list-group-item list-group-item-action"
      >
        <i className="fa fa-folder-open-o" /> Reports
      </NavLink>
    </div>
  );
};

export default Sidebar;
