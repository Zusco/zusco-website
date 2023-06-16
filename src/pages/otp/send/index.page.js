import React from "react";
import LandingLayout from "components/layout/landing";
import SendOtp from "./sendOtp";

const AuthHome = () => {
  return (
    <div>
      <LandingLayout>
        <div className="px-6 md:px-12">
          <SendOtp />
        </div>
      </LandingLayout>
    </div>
  );
};

export default AuthHome;
