import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { errorNotify, warnNotify, successNotify } from "../helpers/notify";
import { addDiagnosisDetails } from "../services/diagnosisServices";
import { getAuthToken } from "../services/authService";
import TextareaController from "../controller/TextareaController";

const diagnosis = {
  appointment: 0,
  diagnoses: "",
  complaints: "",
  description: "",
};

const DiagnoseForm = () => {
  const [diagnosisValues, setDiagnosisValues] = useState(diagnosis);
  const [diagnosisError, setDiagnosisError] = useState("");
  const [camplainsError, setCamplainsError] = useState("");
  const [descriptionError, setdescriptionError] = useState("");

  const history = useHistory();
  const { appointmentId } = useParams();

  const validate = () => {
    if (!isNaN(diagnosisValues.diagnoses || diagnosisValues.diagnoses >= 200)) {
      setDiagnosisError("Numbers are not allowed");
      return false;
    } else {
      setDiagnosisError("");
    }
    if (
      !isNaN(diagnosisValues.complaints || diagnosisValues.complaints >= 200)
    ) {
      setCamplainsError("Numbers are not allowed");
      return false;
    } else {
      setCamplainsError("");
    }
    if (
      !isNaN(diagnosisValues.description || diagnosisValues.description >= 200)
    ) {
      setdescriptionError("Numbers are not allowed");
      return false;
    } else {
      setdescriptionError("");
    }
    return true;
  };

  const handleChange = (e) => {
    setDiagnosisValues({ ...diagnosisValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const values = {
        appointment: appointmentId,
        diagnoses: diagnosisValues.diagnoses,
        complaints: diagnosisValues.complaints,
        description: diagnosisValues.description,
      };
      try {
        const { data } = await addDiagnosisDetails(values, getAuthToken());
        successNotify("Diagnosis details added successfully.");
        history.push(`/hospital/prescribe-patient/${data.appointment}`);
      } catch (ex) {
        if (ex.response.status >= 500) {
          errorNotify("An unexpected error occurred. Please try again later.");
        } else {
          warnNotify("Failed to diagnose patient. Plaese try again later.");
        }
      }
    } else {
      warnNotify("There is an errors in your form filds. Please check it.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Diagnose a Patient:</legend>
        <div className="row justify-content-center border-top p-3">
          <div className="col-8">
            <TextareaController
              label="Complain"
              name="complaints"
              value={diagnosisValues.complaints}
              id="complaints"
              placeholder="Enter patient complains"
              onChange={handleChange}
              required={true}
              invalidText={camplainsError}
            />
          </div>
          <div className="col-8">
            <TextareaController
              label="diagnoses"
              name="diagnoses"
              value={diagnosisValues.diagnoses}
              id="diagnoses"
              placeholder="Enter diagnosis details"
              onChange={handleChange}
              required={true}
              invalidText={diagnosisError}
            />
          </div>
          <div className="col-8">
            <TextareaController
              label="Description"
              name="description"
              value={diagnosisValues.description}
              id="description"
              placeholder="Write some description"
              onChange={handleChange}
              required={true}
              invalidText={descriptionError}
            />
          </div>
          <input type="hidden" name="appointment" value={appointmentId} />
          <div className="col-8">
            <button className="btn btn-primary float-end">Diagnose</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default DiagnoseForm;
