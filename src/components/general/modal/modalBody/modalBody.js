import React from "react";
import PropTypes from "prop-types";

const ModalBody = ({ children }) => {
  return (
    <div className="body-content flex flex-col justify-start items-start w-full h-fit max-h-[80vh] flex-grow overflow-y-scroll overflow-x-hidden">
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  children: PropTypes.any,
};

export default ModalBody;
