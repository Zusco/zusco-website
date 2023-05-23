import React from "react";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import Image from "next/image";

import Modal from "../modal/modal";
import ModalBody from "../modalBody/modalBody";

const ImageModal = ({ active, toggler, photos }) => {
  return (
    <Modal
      backdropClassName="!z-[99999999]"
      size="md"
      active={active}
      toggler={toggler}
      noPadding
      bodyClass=""
    >
      <ModalBody>
        <div className="w-full h-full">
          <Slide cssClass="h-full" arrows={photos?.length > 1}>
            {photos?.map((slideImage, index) => (
              <div
                className="each-slide w-full h-full flex flex-col"
                key={index}
              >
                <span className="text-white medium-font">
                  {slideImage.name}
                </span>
                <div className="w-full h-full min-h-[400px]  max-h-[400px] ">
                  <Image
                    className="w-full h-full z-99 min-h-[350px]  max-h-[350px] object-cover object-top"
                    src={slideImage.url}
                    alt={slideImage.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </Slide>
        </div>
      </ModalBody>
    </Modal>
  );
};
ImageModal.propTypes = {
  active: PropTypes.bool,
  toggler: PropTypes.func,
  photos: PropTypes.array,
};
export default ImageModal;
