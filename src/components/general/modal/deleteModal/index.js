import React from "react";
import PropTypes from "prop-types";
import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";
import Textarea from "components/general/input/textarea";
import ModalHeader from "../modalHeader/modalHeader";

const DeleteModal = ({
  handleDelete,
  isDeleting,
  onClose,
  title,
  text,
  onChangeFunc,
  value,
  actionText = "Delete",
  placeholder,
  titleAlt,
  isDisabled,
  noToggle,
  active,
}) => {
  return (
    <Modal
      size="sm"
      active={active}
      toggler={!noToggle && onClose}
      noPadding
      bodyClass="bg-white"
    >
      {titleAlt && (
        <ModalHeader>
          <div className="text-black pt-3 pb-1 px-4"> {titleAlt}</div>
        </ModalHeader>
      )}
      <ModalBody>
        <div className="w-full text-center ">
          <div className="p-[24px]">
            {title && (
              <p className="text-black mb-[16px] regular-font">{title}</p>
            )}
            {text && <p className="text-grey-text text-sm mb-5">{text}</p>}

            {onChangeFunc && (
              <Textarea
                placeholder={placeholder}
                onChangeFunc={onChangeFunc}
                rows="10"
                value={value}
              />
            )}
          </div>
          <div className="flex justify-between items-center w-full border-t p-[24px] ">
            <div>
              <Button whiteBg text="Cancel" onClick={onClose} />
            </div>
            <div>
              <Button
                text={actionText}
                redBg
                isLoading={isDeleting}
                isDisabled={isDeleting || isDisabled}
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
  onChangeFunc: PropTypes.func,
  value: PropTypes.string,
  actionText: PropTypes.string,
  titleAlt: PropTypes.string,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  noToggle: PropTypes.bool,
  active: PropTypes.bool,
};

export default DeleteModal;
