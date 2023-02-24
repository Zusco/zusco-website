import React from "react";

import DashboardLayout from "components/layout/dashboard";
import FavoriteShortlets from "../features/favoriteShortlets";

const BookingsHome = () => {
  return (
    <div>
      <DashboardLayout hasHeader>
        <FavoriteShortlets />
      </DashboardLayout>
    </div>
  );
};

export default BookingsHome;
