import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { errorNotify, successNotify, warnNotify } from "../helpers/notify";
import { getAuthToken } from "../services/authService";
import {
  getAllPatient,
  getSinglePatientDetails,
  updateSinglePatientDetails,
} from "../services/patientServices";
import Content from "../layout/Content";
import TableHeadController from "../controller/TableHeadController";
import TableController from "../controller/TableController";
import ModalController from "../controller/ModalController";
import TextFieldController from "../controller/TextFieldController";
import TextareaController from "../controller/TextareaController";
import SelectController from "../controller/SelectController";

const headCells = [
  { id: 0, title: "Pat Number" },
  { id: 1, title: "First name" },
  { id: 2, title: "Last name" },
  { id: 3, title: "Other name" },
  { id: 4, title: "Birth date" },
  { id: 5, title: "Gender" },
  { id: 6, title: "Address" },
  { id: 7, title: "Action" },
];

const Patients = (props) => {
  const [patients, setPatients] = useState([]);
  const [values, setValues] = useState({});
  const [show, setShow] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [firstError, setFirstError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [otherNameError, setOtherNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [patientTypeError, setPatientTypeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [address, setAddress] = useState("");

  const { profile } = props;

  const validate = () => {
    if (values.first_name.length > 30) {
      setFirstError("Value can not exceed 30 characters.");
      return false;
    } else {
      setFirstError("");
    }
    if (values.last_name.length > 30) {
      setLastNameError("Value can not exceed 30 characters.");
      return false;
    } else {
      setLastNameError("");
    }
    if (values.last_name.length > 30) {
      setOtherNameError("Value can not exceed 30 characters.");
      return false;
    } else {
      setOtherNameError("");
    }
    if (!birthDate) {
      setBirthDateError("Please select patient birth date.");
      return false;
    } else {
      setBirthDateError("");
    }
    if (!values.is_male) {
      setGenderError("Please select a patient gender.");
      return false;
    } else {
      setGenderError("");
    }
    if (values.patient_type === 0 || !values.patient_type) {
      setPatientTypeError("Please select patient type.");
      return false;
    } else {
      setPatientTypeError("");
    }
    if (values.weight <= 1) {
      setWeightError("Weight value is not valid.");
      return false;
    } else {
      setWeightError("");
    }
    if (values.height <= 49) {
      setHeightError("Height value is not valid.");
      return false;
    } else {
      setHeightError("");
    }
    if (values.address.length > 40) {
      setAddress("Address value can not exceed 40 characters.");
      return false;
    } else {
      setAddress("");
    }

    return true;
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleFormChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showDialog = async (id) => {
    setShow(true);
    try {
      const { data } = await getSinglePatientDetails(id, getAuthToken());
      setValues(data);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Patient trying to retrieve is not available. Please try reloading page."
        );
      }
    }
  };

  const updatePatientDetails = async (id) => {
    setValues({ ...values, dob: birthDate });
    try {
      const response = await updateSinglePatientDetails(
        id,
        values,
        getAuthToken()
      );
      console.log(response);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Patient trying to update is not available. Please try reloading page."
        );
      }
    }
  };

  const getPatients = async () => {
    try {
      const { data } = await getAllPatient(getAuthToken());
      setPatients(data);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorNotify("An unexpected error occurred. Please try again later.");
      } else {
        warnNotify(
          "Patients trying to retrieve is not available. Please try reloading page."
        );
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updatePatientDetails(values.id);
      setShow(false);
      successNotify("Patient updated successfully");
    } else {
      warnNotify("There is error in your form fields. Please check it.");
    }
  };

  useEffect(() => {
    getPatients();
  }, [show]);

  return (
    <Content title="Manage Patients" profile={profile}>
      <div className="row">
        <div className="col-md-12">
          <TableController>
            <TableHeadController headCells={headCells} />
            <tbody>
              {patients &&
                patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.serial_number}</td>
                    <td>{patient.first_name}</td>
                    <td>{patient.last_name}</td>
                    <td>
                      {patient.other_name ? patient.other_name : "not filled"}
                    </td>
                    <td>{patient.dob}</td>
                    <td>{patient.is_male ? "Male" : "Female"}</td>
                    <td>{patient.address}</td>
                    <td>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => showDialog(patient.id)}
                      >
                        <i className="fa fa-edit" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </TableController>
        </div>
      </div>
      <ModalController show={show} handleClose={handleClose} btnText="Cancel">
        <h5 className="text-center h5">Patient Details</h5>
        <form onSubmit={handleFormSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <TextFieldController
                value={values.first_name}
                name="first_name"
                label="First name"
                onChange={handleFormChange}
                invalidText={firstError}
              />
            </div>
            <div className="col-md-6">
              <TextFieldController
                value={values.last_name}
                name="last_name"
                label="Last name"
                onChange={handleFormChange}
                invalidText={lastNameError}
              />
            </div>
            <div className="col-md-6">
              <TextFieldController
                value={values.other_name}
                name="other_name"
                placeholder="Enter other name"
                label="Other name"
                onChange={handleFormChange}
                invalidText={otherNameError}
              />
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="birth-date" className="form-label">
                  Birth date
                </label>
                <ReactDatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  maxDate={birthDate}
                  className="form-control form-control-sm"
                />
                <div className="text-danger">{birthDateError}</div>
              </div>
            </div>
            <div className="col-md-6">
              <SelectController
                name="is_male"
                value={values.is_male}
                label="Gender"
                onChange={handleFormChange}
                invalidText={genderError}
              />
            </div>
            <div className="col-md-6">
              <SelectController
                name="patient_type"
                value={values.patient_type}
                label="Patient type"
                onChange={handleFormChange}
                invalidText={patientTypeError}
              />
            </div>
            <div className="col-md-6">
              <TextFieldController
                name="weight"
                value={values.weight}
                label="Weight"
                onChange={handleFormChange}
                invalidText={weightError}
              />
            </div>
            <div className="col-md-6">
              <TextFieldController
                name="height"
                value={values.height}
                label="Height"
                onChange={handleFormChange}
                invalidText={heightError}
              />
            </div>
            <div className="col-md-12">
              <TextareaController
                name="address"
                value={values.address}
                label="Address"
                onChange={handleFormChange}
                invalidText={address}
              />
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary btn-sm">
                <i className="fa fa-refresh" />
                &nbsp; Update
              </button>
            </div>
          </div>
        </form>
      </ModalController>
    </Content>
  );
};

export default Patients;
