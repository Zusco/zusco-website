import React from "react";
import PropTypes from "prop-types";
import { AiOutlineRight } from "react-icons/ai";

import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";
import WhatsappIcon from "assets/icons/dashboard/whatsapp-icon.svg";
import Facebook from "assets/icons/landing/fbIcon.svg";
import Twitter from "assets/icons/landing/twIcon.svg";
const ShareListingModal = ({ data, handleOk, active }) => {
  const shareLink = "https://www.zusco.ng/listing/" + data?.id;
  const shareMessage = `${
    "Check this listing out on zusco.ng: " +
    ` \n ` +
    data?.name +
    " - " +
    data?.address +
    ` \n ` +
    shareLink
  }`;
  return (
    <Modal
      size="sm"
      active={active}
      noPadding
      bodyClass=""
      toggler={handleOk}
      backdropClassName="!z-[9999999]"
    >
      {active && (
        <ModalBody>
          <div className="w-full text-center relative">
            <div className="flex flex-col justify-start items-start w-full border-t p-[18px] bg-white">
              <div className="flex flex-col justify-center items-start space-y-2 mb-2 w-full">
                <span className="text-base text-black regular-font">
                  {" "}
                  Share shortlet ({data?.name || "N/A"}){" "}
                </span>

                <div className="flex flex-col gap-3 w-full text-black pb-4">
                  <a
                    href={`https://wa.me/?text=${shareMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between p-3 cursor-pointer bg-white border-[0.5px] border-[#E7EAEE] items-center hover:bg-grey-light transition-colors ease-in-out duration-300"
                  >
                    <div className="text-sm flex items-center gap-x-2">
                      <WhatsappIcon />
                      Share on whatsapp
                    </div>
                    <span>
                      <AiOutlineRight size={12} />
                    </span>
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer.php?u=${shareLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between p-3 cursor-pointer bg-white border-[0.5px] border-[#E7EAEE] items-center hover:bg-grey-light transition-colors ease-in-out duration-300"
                  >
                    <div className="text-sm flex items-center gap-x-2">
                      <Facebook />
                      Share on facebook
                    </div>
                    <span>
                      <AiOutlineRight size={12} />
                    </span>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between p-3 cursor-pointer bg-white border-[0.5px] border-[#E7EAEE] items-center hover:bg-grey-light transition-colors ease-in-out duration-300"
                  >
                    <div className="text-sm flex items-center gap-x-2">
                      <Twitter />
                      Share on twitter
                    </div>
                    <span>
                      <AiOutlineRight size={12} />
                    </span>
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div>
                  <Button text="Done" onClick={handleOk} />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      )}
    </Modal>
  );
};

ShareListingModal.propTypes = {
  handleOk: PropTypes.func,
  data: PropTypes.object,
  active: PropTypes.object,
};

export default ShareListingModal;
