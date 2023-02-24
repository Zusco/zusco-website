import React from "react";
import Booked from "./features/mainContent";
import DashboardLayout from "components/layout/dashboard";

const BookingsHome = () => {
  return (
    <div>
      <DashboardLayout hasHeader>
        <Booked />
      </DashboardLayout>
    </div>
  );
};

export default BookingsHome;
