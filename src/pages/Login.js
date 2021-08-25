import React, { useState } from 'react';
import { login } from "../services/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
    username: "reception",
    password: "Hospital1234"
}

const Login = () => {
    const [values, setValues] = useState(initialValues);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(values.username, values.password);
            localStorage.setItem("token", data.token);
            window.location = "/hospital";
        } catch (ex) {
            console.log(ex.response);
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name] : e.target.value });
    };

    return (
        <div className="row flex-row justify-content-center">
            <img src="/images/hms-logo3.jpg" height={200} alt="logo"/>
            <ToastContainer />
            <div className="col-md-6 mt-5 bg-light card">
                <h4 className="text-center p-3 h4">Hospital Management System</h4>
                <form className="p-3">
                    <div className="row justify-content-center">
                        <div className="mb-3 col-8">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input type="text" name="username" value={values.username} onChange={handleChange}  className="form-control" id="exampleInputEmail1"
                                    />
                        </div>
                        <div className="mb-1 col-8">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name="password" value={values.password} onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 col-8">
                            <button type="submit" onClick={handleSubmit} className="btn m-2 btn-primary float-end">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
