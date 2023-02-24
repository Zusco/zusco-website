import React from "react";
import DashboardLayout from "components/layout/dashboard";
import ProfileHome from "./features";

const UserProfile = () => {
  return (
    <div>
      <DashboardLayout>
        <ProfileHome />
      </DashboardLayout>
    </div>
  );
};

export default UserProfile;
