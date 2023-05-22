/* eslint-disable react/prop-types */
import React from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import Check from "assets/icons/tick.svg";
const CheckBox = observer(
  ({ onChange, className, labelClass, icon, label, checked }) => {
    return (
      <div
        className={`${className} transition-all duration-150 ease-in-out w-full flex justify-between gap-4 cursor-pointer`}
        onClick={onChange}
      >
        <label
          className={` ${labelClass} ${
            checked && "text-black fill-[#000000] stroke-black"
          } cursor-pointer transition-all duration-150 ease-in-out text-cb text-base items-center flex gap-3 `}
        >
          <p
            className={`invert-[.5] transition-all duration-150 ease-in-out ${
              checked && "invert-0"
            }`}
          >
            {icon}
          </p>
          {label}
        </label>

        <div
          className={`${
            checked ? "bg-black" : ""
          } transition-all duration-150 ease-in-out w-4 h-4 flex justify-center items-center rounded border border-black accent-black medium-font`}
        >
          {checked && <Check color="#ffffff" />}
        </div>
      </div>
    );
  }
);

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.string,
  handleChange: PropTypes.func,
};

export default CheckBox;
