import React from "react";
import PropTypes from "prop-types";
import clsx from "classnames";
import  CancelIcon from "assets/icons/cancel.svg";

const Modal = ({
  active,
  toggler,
  size,
  children,
  noPadding,
  className,
  bodyClass = "bg-white min-h-[570px]",
  togglerClass = "top-0",
  absolute,
}) => {
  const modalClassNames = {
    "max-w-lg": size === "lg",
    "max-w-md": size === "md",
    "max-w-sm": size === "sm",
    "sm:min-w-[75vw]": size === "xl",
    "w-[99%] sm:w-[75vw]": size === "xl",
    " sm:max-w-[600px]": size === "xl",
    "w-fit": !size,
    "translate-y-0 opacity-100 pointer-events-auto": active,
    "-translate-y-1/4 opacity-0 pointer-events-none": !active,
    "p-[32px]": !noPadding,
    [className]: className,
  };

  return (
    <div
      className={`h-screen w-full ${
        absolute ? "absolute" : "fixed"
      } py-8 !m-0 flex justify-center items-start overflow-y-auto backdrop z-[900] top-0 left-0
    ${
      active
        ? "transition-all duration-100 ease-in-out opacity-100 pointer-events-auto"
        : "transition-all duration-300 ease-in-out opacity-0 !pointer-events-none"
    }
    `}
    >
      <div
        className={clsx(
          `${bodyClass} max-h-fit modal-content-area scale-in-slow relative flex flex-col justify-start mt-4 rounded-lg w-full transition-all z-[900] duration-300 ease-in-out`,
          { ...modalClassNames }
        )}
      >
        {children}
        {toggler && (
          <div
            className={`absolute ${togglerClass} -right-14 cursor-pointer flex justify-center items-center text-white bg-grey-whitesmoke bg-opacity-30 hover:bg-opacity-100 hover:text-black hover:bg-white rounded-full transition-all duration-150 ease-in-out z-[999999]`}
            onClick={toggler}
          >
            <div className="h-8 w-8 relative flex justify-center items-center ">
              <CancelIcon className="stroke-current" />
            </div>
          </div>
        )}
      </div>

      <div className="fixed top-0 left-0 h-screen w-full !my-0 "></div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  toggler: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.elementType,
  noPadding: PropTypes.bool,
  className: PropTypes.string,
  togglerClass: PropTypes.string,
  bodyClass: PropTypes.string,
  absolute: PropTypes.bool,
};

export default Modal;
