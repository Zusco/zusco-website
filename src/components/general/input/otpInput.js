import React from "react";
import PropTypes from "prop-types";
import OtpInput from "react-otp-input";

const OtpField = ({ label, value, onChangeFunc, ...rest }) => {
  const inputStyle = {
    color: "#2A2B2C",
    fontSize: "24px",
    fontWeight: "600",
    border: "0.5px solid #000000",
    borderRadius: "4px",
  };
  return (
    <div className="w-full space-y-1 otp-input">
      {label && <label className="text-sm text-grey-label">{label}</label>}
      <OtpInput
        value={value}
        onChange={onChangeFunc}
        numInputs={4}
        inputStyle={inputStyle}
        placeholder="----"
        {...rest}
      />
    </div>
  );
};
OtpField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChangeFunc: PropTypes.func,
  rest: PropTypes.any,
};
export default OtpField;
