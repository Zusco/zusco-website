import React from "react";
import LandingLayout from "components/layout/landing";
import Content from "./features/mainContent";
import ExploreStore from "./store/index";

const DashboardHome = () => {
  return (
    <div>
      <LandingLayout>
        <Content store={ExploreStore} />
      </LandingLayout>
    </div>
  );
};

export default DashboardHome;
