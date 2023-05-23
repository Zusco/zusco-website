import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import moment from "moment";

import CommonStore from "store/common";
import NotificationBooking from "assets/icons/notification-booking.svg";
import NotificationMessage from "assets/icons/notification-message.svg";
import ClearAllButton from "components/general/button/clearAllButton";

const NotificationPane = ({ className, onClose }) => {
  const { notificationItems, handleSetNotificationItems } = CommonStore;

  return (
    <div
      className={`h-screen w-full fixed py-8 !m-0 flex justify-center items-start overflow-y-auto backdrop  top-0 left-0
  transition-all duration-100 ease-in-out opacity-100 pointer-events-auto z-[900]
`}
    >
      <div
        className={`flex flex-col items-end px-3 pt-4 pb-6 absolute w-[350px] h-fit rounded bg-white z-[999999] right-5 top-10  ${className}`}
      >
        <div className="w-full flex justify-start items-center space-x-1 py-4 px-2 border-b-1/2 border-grey-border">
          <span className="text-blue medium-font text-xs">Notifications</span>

          <span className="text-grey medium-font text-xs">
            ({notificationItems?.length || 0})
          </span>
        </div>

        <div className="w-full flex flex-col justify-start items-start max-h-[420px] overflow-y-scroll">
          {notificationItems
            ?.slice()
            ?.sort(
              (a, b) =>
                new Date(b?.created_at || b?.lastMessageAt?.toDate()) -
                new Date(a?.created_at || a?.lastMessageAt?.toDate())
            )

            .map(
              ({
                id,
                link,
                notification_type,
                user,
                paid,
                first_name,
                last_name,
                shortlet,
                created_at,
                lastMessageAt,
                userName,
                unreadUserChats,
              }) => {
                const title =
                  notification_type === "message"
                    ? unreadUserChats === 1
                      ? unreadUserChats + " New message!"
                      : unreadUserChats + " New messages!"
                    : notification_type === "agent"
                    ? "New agent!"
                    : notification_type === "booking"
                    ? user?.first_name + " " + user?.last_name
                    : "";

                const body =
                  notification_type === "message" ? (
                    <p>
                      From <span className="text-blue-alt">{userName} </span>
                    </p>
                  ) : notification_type === "agent" ? (
                    first_name + " " + last_name
                  ) : notification_type === "booking" && paid ? (
                    <p>
                      <span className="text-green">Paid </span> booking for{" "}
                      <span className="text-blue-alt">{shortlet?.name} </span>{" "}
                    </p>
                  ) : notification_type === "booking" && !paid ? (
                    <p>
                      <span className="text-red-alt">Unpaid </span> booking for{" "}
                      <span className="text-blue-alt">{shortlet?.name} </span>{" "}
                    </p>
                  ) : (
                    ""
                  );

                const dateCreated =
                  created_at || new Date(lastMessageAt?.toDate());
                return (
                  <Link
                    key={id}
                    className="w-full flex justify-between items-center border-b-1/2 border-[#E0E0E0] py-2 space-x-2 z-[999999] cursor-pointer hover:bg-grey-light duration-300 ease-in-out px-3"
                    href={link}
                    onClick={onClose}
                  >
                    {notification_type === "message" ? (
                      <NotificationMessage />
                    ) : (
                      <NotificationBooking />
                    )}
                    <div className="w-full flex flex-col justify-between items-start space-y-1">
                      <span className="text-sm text-black regular-font">
                        {title}
                      </span>

                      <div className="text-grey-placeholder text-xs">
                        {body}
                      </div>
                    </div>

                    <div className="w-fit flex flex-col justify-between items-end space-y-1">
                      <div className="text-grey-placeholder text-[9px] whitespace-nowrap">
                        {moment(dateCreated).fromNow()}
                      </div>
                      <span className="text-xs text-blue-alt">view</span>
                    </div>
                  </Link>
                );
              }
            )}
        </div>
        {notificationItems?.length > 0 && (
          <div className="w-fit mt-6">
            <ClearAllButton
              text="Clear all"
              onClick={() => {
                handleSetNotificationItems([], true);
                onClose();
              }}
            />
          </div>
        )}
      </div>

      <div
        className={`h-screen w-full fixed py-8 !m-0 flex top-0 left-0
  pointer-events-auto
`}
        onClick={onClose}
      />
    </div>
  );
};
NotificationPane.propTypes = {
  className: PropTypes.any,
  onClose: PropTypes.func,
};

export default observer(NotificationPane);
