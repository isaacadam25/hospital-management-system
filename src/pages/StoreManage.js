import React, { useState } from "react";
import Content from "../layout/Content";
import UseCard from "../components/UseCard";
import ReceivedTable from "../components/ReceivedTable";
import ShortInfo from "../components/ShortInfo";

const StoreManage = (props) => {
  const [pendingCount, setPendingCount] = useState(0);

  const { profile } = props;

  const { organization_number, organization_name } = profile;

  return (
    <Content title="Store management" profile={profile}>
      <div className="col-md-4">
        <UseCard count={126} title="Sold Medicine" />
      </div>
      <div className="col-md-4">
        <UseCard count={256} title="Available Medicine" />
      </div>
      <div className="col-md-4">
        <UseCard count={400} title="Received Medicine" />
      </div>

      <div className="col-md-9 p-3">
        <h6 className="text-center">
          Received orders table for {organization_name}
        </h6>
        <ReceivedTable
          organization_number={organization_number}
          setPendingCount={setPendingCount}
        />
      </div>
      <div className="col-md-3 mt-5 p-3">
        <ShortInfo pendingCount={pendingCount} />
      </div>
    </Content>
  );
};

export default StoreManage;
