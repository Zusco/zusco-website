import React from "react";

const roundedBtn = ({ className, text, icon, onClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={`${className} border rounded-full p-[9px] `}
      >
        {text} {icon}
      </button>
    </div>
  );
};

export default roundedBtn;
