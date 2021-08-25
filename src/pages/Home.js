import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { errorNotify } from "../helpers/notify";
import { getAuthToken, getProfile } from "../services/authService";
import Header from "../layout/Header";
import Dashboard from "./Dashboard";
import RegisterPatients from "./RegisterPatients";
import AppointmentList from "./AppointmentList";
import PrescribePatient from "./PrescribePatient";
import Reports from "./Reports";
import DiagnosePatient from "./DiagnosePatient";
import Logout from "./Logout";
import WaitingPharmacy from "./WaitingPharmacy";
import StoreManage from "./StoreManage";
import SinglePrescription from "./SinglePrescription";
import Prescriptions from "./PrescriptionsLists";
import UserProfile from "./UserProfile";
import Patients from "./Patients";

const Home = () => {
  const [profile, setProfile] = useState({});

  const getUserProfile = async () => {
    try {
      const { data } = await getProfile(getAuthToken());
      setProfile(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorNotify("An unexpected error occurred");
        window.location = "/";
      } else {
        errorNotify("An unexpected error occurred");
        window.location = "/";
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <Header profile={profile} />
      <Route
        exact
        path="/hospital"
        component={() => <Dashboard profile={profile} />}
      />
      <Route path="/logout" component={() => <Logout />} />
      <Route
        exact
        path="/hospital/prescribe-patient/:appointmentId"
        component={() => <PrescribePatient profile={profile} />}
      />
      <Route
        exact
        path="/hospital/diagnose-patient/:appointmentId"
        component={() => <DiagnosePatient profile={profile} />}
      />
      <Route
        exact
        path="/hospital/view-prescription/:prescriptionId"
        component={() => <SinglePrescription profile={profile} />}
      />
      <Route
        path="/hospital/manage-patients"
        component={() => <RegisterPatients profile={profile} />}
      />
      <Route
        path="/hospital/patients"
        component={() => <Patients profile={profile} />}
      />
      <Route
        path="/hospital/appointment-list"
        component={() => <AppointmentList profile={profile} />}
      />
      <Route
        path="/hospital/reports"
        component={() => <Reports profile={profile} />}
      />
      <Route
        path="/hospital/queue"
        component={() => <WaitingPharmacy profile={profile} />}
      />
      <Route
        path="/hospital/prescriptions"
        component={() => <Prescriptions profile={profile} />}
      />
      <Route
        path="/hospital/store"
        component={() => <StoreManage profile={profile} />}
      />
      <Route
        path="/hospital/user-profile"
        component={() => <UserProfile profile={profile} />}
      />
    </>
  );
};

export default Home;
