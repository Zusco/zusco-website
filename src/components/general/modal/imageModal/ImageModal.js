import React from "react";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import Image from "next/image";

import Modal from "../modal/modal";
import ModalBody from "../modalBody/modalBody";


const ImageModal = ({ active, toggler, photos }) => {
  return (
    <Modal size="md" active={active} toggler={toggler} noPadding bodyClass="">
      <ModalBody>
        <div className="w-full h-full">
          <Slide cssClass="w-full h-full">
            {photos?.map((slideImage, index) => (
              <div className="each-slide w-full h-full" key={index}>
                {/* <div className='w-full h-full' style={{'backgroundImage': `url(${slideImage.url})`}}>
                
                <span>{slideImage.name}</span>
              </div> */}
                {/* <div
                className="w-full h-full"
                  style={{
                    backgroundImage: `url(${slideImage.url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top",
                    zIndex: 9999,
                  }}
                /> */}
                <span className="text-white medium-font">
                  {slideImage.name}
                </span>
                <Image
                  className="w-full h-full z-99"
                  src={slideImage.url}
                  alt={slideImage.name}
                  fill
                />
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
