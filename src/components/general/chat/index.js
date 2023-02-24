import React, { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

import { DEFAULT_AVATAR } from "utils/constants";
import ImageModal from "../modal/imageModal/ImageModal";


const Chat = ({
  image,
  title,
  messages,
  date,
  isUser,
  avatar,
  previousChatisSender,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className={`bg-white flex items-start w-full h-fit ${
        isUser ? "flex-row-reverse justify-end" : "space-x-6 justify-start"
      }   ${previousChatisSender ? "pb-2" : "pb-6"}  `}
    >
      <div className="w-[40px] h-[40px]">
        {!previousChatisSender && (
          <div
            className={`w-[40px] h-[40px] rounded-full ${isUser ? "ml-6" : ""}`}
            style={{
              backgroundImage: `url(${avatar || DEFAULT_AVATAR})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
            }}
          />
        )}
      </div>

      <div
        className={`flex flex-col justify-center ${
          previousChatisSender ? "space-y-2" : "space-y-3"
        } w-full ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`flex justify-start items-start
                        ${isUser ? "flex-row-reverse" : "space-x-2"}`}
        >
          <p className="text-sm text-blue-sky regular-font">{title}</p>
          <span
            className={`text-[11px] text-grey-text light-font  ${
              isUser ? "mr-2" : ""
            }`}
          >
            {date}
          </span>
        </div>

        {messages?.map((msg, i) => (
          <div
            className={`flex flex-col justify-start items-end ${
              image ? "" : "space-y-2"
            }

         `}
            key={i}
          >
            {image && (
              <Image
                className={`flex w-[250px] h-[200px] rounded cursor-pointer object-cover object-top ${
                  isUser ? "" : ""
                }`}
                src={image}
                onClick={() => setShowModal(true)}
                alt="avatar"
                fill
              />
            )}
            {msg && (
              <span
                className={` p-4 
              rounded-tl-[14px]  
              ${image ? " rounded-tr-0" : "rounded-tr-[14px]"}
          ${
            i === messages.length - 1
              ? "rounded-br-[14px] rounded-bl-0"
              : "rounded-b-[14px]"
          } 
          ${isUser ? "text-white bg-blue-sky" : "bg-grey-alt text-black"}
          `}
              >
                {msg}
              </span>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <ImageModal
          active={showModal}
          toggler={() => setShowModal(false)}
          photos={[{ url: image, name: "Image attachment" }]}
          className="mt-8"
          togglerClass="top-10"
        />
      )}
    </div>
  );
};
Chat.propTypes = {
  image: PropTypes.string,
  avatar: PropTypes.string,
  title: PropTypes.string,
  isUser: PropTypes.bool,
  date: PropTypes.string,
  messages: PropTypes.array,
  previousChatisSender: PropTypes.bool,
};
export default Chat;
