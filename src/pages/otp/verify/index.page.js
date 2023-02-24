import React from "react";
import LandingLayout from "components/layout/landing";
import VerifyOtp from "./verifyOtp";

const AuthHome = () => {
  return (
    <div>
      <LandingLayout>
        <VerifyOtp />
      </LandingLayout>
    </div>
  );
};

export default AuthHome;
