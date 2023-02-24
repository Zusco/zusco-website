import React from "react";
import LandingLayout from "components/layout/landing";

import Banner from "./features/banner";
import Content from "./features/mainContent";
import LandingStore from "./store";

const HomePage = () => {
  return (
    <LandingLayout>
      <div className="bg-white-back space-y-16">
        <Banner />
        <Content store={LandingStore} />
      </div>
    </LandingLayout>
  );
};

export default HomePage;
