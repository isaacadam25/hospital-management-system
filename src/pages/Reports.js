import React, { useState, useEffect } from "react";
import { errorNotify, warnNotify } from "../helpers/notify";
import { getAuthToken } from "../services/authService";
import {
  getTodayRegisteredPatients,
  getAllPatient,
} from "../services/patientServices";
import Content from "../layout/Content";
import UseCard from "../components/UseCard";

const Reports = (props) => {
  const [todayRegistered, setTodayRegistered] = useState(0);
  const [todayServed, setTodayServed] = useState(0);
  const [totalRegistered, setTotalRegistered] = useState(0);

  const { profile } = props;

  const getTodayCount = async () => {
    try {
      const { data } = await getTodayRegisteredPatients(getAuthToken());
      const response = await getAllPatient(getAuthToken());
      setTodayRegistered(data.length);
      setTotalRegistered(response.data.length);
      setTodayServed(data.length);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. PLease try again");
      } else {
        warnNotify("Failed to load patients. Plaese try reloading the page.");
      }
    }
  };

  useEffect(() => {
    getTodayCount();
  }, []);

  return (
    <Content title="Reports Management" profile={profile}>
      <div className="col-md-4">
        <UseCard count={todayRegistered} title="Today`s Registered Patients" />
      </div>
      <div className="col-md-4">
        <UseCard count={todayServed} title="Today`s Serviced Patients" />
      </div>
      <div className="col-md-4">
        <UseCard count={totalRegistered} title="Total Registered Patients" />
      </div>
    </Content>
  );
};

export default Reports;
