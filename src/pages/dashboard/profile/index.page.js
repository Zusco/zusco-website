import React from "react";
import DashboardLayout from "components/layout/dashboard";
import Profile from "./features/profile";
import Content from "./features/prevStay";
import ProfileStore from "./store/index";

const DashboardHome = () => {
  return (
    <div>
      <DashboardLayout>
        <div className="md:px-8 md:py-6 px-6 py-4 grid md:grid-cols-[60%,_38%] grid-cols-[1fr] md:justify-between justify-center">
          <Profile store={ProfileStore} />
          <Content store={ProfileStore} />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DashboardHome;
