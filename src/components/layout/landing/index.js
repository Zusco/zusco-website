import React from "react";
import PropTypes from "prop-types";

import Header from "./header";
import Footer from "./footer";

const LandingLayout = ({ children }) => {

  return (
    <div className="w-screen min-h-screen h-screen flex flex-grow flex-col">
      <Header />
      <section className="w-full flex flex-row flex-grow max-w-9xl mx-auto mt-[70px]">
        <main
          className={`website-content w-full pb-14 pt-[0px] flex flex-col flex-grow`}
        >
          {children}
        </main>
      </section>
      <Footer />
    </div>
  );
};

LandingLayout.propTypes = {
  children: PropTypes.any,
};

export default LandingLayout;
