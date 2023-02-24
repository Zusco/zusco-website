import React from "react";
import NotificationCard from "../cards/notifCard";

const Notification = () => {
  return (
    <div className="w-[20rem] bg-white py-5 px-6 rounded">
      <h3 className="flex justify-between pb-4 border-b">
        <p className="medium-font text-[12px] text-blue-9">
          Notification <span className="text-[#A4A4A4]"> (2 new) </span>
        </p>
        <p className="medium-font text-[10px] text-blue-alt">
          MARK ALL AS READ
        </p>
      </h3>
      <div className="">
        <NotificationCard
          request
          name="John Smith"
          content="Just requested for Villa Alto"
          time="5 mins"
        />
        <NotificationCard
          message
          name="Mayowa racheal"
          content="From Chizara Anunobi"
          time="07:30 am"
        />
      </div>
    </div>
  );
};

export default Notification;
