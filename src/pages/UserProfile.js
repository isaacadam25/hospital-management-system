import React from 'react';
import moment from "moment";
import Content from "../layout/Content";

const UserProfile = (props) => {
    const { profile } = props;

    const { first_name, last_name, organization_name, title: role, is_active, date_added } = profile;

    return (
        <>
            <Content profile={profile}>
                <div className="col-md-12">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <h6 className="text-center p-2">{first_name}`s Information</h6>
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="/images/avatar.png" className="img-fluid rounded-start" alt="avatar" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <table className="table table-hover table-striped ">
                                                <tbody>
                                                <tr>
                                                    <td><b>Full Name: </b></td><td>{first_name} {last_name}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textTransform: "capitalize" }}><b>Organization: </b></td><td>{organization_name}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Role: </b></td><td>{role}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>User Status: </b></td><td className="text-success">{is_active ? "Active" : "Suspended"}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Date Registered: </b></td><td>{moment(date_added).format('LL')}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
};

export default UserProfile;
