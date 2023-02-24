import React from "react";

import DashboardLayout from "components/layout/dashboard";
import FavoriteHost from "../features/favoriteHost";

const BookingsHome = () => {
  return (
    <div>
      <DashboardLayout hasHeader>
        <FavoriteHost />
      </DashboardLayout>
    </div>
  );
};

export default BookingsHome;
