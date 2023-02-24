import React from "react";
import DashboardLayout from "components/layout/dashboard";
import Content from "./features/mainContent";
import ExploreStore from "./store/index";

const DashboardHome = () => {
  return (
    <div>
      <DashboardLayout hasHeader>
        <Content store={ExploreStore} />
      </DashboardLayout>
    </div>
  );
};

export default DashboardHome;
