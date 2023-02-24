import React from "react";
import PropTypes from "prop-types";

const ModalHeader = ({ children }) => {
  return (
    <div className="border-b border-grey-border pb-4 text-xl text-left">
      {children}
    </div>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.elementType,
};

export default ModalHeader;
