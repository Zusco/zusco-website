import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FileUploader } from "react-drag-drop-files";
import { DEFAULT_AVATAR } from "utils/constants";
import  EditSpan from "assets/icons/edit-span.svg";
import ImageModal from "../modal/imageModal/ImageModal";

const AvatarPhoto = ({
  file,
  onChangeFunc,
  isDisabled,
  isError,
  multiple,
  isEdit,
  ...rest
}) => {
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileTypes = ["JPG", "PNG", "JPEG"];
  useEffect(() => {
    if (!isError) return setError(false);
    setError(true);
  }, [isError]);

  useEffect(() => {
    const fileSize = (file?.size || 0) / 1024 ** 2;
    if (fileSize > 50) return setError(true);
    setError(false);
  }, [file]);

  const extractFileNameFromUrl = (image) => {
    let filename = "";
    if (image?.name) {
      filename = image?.name;
    } else if (typeof image === "string") {
      const startIndex = image?.lastIndexOf("/") + 1;
      const endIndex = image?.length;
      filename = image?.slice(startIndex, endIndex);
    } else {
      filename = "Image";
    }
    return filename;
  };
  const handleImageUrl = () => {
    let url = DEFAULT_AVATAR;
    if (file) {
      url = typeof file === "string" ? file : URL.createObjectURL(file);
    }
    return url;
  };
  return (
    <div className="flex flex-col justify-start items-start space-y-2 w-fit relative file-box">
      {isEdit && (
        <button
          type="button"
          className={`w-[35px] h-[35px] flex justify-center items-center z-[10] absolute
         bottom-[20px] right-[0px] cursor-pointer
         `}
        >
          <FileUploader
            handleChange={(e) => {
              if (multiple) {
                onChangeFunc(Object.values(e));
              } else {
                onChangeFunc(e);
              }
            }}
            name="file"
            types={fileTypes}
            multiple={multiple}
            className="w-fit"
            {...rest}
          >
            <EditSpan />
          </FileUploader>
        </button>
      )}

      <button
        className={`flex flex-col justify-center items-center rounded-full
                
                  ${"h-[150px] w-[150px]"}
                border border-dashed space-y-3 relative 
                bg-no-repeat bg-center bg-cover 
                ${error || isError ? "!border-red" : "border-grey"} 
                `}
        type="button"
        onClick={() => {
          if (file) {
            setShowModal(true);
          }
        }}
        disabled={isDisabled}
      >
        <div
          className={`
            absolute top-0 right-0 left-0 bottom-0 z-[9] 
            bg-blue-backdrop fade-in rounded-full
            bg-no-repeat bg-top bg-cover`}
          style={{
            backgroundImage: `url(${handleImageUrl()})`,
          }}
        />

        {file && (
          <p className={`w-full z-[99] text-sm medium-font text-white`}>
            Preview
          </p>
        )}
      </button>

      {showModal && (
        <ImageModal
          active={showModal}
          toggler={() => setShowModal(false)}
          photos={[
            { url: handleImageUrl(), name: extractFileNameFromUrl(file) },
          ]}
        />
      )}
    </div>
  );
};

AvatarPhoto.propTypes = {
  file: PropTypes.any,
  onChangeFunc: PropTypes.func,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  rest: PropTypes.object,
  multiple: PropTypes.bool,
  isEdit: PropTypes.bool,
};

export default AvatarPhoto;
