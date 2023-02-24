import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { getUserInfoFromStorage } from "utils/storage";
import db from "services/firebase.config";
import MessagesStore from "../../store";
import ChatList from "./chatList";
const Overview = () => {
  const { setConversations: setStoreConversations, chats } = MessagesStore;
  const userInfo = getUserInfoFromStorage();
  const containerRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations();
  }, [chats]);

  const tabs = [
    {
      title: `Chats`,
      content: <ChatList data={conversations} />,
    },
  ];
  const [activeTab, setActiveTab] = useState({
    title: tabs[0].title,
    index: 0,
  });

  const getConversations = async () => {
    setLoading(true);
    let convos = [];
    const convoRef = collection(db, "conversations");

    const q = query(convoRef, where("userId", "==", userInfo?.id));

    onSnapshot(q, (querySnapshot) => {
      convos = [];
      querySnapshot.forEach((item) => {
        convos.push(item.data());
      });
      convos = convos.sort(
        (a, b) =>
          new Date(b?.lastMessageAt?.toDate()) -
          new Date(a?.lastMessageAt?.toDate())
      );

      setConversations(convos);
      setStoreConversations(convos);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleSlide();
  }, []);

  useEffect(() => {
    handleSlide();
  }, [activeTab]);

  const handleSlide = () => {
    const width = containerRef?.current?.getBoundingClientRect()?.width;
    const slideContainerWidth = width / tabs.length;
    const slideWidth = slideContainerWidth;
    const slidePosition = slideContainerWidth * activeTab.index;
    setSliderWidth(slideWidth);
    setSliderPosition(slidePosition);
  };
  return (
    <div className="flex flex-col justify-start items-start w-full h-fit rounded-lg">
      <div className="flex justify-between items-center w-full border-b-1/2 border-grey-border">
        <div className="flex justify-between items-center" ref={containerRef}>
          {tabs.map(({ title }, index) => (
            <button
              key={title + index}
              className={`w-[100px] h-fit p-3 text-center whitespace-nowrap text-base hover:bg-grey-lighter transition-all duration-300 ease-in-out rounded-t-lg ${
                activeTab?.title === title
                  ? "text-blue medium-font"
                  : "text-grey-text"
              }`}
              onClick={() => setActiveTab({ title, index })}
            >
              <span className="">
                {`${title} ${
                  title === "Chats" ? "(" + conversations?.length + ")" : ""
                }`}{" "}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-fit">
        <div
          className="h-[1.5px] bg-blue rounded-lg transition-all duration-300 ease-in-out"
          style={{
            width: `${sliderWidth}px`,
            transform: `translateX(${sliderPosition}px)`,
          }}
        />
      </div>

      <div className="flex flex-col justify-start items-start h-full w-full max-h-[700px] rounded-lg overflow-y-scroll">
        {tabs
          .filter(({ title }) => title === activeTab?.title)
          .map(({ content }, index) => (
            <div key={index} className="w-full h-full rounded-lg">
              {content}
            </div>
          ))}
      </div>
    </div>
  );
};

export default observer(Overview);
