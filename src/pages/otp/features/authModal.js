import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";

import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";

import ModalHeader from "components/general/modal/modalHeader/modalHeader";
import AuthStore from "store/auth";
import SendOtp from "../send/sendOtp";
import VerifyOtp from "../verify/verifyOtp";

const AuthModal = ({
  toggleModal,
  saveFormToStorage,
  handleLoginSuccess,
  active,
}) => {
  const { loading, loadingVerify, authState } = AuthStore;

  return (
    <Modal
      size="md"
      active={active}
      noPadding
      bodyClass="bg-white py-6 px-6"
      toggler={!loading && !loadingVerify && toggleModal}
      backdropClassName="!z-[9999]"
      onClick={!loading && !loadingVerify && toggleModal}
    >
      <ModalHeader>
        <p className="text-blue text-2xl font-bold mb-1">
          Sign in to your zusco account
        </p>

        <p className="text-grey-textalt text-sm">
          Enter your phone number to receive veification code.
        </p>
      </ModalHeader>
      {active && (
        <ModalBody className="!overflow-y-hidden">
          <SendOtp
            modalClass={
              authState === "verify"
                ? "-translate-x-[420px] !max-h-0"
                : "translate-x-0"
            }
          />
          <VerifyOtp
            modalClass={
              authState == "verify"
                ? "translate-x-0"
                : "translate-x-[420px] !max-h-0"
            }
            saveFormToStorage={saveFormToStorage}
            handleLoginSuccess={handleLoginSuccess}
          />
        </ModalBody>
      )}
    </Modal>
  );
};

AuthModal.propTypes = {
  toggleModal: PropTypes.func,
  saveFormToStorage: PropTypes.func,
  handleLoginSuccess: PropTypes.func,
  active: PropTypes.bool,
};

export default observer(AuthModal);
