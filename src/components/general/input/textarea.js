import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

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

const Textarea = ({
  placeholder,
  value,
  onChangeFunc,
  isLoading,
  label,
  sm,
  name,
  rows,
}) => {
  const [active, setActive] = useState(false);
  const domNode = useClickOutside(() => {
    setActive(false);
  });

  return (
    <div className={`relative h-full w-full`} ref={domNode}>
      {label && (
        <label className="text-grey general-input-label mb-[12px]">
          {label}
        </label>
      )}
      <div
        className={`textarea-container relative ${
          sm ? "" : "py-3"
        } w-full bg-white rounded-lg flex items-center justify-between  font-normal outline-none capitalize tracking-wider focus:outline-none transition-all duration-150 whitespace-nowrap  text-base leading-relaxed  border border-solid shadow-none text-left
          ${
            active
              ? "border-blue text-black"
              : "hover:bg-grey-whitesmoke border-grey-border"
          }
          ${isLoading && "pointer-events-none"}
          `}
        onClick={() => setActive(true)}
        ref={domNode}
      >
        <textarea
          className={`textarea-component px-4 w-full focus:outline-none focus:border-none rounded-lg bg-transparent text-black
            ${
              !value
                ? "placeholder:text-grey"
                : value.length > 0 || value > 0
                ? "text-black"
                : "placeholder:text-grey"
            }
            ${sm ? "h-[46px] p-3" : "h-32"}
          `}
          value={value}
          placeholder={placeholder}
          name={name}
          id=""
          cols="30"
          rows={rows || "10"}
          ref={domNode}
          maxlength="254"
          onClick={() => setActive(true)}
          onChange={({ target }) => {
            onChangeFunc(target.value, { value: target.value, name });
          }}
        ></textarea>
      </div>
    </div>
  );
};

Textarea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  onChangeFunc: PropTypes.func,
  isLoading: PropTypes.bool,
  sm: PropTypes.bool,
  name: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Textarea;
