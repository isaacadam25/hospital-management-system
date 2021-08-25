import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { errorNotify, warnNotify, successNotify } from "../helpers/notify";
import { getAuthToken } from "../services/authService";
import { getAllMedicine, getSingleBatch } from "../services/medicineService";
import { addPrescription } from "../services/prescriptionService";
import SelectController from "../controller/SelectController";
import TextFieldController from "../controller/TextFieldController";
import TextareaController from "../controller/TextareaController";

const dosage = [
  { id: 1, name: "2 x 3" },
  { id: 2, name: "1 x 3" },
  { id: 3, name: "1 x 1" },
];

const initialValues = {
  appointment: 0,
  batch: 0,
  quantity: 0,
  sid: "",
  description: "",
};

const PrescribeForm = (props) => {
  const [options, setOptions] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [totalDrugs, setTotalDrugs] = useState(0);
  const [quantityError, setQuantityError] = useState("");
  const [batchError, setBatchError] = useState("");
  const [sidError, setSidError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const { appointmentId } = props;

  const history = useHistory();

  const validate = () => {
    if (!formValues.batch) {
      setBatchError("Please select medicine to prescribe");
      return false;
    } else {
      setBatchError("");
    }
    if (formValues.quantity > totalDrugs || Number(formValues.quantity) <= 0) {
      setQuantityError("Quantity not valid/insufficient stock");
      return false;
    } else {
      setQuantityError("");
    }
    if (!formValues.sid) {
      setSidError("Please select dosage to prescribe");
      return false;
    } else {
      setSidError("");
    }
    if (formValues.description.length > 150 || !isNaN(formValues.description)) {
      setDescriptionError("Description is not valid");
      return false;
    } else {
      setDescriptionError("");
    }
    return true;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        appointment: appointmentId,
        batch: formValues.batch,
        quantity: formValues.quantity,
        sid: formValues.sid,
        description: formValues.description,
      };

      try {
        await addPrescription(data, getAuthToken());
        successNotify("Prescription added successfully.");
        resetForm();
        history.push("/hospital/appointment-list");
      } catch (ex) {
        if (ex.response.status >= 500) {
          errorNotify("An unexpected error occurred. Plaese try again later.");
        } else {
          warnNotify("Failed to add prescription details. Please try again.");
        }
      }
    } else {
      warnNotify("There is error in your form fields. Please check your form.");
    }
  };

  const getMedicines = async () => {
    try {
      const { data } = await getAllMedicine(getAuthToken());
      setOptions(data.map((x) => ({ id: x.id, name: x.medicine_name })));
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorNotify("An unexpected error occurred. Plaese try again later.");
      } else {
        warnNotify("Failed to retrieve medicine details. Please try again.");
      }
    }
  };

  const getSingleMedicine = async (id) => {
    try {
      const { data } = await getSingleBatch(id, getAuthToken());
      setTotalDrugs(data.quantity_measure * data.quantity_received - data.used);
      console.log(totalDrugs);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  if (formValues.batch > 0) {
    getSingleMedicine(Number(formValues.batch));
  }

  const resetForm = () => {
    setFormValues(initialValues);
  };

  useEffect(() => {
    getMedicines();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Prescribe a Patient:</legend>
        <div className="row border-top p-2">
          <div className="col-6">
            <SelectController
              label="Medicine Name :"
              name="batch"
              options={options}
              onChange={handleChange}
              invalidText={batchError}
            />
          </div>
          <div className="col-6">
            <TextFieldController
              label="Quantity :"
              name="quantity"
              placeholder="Enter drug quantity"
              type="number"
              value={formValues.quantity}
              onChange={handleChange}
              invalidText={quantityError}
            />
          </div>
          <div className="col-6">
            <SelectController
              label="Select Dosage :"
              value={formValues.sid}
              onChange={handleChange}
              name="sid"
              options={dosage}
              invalidText={sidError}
            />
          </div>
          <div className="col-6">
            <TextareaController
              label="Description :"
              value={formValues.description}
              onChange={handleChange}
              name="description"
              invalidText={descriptionError}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary btn-sm float-end">
              <i className="fa fa-heart" /> Prescribe
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default PrescribeForm;
