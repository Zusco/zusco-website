import React from "react";
import PropTypes from "prop-types";
import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";

const DeleteModal = ({ handleDelete, isDeleting, onClose, title, text }) => {
  return (
    <Modal size="sm" active toggler={onClose} noPadding bodyClass="bg-white">
      <ModalBody>
        <div className="w-full text-center ">
          <div className="pt-[42px] px-[24px] pb-[24px]">
            <p className="text-black mb-[16px]">{title}</p>
            <p className="text-grey-text text-sm">{text}</p>
          </div>

          <div className="flex justify-between items-center w-full border-t p-[24px] ">
            <div>
              <Button whiteBg text="Cancel" onClick={onClose} />
            </div>
            <div>
              <Button
                text="Delete"
                redBg
                isLoading={isDeleting}
                isDisabled={isDeleting}
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteModal.propTypes = {
  handleDelete: PropTypes.func,
  isDeleting: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default DeleteModal;
