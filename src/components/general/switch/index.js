import React from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";

import  Loader from "assets/icons/loader/loader.svg";

const AppSwitch = ({
  checked,
  onChange,
  disabled,
  icon,
  title,
  label,
  loading,
}) => {
  return loading ? (
    <Loader className="animate-spin"/>
  ) : (
    <div className={`flex justify-between items-start w-full h-fit space-x-4`}>
      <div className={`flex justify-start items-start w-fit space-x-2`}>
        {icon}
        <div
          className={`flex flex-col justify-start items-start w-fit space-y-2`}
        >
          <span className="text-black text-xs medium-font">{title}</span>

          {label && (
            <span className="text-grey-text text-[11px] regular-font">
              {label}
            </span>
          )}
        </div>
      </div>
      <div className="pl-2 ">
        <Switch
          onChange={onChange}
          checked={checked}
          offColor="#ADB2B8"
          onColor="#00509D"
          disabled={disabled}
          height={18}
          width={35}
          handleDiameter={16}
        />
      </div>
    </div>
  );
};
AppSwitch.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
export default AppSwitch;
