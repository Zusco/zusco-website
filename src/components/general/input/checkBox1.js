/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";

const CheckBox = observer(
  ({
    name,
    onChange,
    className,
    labelClass,
    inputClass,
    icon,
    label,
    id,
    value,
  }) => {
    const [toggleStyle, setToggleStyle] = useState(false);
    return (
      <div className={`${className}  flex justify-between`}>
        <label
          className={` ${labelClass} ${
            toggleStyle && "text-black fill-[#000000] stroke-black"
          }  text-cb text-base items-center flex gap-3 `}
          htmlFor="Info"
        >
          {" "}
          <p className={`invert-[.5] ${toggleStyle && "invert-0"}`}>
            {icon}
          </p>{" "}
          {label}
        </label>

        <input
          type="checkbox"
          id={id}
          value={value}
          name={name}
          onChange={onChange}
          className={`${inputClass} border-2 border-black accent-black medium-font cursor-pointer`}
          onClick={() => setToggleStyle((prevState) => !prevState)}
        />
      </div>
    );
  }
);

CheckBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.string,
  handleChange: PropTypes.func,
};

export default CheckBox;
