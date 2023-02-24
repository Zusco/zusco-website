import React from "react";
import LandingLayout from "components/layout/landing";
import SendOtp from "./sendOtp";

const AuthHome = () => {
  return (
    <div>
      <LandingLayout>
        <SendOtp />
      </LandingLayout>
    </div>
  );
};

export default AuthHome;
