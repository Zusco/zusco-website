import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import  PasswordCloseIcon from "assets/icons/password/password_close_icon.svg";
import  PasswordIcon from "assets/icons/password/password_icon.svg";

const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current.contains(event.target || event.target.childNodes)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Input = ({
  placeholder,
  name,
  required,
  value,
  label,
  type,
  onChangeFunc,
  isFocused,
  isLoading,
  isError,
  currency,
  isDisabled,
  prefix,
  withIcon,
  rightIcon,
  icon,
  className,
  labelClass,
  inputClass,
  search,
  ...rest
}) => {
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();

  const domNode = useClickOutside(() => {
    setActive(false);
  });

  useEffect(() => {
    if (!isFocused) return;
    inputRef.current.focus();
    setActive(true);
  }, [isFocused]);

  useEffect(() => {
    if (!isError) return setError(false);
    setError(true);
  }, [isError]);

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          className={`${labelClass} medium-font text-base text-black text-left`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative flex flex-col justify-start items-center h-full w-full`}
        ref={domNode}
      >
        <div
          className={`${className} relative h-14  msm:h-10 w-full bg-white flex  space-x-1 items-center justify-between regular-font outline-none capitalize tracking-wider focus:outline-none transition-all duration-150 ease-in-out whitespace-nowrap  text-base leading-relaxed ${
            search
              ? "border-b-[0.5px] box-shadow-input border-black/[.5] rounded-t hover:border hover:border-black/[.2]"
              : "border rounded"
          }  border-solid text-left
           
        ${
          error
            ? "!border-red"
            : active
            ? "border-blue"
            : "hover:bg-grey-whitesmoke border-grey-border"
        }
        ${isLoading && "pointer-events-none"}
        `}
          onClick={() => setActive(true)}
          ref={domNode}
        >
          {type === "number" ? (
            <div
              className={`w-full h-full flex justify-start items-center ${{
                "pl-3": currency,
              }}`}
            >
              {currency && <span>{currency}</span>}
              <NumberFormat
                ref={inputRef}
                value={value}
                name={name}
                required={required}
                placeholder={placeholder}
                thousandSeparator
                prefix={prefix}
                className={`p-3 ease-in-out h-full w-full regular-font z-10 focus:outline-none focus:border-none rounded-lg bg-transparent placeholder:text-grey`}
                inputMode="numeric"
                onValueChange={(number) =>
                  onChangeFunc(number.value, { name, value: number.value })
                }
                {...rest}
              />
            </div>
          ) : (
            <input
              ref={inputRef}
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type === "text"
                  ? "text"
                  : `${type}`
              }
              value={value}
              // value={!value ? "" : value?.length > 0 || value > 0 ? value : ""}
              onChange={({ target }) => {
                onChangeFunc(target.value, { name, value: target.value });
              }}
              placeholder={placeholder}
              className={`${inputClass} ${
                withIcon ? "pl-12" : ""
              }  px-5 py-7 ease-in-out h-full w-full z-10 focus:outline-none focus:border-none  bg-transparent placeholder:text-[#686B6F]
        ${
          !value
            ? ""
            : value?.length > 0 || value > 0
            ? "text-black"
            : "placeholder:text-[#686B6F] "
        }
        `}
              {...rest}
            />
          )}

          {isDisabled && (
            <span
              className={`h-full w-full absolute top-0 right-0 flex justify-center items-center cursor-pointer z-10 `}
            ></span>
          )}

          {type === "password" && (
            <span
              className={`h-full w-12 absolute top-0 right-0 flex justify-center items-center cursor-pointer z-20`}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <PasswordCloseIcon className="stroke-current" />
              ) : (
                <PasswordIcon className="stroke-current" />
              )}
            </span>
          )}

          {withIcon && (
            <span
              className={`h-full w-12 text-grey absolute top-0 left-0 flex justify-center items-center cursor-pointer z-20`}
            >
              {icon}
            </span>
          )}

          {rightIcon && (
            <span
              className={`h-full w-12 text-grey absolute top-0 right-0 flex justify-center items-center cursor-pointer z-20`}
            >
              {icon}
            </span>
          )}
          <div>
            <div className="h-full flex mx-1 justify-center items-center">
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                ></svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.any,
  onChangeFunc: PropTypes.func,
  isFocused: PropTypes.any,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  currency: PropTypes.any,
  isDisabled: PropTypes.bool,
  prefix: PropTypes.string,
  rest: PropTypes.object,
  withIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  search: PropTypes.bool,
  icon: PropTypes.any,
  className: PropTypes.any,
  inputClass: PropTypes.any,
  labelClass: PropTypes.any,
};

export default Input;
