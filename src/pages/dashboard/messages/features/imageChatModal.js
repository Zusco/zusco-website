import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";


const ImageChatModal = ({
  image,
  isDeleting,
  onRemove,
  handleContinue,
  handleChange,
}) => {
  return (
    <Modal size="sm" active noPadding bodyClass="">
      <ModalBody>
        <div className="w-full text-center relative">
          <button
            type="button"
            onClick={onRemove}
            className="flex justify-center items-center w-fit h-fit py-1 px-2 rounded-full bg-red text-white text-xs absolute right-2 top-12 shadow-sm"
          >
            remove
          </button>
          <div className="w-full h-full">
            <Image
              className="w-full h-full z-99  max-h-[65vh] object-cover object-top mt-10"
              src={image}
              fill
              style={{ objectFit: "contain" }}
              alt="chat image"
            />
          </div>

          <div className="flex justify-between items-center w-full border-t p-[24px] bg-white">
            <div>
              <Button whiteBg text="Change image" onClick={handleChange} />
            </div>
            <div>
              <Button
                text="Continue"
                isLoading={isDeleting}
                isDisabled={isDeleting}
                onClick={handleContinue}
              />
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

ImageChatModal.propTypes = {
  handleContinue: PropTypes.func,
  handleChange: PropTypes.func,
  isDeleting: PropTypes.bool,
  onRemove: PropTypes.func,
  image: PropTypes.string,
};

export default ImageChatModal;
