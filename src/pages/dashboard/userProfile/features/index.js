import React from "react";
import Form from "./form";

const ProfileHome = () => {
  return (
    <div className="flex flex-col justify-start items-start h-full w-full">
      <div className="flex flex-row justify-start items-start h-fit  w-full bg-white p-4 border-b-1/2 border-grey-border">
        <h3 className="text-lg text-black regular-font">Edit Profile</h3>
      </div>

      <div className="flex flex-col justify-start items-start h-full w-full px-6 overflow-y-scroll">
        <Form />
      </div>
    </div>
  );
};

export default ProfileHome;
