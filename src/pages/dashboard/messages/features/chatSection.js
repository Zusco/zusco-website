import React, { useState, useRef, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { observer } from "mobx-react-lite";

import Hairpin from "assets/icons/hairpin.svg";
import {
  collection,
  where,
  addDoc,
  Timestamp,
  query,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

import { ArrowButton } from "components/general/button";
import ArrowBack from "assets/icons/arrow-back.svg";
import Chat from "components/general/chat";
import { getUserInfoFromStorage } from "utils/storage";
import MessagesStore from "../store";
import moment from "moment";
import { DEFAULT_AVATAR } from "utils/constants";
import Loader from "components/general/loader";
import db from "services/firebase.config";
import cleanPayload, { checkPayloadEmptyField } from "utils/cleanPayload";
import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import Input from "components/general/input/input";
import ImageChatModal from "./imageChatModal";
import UserProfileModal from "./userProfileModal";

const emptyForm = { message: "", image: null };
const ChatSection = () => {
  const chatBaseRef = useRef(null);
  const fileRef = useRef();
  const {
    currentChat,
    chats,
    setChats,
    currentChatRef,
    setCurrentChatRef,
    setCurrentChat,
  } = MessagesStore;
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loading, setLoading] = useState("");

  const userInfo = getUserInfoFromStorage();

  useEffect(() => {
    scrollToChatBase();
  }, [chats, loading]);

  useEffect(() => {
    chats && updateAgentReadStatus();
  }, [chats]);

  useEffect(() => {
    form.image && setShowModal(true);
  }, [form.image]);

  useEffect(() => {
    currentChat?.agentId && getConversations(currentChat?.agentId);
  }, [currentChat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      let chatsPath = currentChatRef;
      let profile_image_url;
      if (form?.image) {
        profile_image_url = await uploadImageToCloud(form?.image);
      }

      const chatsRef = collection(db, chatsPath, "messages");
      let payload = {
        dateTime: Timestamp.now(),
        isRead: false,
        message: form.message,
        senderId: userInfo?.id,
        type: profile_image_url ? "IMAGE" : "TEXT",
        url: profile_image_url,
      };

      payload = cleanPayload(payload);
      await addDoc(chatsRef, payload);

      setForm(emptyForm);
      await updateConversation(payload?.message, 1);
    } catch (error) {
      console.log("SENDING ERROR", error);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };

  const getConversations = async (agentId) => {
    setLoading(true);
    try {
      let convos = [];
      let chatsPath = "";
      const convoRef = collection(db, "conversations");

      const q = query(
        convoRef,
        where("userId", "==", userInfo?.id),
        where("agentId", "==", agentId)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        chatsPath = doc.ref.path;
      });
      setCurrentChatRef(chatsPath);
      const chatsRef = collection(db, chatsPath, "messages");

      const qChats = query(chatsRef);
      onSnapshot(qChats, (querySnapshot) => {
        convos = [];
        querySnapshot.forEach((item) => {
          convos.push({ ...item.data(), path: item.ref.path });
        });
        convos = convos.sort(
          (a, b) =>
            new Date(a?.dateTime?.toDate()) - new Date(b?.dateTime?.toDate())
        );
        setChats(convos);
      });
    } catch (error) {
      console.log("ERRRRRRR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateConversation = async (message, count) => {
    try {
      const userChats = chats?.filter(
        (chat) => chat?.senderId === userInfo?.id
      );
      const unreadUserChats = userChats?.filter((chat) => !chat?.isRead);
      const chatsRef = doc(db, currentChatRef);
      let payload = {
        ...currentChat,
        userId: userInfo?.id,
        userName: userInfo?.first_name + " " + userInfo?.last_name,
        userPhoneNumber: userInfo?.phone_number,
        userImage: userInfo?.profile_image_url,
        lastMessage: message || currentChat?.lastMessage,
        lastMessageAt: message ? Timestamp.now() : currentChat?.lastMessageAt,
        unreadUserChats: unreadUserChats?.length + count,
        unreadAgentChats: 0,
      };
      const payloadAlt = {
        unreadAgentChats: 0,
      };
      payload = cleanPayload(payload);
      const data = count ? payload : payloadAlt;

      const emptyFieldFound = checkPayloadEmptyField(payload);
      if (!emptyFieldFound && count) {
        await setDoc(chatsRef, data, { merge: true });
      } else if (!count) {
        await setDoc(chatsRef, data, { merge: true });
      }
    } catch (error) {
      console.log("UPDATE ERROR", error);
    }
  };

  const updateAgentReadStatus = async () => {
    const agentChats = chats?.filter(
      (chat) => chat?.senderId === currentChat?.agentId
    );
    const unreadAgentChats = agentChats?.filter((chat) => !chat?.isRead);
    try {
      const batch = writeBatch(db);
      for (let index = 0; index < unreadAgentChats?.length; index++) {
        const currChatRef = doc(db, unreadAgentChats[index]?.path);
        batch.update(currChatRef, { isRead: true });
      }

      await batch.commit();
      await updateConversation("", 0);
    } catch (error) {
      console.log("UPDATE READ STATUS ERROR", error);
    }
  };

  const scrollToChatBase = () => chatBaseRef?.current?.scrollIntoView();
  return (
    <div className="bg-white flex flex-col justify-start items-start w-full relative h-full">
      {loading && <Loader absolute />}
      {currentChat?.agentId && (
        <>
          <div className="bg-white flex justify-between items-center w-full space-x-4 py-4 px-6 absolute right-0 top-[0px] z-[99] border-1/2 border-grey-border">
            <button onClick={() => setCurrentChat(null)} className="h-full">
              <ArrowBack />
            </button>
            <div
              className="flex justify-start items-center w-fit space-x-4 cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            >
              <div className="w-fit h-fit">
                <div
                  className="w-[42px] h-[42px] rounded-full"
                  style={{
                    backgroundImage: `url(${
                      currentChat?.agentImage || DEFAULT_AVATAR
                    })`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top",
                  }}
                />
              </div>
              <span className="text-lg text-black medium-font whitespace-nowrap">
                {currentChat?.agentName}{" "}
              </span>
              <p className="text-base text-grey-text text-left w-full whitespace-nowrap">
                {currentChat?.agentPhoneNumber}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full h-full bg-white py-8 px-7 my-[80px] border-b-1/2 border-grey-border relative overflow-y-scroll">
            {chats?.map(({ message, dateTime, senderId, url, type }, i) => {
              const isUser = senderId === userInfo?.id;
              const previousChatisUser =
                userInfo?.id === chats[i - 1]?.senderId;
              const previousChatisSender = senderId === chats[i - 1]?.senderId;
              return (
                <Chat
                  key={i}
                  avatar={
                    isUser
                      ? userInfo?.profile_image_url
                      : currentChat?.agentImage
                  }
                  title={isUser ? "you" : currentChat?.agentName}
                  messages={[message]}
                  date={moment(new Date(dateTime?.toDate())).fromNow()}
                  isUser={isUser}
                  image={type === "IMAGE" && url}
                  previousChatisUser={previousChatisUser}
                  previousChatisSender={previousChatisSender}
                />
              );
            })}

            <div
              className="flex min-h-3 bg-gray-800 w-full"
              ref={chatBaseRef}
            />
          </div>
          <form
            onSubmit={sendMessage}
            className="flex justify-between items-center w-full mt-auto space-x-4 py-3 pl-14 pr-6 absolute right-0 bottom-[10px]"
          >
            <div className="relative w-[40px] h-full">
              <button
                className="relative"
                type="button"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <Hairpin />
              </button>
              {form?.image && (
                <Tippy content={"1 Image attached"}>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="flex justify-center items-center w-[16px] h-[16px] rounded-full bg-blue text-white text-xs absolute -right-[6px] -top-[6px]"
                  >
                    1
                  </button>
                </Tippy>
              )}
            </div>

            <input
              type="file"
              className="hidden"
              accept=".jpg, .jpeg, .png, .svg"
              onChange={(e) => handleChange("image", e.target.files[0])}
              ref={fileRef}
            />
            <Input
              onChangeFunc={(val) => handleChange("message", val)}
              placeholder="Write Message"
              value={form?.message}
              isLoading={sending}
            />
            <ArrowButton
              type="submit"
              isLoading={sending}
              isDisabled={!form.message && !form.image}
            />
          </form>

          {showModal && (
            <ImageChatModal
              image={form?.image && URL.createObjectURL(form?.image)}
              isDeleting={sending}
              handleContinue={() => {
                setShowModal(false);
              }}
              handleChange={() => {
                fileRef.current.click();
              }}
              onRemove={() => {
                setShowModal(false);
                handleChange("image", null);
              }}
            />
          )}
          {showProfileModal && (
            <UserProfileModal
              data={{
                name: currentChat?.agentName,
                image: currentChat?.agentImage || DEFAULT_AVATAR,
                phone_number: currentChat?.agentPhoneNumber,
                created_at: currentChat?.userCreatedAt,
                id: currentChat.agentId,
              }}
              handleOk={() => setShowProfileModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};
export default observer(ChatSection);
