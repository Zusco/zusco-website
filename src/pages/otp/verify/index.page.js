import React from "react";
import LandingLayout from "components/layout/landing";
import VerifyOtp from "./verifyOtp";

const AuthHome = () => {
  return (
    <div>
      <LandingLayout>
        <div className="px-6 md:px-12">
          <VerifyOtp />
        </div>
      </LandingLayout>
    </div>
  );
};

export default AuthHome;
