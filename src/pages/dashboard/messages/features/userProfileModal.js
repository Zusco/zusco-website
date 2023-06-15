import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Image from "next/image";
import { observer } from "mobx-react-lite";

import CommonStore from "store/common";
import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";
import DeleteModal from "components/general/modal/deleteModal";

const UserProfileModal = ({ data, handleOk }) => {
  console.log("data: ", data);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reason, setReason] = useState("");
  const { reportAgent, reportingAgent } = CommonStore;
  const reportHostPayload = {
    agent_id: data?.id,
    report_type: "inapproprite",
    description: reason,
  };
  return (
    <>
      <Modal
        size="sm"
        active
        noPadding
        bodyClass=""
        backdropClassName="!z-[99999] !top-[70px]"
      >
        <ModalBody>
          <div className="w-full text-center relative">
            <div className="w-full min-h-[300px]  max-h-[300px] mt-10">
              <Image
                className="w-full z-99 min-h-[300px]  max-h-[300px] object-cover object-top"
                src={data?.image}
                fill
                style={{ objectFit: "contain" }}
                alt="avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start w-full border-t p-[18px] bg-white">
              <div className="flex flex-col justify-center items-start space-y-2 mb-2">
                <span className="text-base text-black regular-font">
                  {" "}
                  {data?.name || "N/A"}{" "}
                </span>

                <span className="text-base text-black regular-font">
                  {" "}
                  {data?.phone_number || "N/A"}{" "}
                </span>

                <span className="text-[13px] text-grey-text">
                  Member since {moment(data?.created_at).format("MMM Do, YYYY")}
                </span>
              </div>

              <div className="flex justify-between items-center w-full border-t pt-3">
                <div>
                  <Button
                    redBg
                    text="Report"
                    onClick={() => setShowReportModal(true)}
                  />
                </div>
                <div>
                  <Button text="Ok" onClick={handleOk} />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <DeleteModal
        backdropClassName="!z-[9999999] !top-[70px]"
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

UserProfileModal.propTypes = {
  handleOk: PropTypes.func,
  data: PropTypes.object,
};

export default observer(UserProfileModal);
