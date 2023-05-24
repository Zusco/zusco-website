import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { AiOutlineRight } from "react-icons/ai";
import Image from "next/image";
import {
  collection,
  onSnapshot,
  query,
  where,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";

import { getUserInfoFromStorage } from "utils/storage";
import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";
import CallIcon from "assets/icons/dashboard/call-icon.svg";
import MessageIcon from "assets/icons/dashboard/message-icon.svg";
import WhatsappIcon from "assets/icons/dashboard/whatsapp-icon.svg";
import Loader from "assets/icons/loader/loader.svg";
import MessagesStore from "pages/dashboard/messages/store";
import CommonStore from "store/common";
import db from "services/firebase.config";
import { observer } from "mobx-react-lite";
import cleanPayload, { checkPayloadEmptyField } from "utils/cleanPayload";
import { useAuth } from "hooks/auth";
import AuthStore from "store/auth";
import { phoneNumberFormatter } from "utils/formatter";
import DeleteModal from "components/general/modal/deleteModal";

const AgentProfileModal = ({ data, handleOk }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    setConversations: setStoreConversations,
    setCurrentChat,
    setCurrentChatRef,
  } = MessagesStore;
  const { reportAgent, reportingAgent } = CommonStore;
  const { setShowAuthModal } = AuthStore;
  const userInfo = getUserInfoFromStorage();
  const [prevConversations, setPrevConversations] = useState(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reason, setReason] = useState("");
  const reportHostPayload = {
    agent_id: data?.id,
    report_type: "inapproprite",
    description: reason,
  };
  useEffect(() => {
    data?.id && getConversations();
  }, [data?.id]);

  const getConversations = async () => {
    setLoading(true);
    try {
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
        handleCheckExistingConvos(convos);
        setStoreConversations(convos);
      });
    } catch (error) {
      console.log("getConversations error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckExistingConvos = (convos) => {
    const prevConvo = convos?.find((item) => item?.userId === userInfo.id);
    setPrevConversations(prevConvo);
    setCurrentChat(prevConvo);
  };

  const startConversation = async () => {
    setSending(true);

    try {
      const chatsRef = collection(db, "conversations");
      let payload = {
        agentId: data?.id,
        agentName: data?.name,
        agentPhoneNumber: data?.phone_number,
        agentImage: data?.image,
        userId: userInfo?.id,
        userName: userInfo?.first_name + " " + userInfo?.last_name,
        userPhoneNumber: userInfo?.phone_number,
        userImage: userInfo?.profile_image_url,
        lastMessageAt: Timestamp.now(),
        unreadUserChats: 0,
        unreadAgentChats: 0,
      };
      const emptyFieldFound = checkPayloadEmptyField(payload);
      if (!emptyFieldFound) {
        payload = cleanPayload(payload);
        const docRef = await addDoc(chatsRef, payload);
        setCurrentChatRef(docRef.path);
        setCurrentChat(payload);
        router.push("/dashboard/messages");
      } else {
        console.log("startConversation error: ");
      }
    } catch (error) {
      console.log("SENDING ERROR", error);
    } finally {
      setSending(false);
    }
  };

  const goToConversations = () => {
    router.push("/dashboard/messages");
  };

  const handleConversations = () => {
    if (isAuthenticated) {
      prevConversations ? goToConversations() : startConversation();
    } else {
      setShowAuthModal(true);
    }
  };
  const handleReportHost = () => {
    if (isAuthenticated) {
      setShowReportModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <Modal
        size="sm"
        active
        noPadding
        bodyClass=""
        toggler={handleOk}
        backdropClassName="!z-[99999]"
      >
        <ModalBody>
          <div className="w-full text-center relative">
            {data?.image && (
              <div className="w-full min-h-[300px]  max-h-[300px] mt-10">
                <Image
                  className="w-full z-99 min-h-[300px]  max-h-[300px] object-cover object-top"
                  src={data?.image}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="avatar"
                />
              </div>
            )}

            <div className="flex flex-col justify-start items-start w-full border-t p-[18px] bg-white">
              <div className="flex flex-col justify-center items-start space-y-2 mb-2 w-full">
                <span className="text-base text-black regular-font">
                  {" "}
                  {data?.name || "N/A"}{" "}
                </span>

                <span className="text-base text-black regular-font">
                  {" "}
                  {data?.phone_number || "N/A"}{" "}
                </span>

                <span className="text-[13px] text-grey-text">
                  Host since {moment(data?.created_at).format("MMM Do, YYYY")}
                </span>

                <div className="flex flex-col gap-3 w-full text-black pb-4">
                  {data?.phone_number && (
                    <a
                      href={`tel:${phoneNumberFormatter(data?.phone_number)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-between p-3 cursor-pointer bg-white border-[0.5px] border-[#E7EAEE] items-center hover:bg-grey-light transition-colors ease-in-out duration-300"
                    >
                      <div className="text-sm flex items-center gap-x-2">
                        <CallIcon /> Call agent
                      </div>
                      <span>
                        <AiOutlineRight size={12} />
                      </span>
                    </a>
                  )}

                  <button
                    className="flex justify-between p-3 cursor-pointer bg-white border-[0.5px] border-[#E7EAEE] items-center hover:bg-grey-light transition-colors ease-in-out duration-300"
                    onClick={() => {
                      handleConversations();
                    }}
                    disabled={sending || loading}
                  >
                    <div className="text-sm flex items-center gap-x-2">
                      <MessageIcon /> Send a quick message
                    </div>
                    <span>
                      {sending || loading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <AiOutlineRight size={12} />
                      )}
                    </span>
                  </button>

                  {data?.phone_number && (
                    <a
                      href={`https://wa.me/${phoneNumberFormatter(
                        data?.phone_number
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-between p-3 cursor-pointer bg-white border-[0.5px] border-[#E7EAEE] items-center hover:bg-grey-light transition-colors ease-in-out duration-300"
                    >
                      <div className="text-sm flex items-center gap-x-2">
                        <WhatsappIcon />
                        Reach out on Whatsapp
                      </div>
                      <span>
                        <AiOutlineRight size={12} />
                      </span>
                    </a>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div>
                  <Button redBg text="Report Host" onClick={handleReportHost} />
                </div>
                <div>
                  <Button text="Close" onClick={handleOk} />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <DeleteModal
        backdropClassName="!z-[9999999]"
        active={showReportModal}
        handleDelete={() => {
          reportAgent({
            agent_id: data?.id,
            data: reportHostPayload,
            callbackFunc: () => {
              setShowReportModal(false);
              setReason("");
            },
          });
        }}
        isDeleting={reportingAgent}
        onClose={() => setShowReportModal(false)}
        titleAlt={`Report ${data?.name}`}
        onChangeFunc={(val) => setReason(val)}
        value={reason}
        actionText="Report"
        isDisabled={!reason}
        placeholder="Enter a reason for reporting this agent"
      />
    </>
  );
};

AgentProfileModal.propTypes = {
  handleOk: PropTypes.func,
  data: PropTypes.object,
};

export default observer(AgentProfileModal);
