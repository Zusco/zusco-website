import React from "react";
import DashboardLayout from "components/layout/dashboard";
import MessagesHome from "./features";

const Messages = () => {
  return (
    <div>
      <DashboardLayout>
        <MessagesHome />
      </DashboardLayout>
    </div>
  );
};

export default Messages;
