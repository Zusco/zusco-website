import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import  ZuscoLogo from "assets/icons/dashboard/authZuscoLogo.svg";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen min-h-[500px] flex flex-grow flex-col ">
      <header className="dashboard-header flex flex-row justify-between items-center w-full border-b border-grey-border h-[4.5rem] py-4">
        <div className="relative flex flex-row justify-between items-center mx-auto w-full px-10">
          <Link href="/">
            <div className="h-8 w-16 !my-0">
              <ZuscoLogo className="w-full h-full" />
            </div>
          </Link>
        </div>
      </header>

      <main className="bg-white-back w-full pb-14 flex flex-col align-center justify-center flex-grow overflow-y-auto max-w-9xl mx-auto pt-[4.5rem]">
        {children}
      </main>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.any,
};

export default AuthLayout;
