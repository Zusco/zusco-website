import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import AuthStore from "store/auth";
import AuthModal from "pages/otp/features/authModal";
import Header from "./header";
import Footer from "./footer";

const LandingLayout = ({ children }) => {
  const { showAuthModal, setShowAuthModal } = AuthStore;
  return (
    <div
      className="w-screen min-h-screen h-screen flex flex-grow flex-col"
      id="home_banner"
    >
      <Header />
      <section className="w-full flex flex-row flex-grow max-w-9xl mx-auto mt-[70px]">
        <main
          className={`website-content w-full pb-14 pt-[0px] flex flex-col flex-grow`}
        >
          {children}
        </main>
      </section>
      <Footer />

      <AuthModal
        active={showAuthModal}
        toggleModal={() => setShowAuthModal(false)}
        handleLoginSuccess={() => {
          setShowAuthModal(false);
        }}
      />
    </div>
  );
};

LandingLayout.propTypes = {
  children: PropTypes.any,
};

export default observer(LandingLayout);
