import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import { handleFileType } from "utils/functions";
import { uploadImageToCloud } from "utils/uploadImagesToCloud";
import { Button } from "components/general/button";
import Input from "components/general/input/input";
import CommonStore from "store/common";
import AvatarPhoto from "components/general/input/avatarPhoto";
import PhoneNumber from "components/general/phoneNumber/phoneNumber";
import FileInput from "components/general/input/fileInput";
import ImageModal from "components/general/modal/imageModal/ImageModal";
import CircleLoader from "components/general/circleLoader/circleLoader";
import cleanPayload from "utils/cleanPayload";
import { isEmail } from "utils/validations";
import { isValidPhoneNumber } from "react-phone-number-input";

const Form = () => {
  const router = useRouter();

  const { loading, loadingFetchMe, getMe, updateMe } = CommonStore;
  const emptyFiles = {
    agent_identification_document_url: { type: "", url: "" },
  };
  const emptyImageModal = {
    show: false,
    type: "",
  };
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_image_url: "",
    email: "",
    agent_identification_document_url: "",
  });

  const [files, setFiles] = useState({ ...emptyFiles });
  const [uploading, setUploading] = useState(false);
  const [imageModal, setImageModal] = useState({ ...emptyImageModal });

  useEffect(() => {
    handleSetForm();
  }, []);

  useEffect(() => {
    handleFiles();
  }, [form.agent_identification_document_url]);

  const handleSetForm = async () => {
    const data = await getMe();
    const {
      first_name,
      last_name,
      phone_number,
      profile_image_url,
      email,
      agent_identification_document_url,
    } = data;

    const me = {
      first_name,
      last_name,
      phone_number: "+234" + phone_number?.replace("+2340", ""),
      profile_image_url,
      email,
      agent_identification_document_url,
    };

    setForm({ ...me });
  };
  const handleFiles = () => {
    const agent_identification_document_url = handleFileType(
      form?.agent_identification_document_url,
      "agent_identification_document_url"
    );

    setFiles({ ...agent_identification_document_url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const phone_number = "";
    const profile_image_url = await uploadImageToCloud(form.profile_image_url);
    setUploading(false);
    let payload = { ...form, phone_number, profile_image_url };
    payload = cleanPayload(payload);
    updateMe({ data: payload, navigate, route: "/dashboard/explore" });
  };
  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };
  const formDisabled = () => {
    return (
      !form?.first_name ||
      !form?.last_name ||
      !isEmail(form?.email) ||
      !form?.phone_number ||
      (form?.phone_number && !isValidPhoneNumber(form?.phone_number)) ||
      !form?.profile_image_url
    );
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-start w-full max-w-[650px] h-full relative px-5 space-y-8 mb-24 "
    >
      <div className="pt-8">
        <AvatarPhoto
          file={form.profile_image_url}
          onChangeFunc={(val) => handleChange("profile_image_url", val)}
          isDisabled={loading}
          isEdit
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between items-start w-full">
        <Input
          label="First Name"
          value={form?.first_name}
          onChangeFunc={(val) => handleChange("first_name", val)}
          placeholder="Enter first Name"
          required
        />

        <Input
          label="Last Name"
          value={form?.last_name}
          onChangeFunc={(val) => handleChange("last_name", val)}
          placeholder="Enter last Name"
          required
        />
      </div>

      <Input
        label="Email Address"
        value={form?.email}
        onChangeFunc={(val) => handleChange("email", val)}
        placeholder="taiwoharry@gmail.com"
        type="email"
        required
      />

      <PhoneNumber
        label="Contact Number"
        value={form.phone_number}
        onPhoneChange={(val) => handleChange("phone_number", val)}
        placeholder="Enter contact number"
        // labelClass="!text-black regular-font"
        required
      />

      <div className="flex justify-between items-end w-full">
        <FileInput
          placeholder="Upload a valid government issued ID"
          title="Upload a valid government issued ID"
          file={form.agent_identification_document_url}
          onChangeFunc={(val) =>
            handleChange("agent_identification_document_url", val)
          }
          isDisabled={loading}
          type="pdf_image"
          className={
            files?.agent_identification_document_url?.url
              ? "w-[calc(100%-100px)]"
              : "w-full"
          }
        />

        {files?.agent_identification_document_url?.url &&
          (files?.agent_identification_document_url?.type === "pdf" ? (
            <a
              href={files?.agent_identification_document_url?.url}
              target="_blank"
              rel="noreferrer"
            >
              <Button type="button" text="Preview" />
            </a>
          ) : (
            <Button
              type="button"
              text="Preview"
              small
              onClick={() =>
                setImageModal({
                  show: true,
                  type: files?.agent_identification_document_url?.url,
                })
              }
            />
          ))}
      </div>
      <Button
        text="Save & Continue"
        type="submit"
        isDisabled={formDisabled() || loading || uploading}
        isLoading={loading || uploading}
        onClick={handleSubmit}
      />
      {loadingFetchMe && (
        <div className="absolute w-full flex justify-center items-center h-full z-[99]">
          <CircleLoader blue />
        </div>
      )}
      <div className="w-full min-h-[100px]" />
      {imageModal.show && (
        <ImageModal
          active={imageModal.show}
          toggler={() => setImageModal({ ...emptyImageModal })}
          photos={[{ url: imageModal.type, name: "hh" }]}
        />
      )}
    </form>
  );
};

export default observer(Form);
