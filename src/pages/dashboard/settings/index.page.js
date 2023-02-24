import React from "react";
import DashboardLayout from "components/layout/dashboard";
import SettingsHome from "./features"
const Settings = () => {
  return (
    <div>
      <DashboardLayout>
        <SettingsHome />
      </DashboardLayout>
    </div>
  );
};

export default Settings;
