import React from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";

import AuthStore from "store/auth";
import DashboardLayout from "./dashboard";
import LandingLayout from "./landing";

const CommonLayout = ({ children }) => {
  const { isAuthenticated } = AuthStore;

  return isAuthenticated ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <LandingLayout>{children}</LandingLayout>
  );
};
CommonLayout.propTypes = {
  children: PropTypes.any,
};

export default observer(CommonLayout);
