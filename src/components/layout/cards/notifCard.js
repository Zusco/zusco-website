import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import  RequestNotif from "assets/icons/dashboard/requestNotif.svg";
import  LikeNotif from "assets/icons/dashboard/likeNotif.svg";
import  ChatNotif from "assets/icons/dashboard/chatNotif.svg";

const NotificationCard = observer(
  ({ request, like, message, name, content, time }) => {
    return (
      <div className="grid grid-cols-[3rem_1fr_3rem] gap-3 py-3 border-b">
        <div className="p-[13px] border rounded-full">
          {request && <RequestNotif />}
          {like && <LikeNotif />}
          {message && <ChatNotif />}
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-[14px] text-black">{name}</p>
          <p className="text-[11px] text-[#A4A4A4]">{content}</p>
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-[11px] text-[#A4A4A4] font-light">{time}</p>
          <p className="text-[11px] text-blue-alt font-light float-right cursor-pointer">
            View
          </p>
        </div>
      </div>
    );
  }
);

NotificationCard.propTypes = {
  request: PropTypes.boolean,
  like: PropTypes.boolean,
  message: PropTypes.boolean,
  name: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
};

export default NotificationCard;
