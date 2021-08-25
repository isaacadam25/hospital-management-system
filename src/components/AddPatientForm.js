import React, { useState, useEffect } from "react";
import { formatDate } from "../services/utilsServices";
import { errorNotify, warnNotify } from "../helpers/notify";
import { getAuthToken } from "../services/authService";
import { getPatientType, registerPatient } from "../services/patientServices";
import { getDoctors } from "../services/doctorsServices";
import { addAppointment } from "../services/appointmentServices";
import DatePicker from "react-datepicker";
import TextFieldController from "../controller/TextFieldController";
import SelectController from "../controller/SelectController";
import TextareaController from "../controller/TextareaController";

const genderOptions = [
  { id: 1, name: "Male" },
  { id: 0, name: "Female" },
];

const initialValues = {
  first_name: "",
  dob: new Date(),
  last_name: "",
  other_name: "",
  is_male: null,
  address: "",
  contacts: "",
  description: "",
  patient_type: 0,
  weight: 0,
  height: 0,
  doctor: 0,
};

const AddPatientForm = () => {
  const [patientType, setPatientType] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [birthDate, setBirthDate] = useState(initialValues.dob);
  const [firstError, setFirstError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [otherNameError, setOtherNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [patientTypeError, setPatientTypeError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [doctorError, setDoctorError] = useState("");

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
    if (values.contacts.length > 15 || isNaN(values.contacts)) {
      setPhoneError("Phone number is not valid.");
      return false;
    } else {
      setPhoneError("");
    }
    if (values.address.length > 40) {
      setAddress("Address value can not exceed 40 characters.");
      return false;
    } else {
      setAddress("");
    }
    if (values.description.length > 150) {
      setDescription("Description content can not exceed 150 characters.");
      return false;
    } else {
      setDescription("");
    }
    if (!values.doctor) {
      setDoctorError("Please select a doctor.");
      return false;
    } else {
      setDoctorError("");
    }

    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let patient = { ...values, dob: formatDate(birthDate) };
      try {
        const { data } = await registerPatient(patient, getAuthToken());
        const payload = {
          description: "Waiting patient",
          patient: data.id,
          doctor: values.doctor,
        };
        try {
          const response = await addAppointment(payload, getAuthToken());
          resetForm();
          console.log(response);
        } catch (ex) {
          console.log(ex.response);
        }
      } catch (ex) {
        console.log(ex.response);
      }
    } else {
      warnNotify("There is error in your form fields. Check for it.");
    }
  };

  const getPatientsType = async () => {
    try {
      const { data } = await getPatientType(getAuthToken());
      setPatientType(data);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await getDoctors(getAuthToken());
      setDoctors(data);
      console.log(data);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  useEffect(() => {
    getPatientsType();
    getAllDoctors();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Register New Patient:</legend>
        <div className="row border-top p-1">
          <div className="col-4">
            <TextFieldController
              label="First Name"
              name="first_name"
              value={values.first_name}
              id="first_name"
              placeholder="Enter patient first name"
              onChange={handleChange}
              required={true}
              invalidText={firstError}
            />
          </div>
          <div className="col-4">
            <TextFieldController
              label="Last Name"
              name="last_name"
              value={values.last_name}
              id="last_name"
              placeholder="Enter patient last name"
              onChange={handleChange}
              required={true}
              invalidText={lastNameError}
            />
          </div>
          <div className="col-4">
            <TextFieldController
              label="Other Name"
              name="other_name"
              value={values.other_name}
              id="other_name"
              placeholder="Enter patient other name"
              onChange={handleChange}
              required={false}
              invalidText={otherNameError}
            />
          </div>
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="bith-date" className="form-label">
                Birth date
              </label>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                className="form-control form-control-sm"
                maxDate={birthDate}
              />
              <div className="text-danger">{birthDateError}</div>
            </div>
          </div>
          <div className="col-4">
            <SelectController
              label="Select Gender"
              options={genderOptions}
              name="is_male"
              value={values.is_male}
              id="is_male"
              onChange={handleChange}
              required={true}
              invalidText={genderError}
            />
          </div>
          <div className="col-4">
            <SelectController
              label="Patient Type"
              options={patientType}
              name="patient_type"
              value={values.patient_type}
              id="patient_type"
              onChange={handleChange}
              required={true}
              invalidText={patientTypeError}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextFieldController
              label="Height"
              type="number"
              name="height"
              value={values.height}
              id="height"
              placeholder="Enter patient height"
              onChange={handleChange}
              required={true}
              invalidText={heightError}
            />
          </div>
          <div className="col-4">
            <TextFieldController
              label="Weight"
              type="number"
              name="weight"
              value={values.weight}
              id="weight"
              placeholder="Enter patient weight"
              onChange={handleChange}
              required={true}
              invalidText={weightError}
            />
          </div>
          <div className="col-4">
            <TextFieldController
              label="Phone No"
              name="contacts"
              value={values.contacts}
              id="contacts"
              placeholder="Enter patient phone No (25578375635)"
              onChange={handleChange}
              required={true}
              invalidText={phoneError}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <TextFieldController
              label="Address"
              name="address"
              value={values.address}
              id="address"
              placeholder="Enter patient address"
              onChange={handleChange}
              required={true}
              invalidText={address}
            />
          </div>
          <div className="col-8">
            <TextareaController
              label="Description"
              name="description"
              value={values.description}
              id="description"
              placeholder="Enter description"
              onChange={handleChange}
              required={true}
              invalidText={description}
            />
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-8">
            <SelectController
              label="Assign a Doctor"
              options={doctors}
              name="doctor"
              value={values.doctor}
              id="doctor"
              onChange={handleChange}
              required={true}
              invalidText={doctorError}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-sm float-end">
              <i className="fa fa-save" /> Register Patient
            </button>
            <button type="reset" className="btn btn-warning btn-sm float-start">
              <i className="fa fa-refresh" /> Reset Form
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default AddPatientForm;
