import React, { useEffect, useState } from "react";
import { PaystackConsumer } from "react-paystack";
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import moment from "moment";

import CommonStore from "store/common";
import GreenStar from "assets/icons/features/greenStar.svg";
import PhoneNumber from "components/general/phoneNumber/phoneNumber";
import Input from "components/general/input/input";
import Modal from "components/general/modal/modal/modal";
import ModalBody from "components/general/modal/modalBody/modalBody";
import { Button } from "components/general/button";
import cleanPayload from "utils/cleanPayload";
import ModalHeader from "components/general/modal/modalHeader/modalHeader";
import { successToast } from "components/general/toast/toast";

const PaymentModal = ({
  toggleModal,
  handleSubmit,
  formData,
  shortletdetails,
  bookingForm,
}) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });

  const { loading, loadingFetchMe, getMe, updateMe, me } = CommonStore;
  const { check_in_date, check_out_date, number_of_guests } = bookingForm;
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    amount: formData?.grandTotal || 0,
  });

  const [uploading, setUploading] = useState(false);

  console.log("me: ", me);
  useEffect(() => {
    !me && getMe();
  }, []);
  useEffect(() => {
    handleSetForm();
  }, [me]);

  const handleSetForm = async () => {
    const data = {
      first_name: me?.first_name,
      last_name: me?.last_name,
      phone_number: "+234" + me?.phone_number?.replace("+2340", ""),
      email: me?.email,
      amount: formData?.grandTotal || 0,
    };

    setForm({ ...data });
  };
  const handleChange = (prop, val) => {
    setForm({ ...form, [prop]: val });
  };
  const updateProfile = async () => {
    setUploading(true);
    const phone_number = "";
    setUploading(false);
    delete form.amount;
    let payload = { ...form, phone_number };
    payload = cleanPayload(payload);
    updateMe({ data: payload });
  };
  const handleBaniPop = () => {
    const payload = {
      amount: formData?.grandTotal,
      phoneNumber: form?.phone_number,
      email: form?.email,
      firstName: form?.first_name,
      lastName: form?.last_name,
      merchantKey: process.env.NEXT_PUBLIC_BANI_MERCHANT_KEY,
      metadata: {
        shortlet_id: shortletdetails.id,
        check_in_date: moment(check_in_date).format("YYYY-MM-DD"),
        check_out_date: moment(check_out_date).format("YYYY-MM-DD"),
        number_of_guests: number_of_guests,
      },
      callback: (response) => handleSuccess(response),
      onClose: (response) => handleClose(response),
    };

    window.BaniPopUp(payload);
  };

  const paystackMetadata = {
    shortlet_id: shortletdetails.id,
    user_id: me?.id,
    check_in_date: moment(check_in_date).format("YYYY-MM-DD"),
    check_out_date: moment(check_out_date).format("YYYY-MM-DD"),
    number_of_guests: number_of_guests,
  };
  console.log("paystackMetadata: ", paystackMetadata);
  const config = {
    email: form.email,
    amount: formData?.grandTotal * 100,

    metadata: { order: JSON.stringify(paystackMetadata) },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };
  const handleSuccess = (reference) => {
    handleSubmit();
    successToast(
      `Booking successful!`,
      "Thank you for doing business with us! Come back soon."
    );
  };
  const handleClose = (reference) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("Payment widget reference handleClose : ", reference);
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: (reference) => handleClose(reference),
  };

  const formDisabled = () => {
    return (
      !form?.first_name ||
      !form?.last_name ||
      !form?.email ||
      !form?.phone_number
    );
  };
  const onSubmit = () => {};
  return (
    <Modal
      size="xl"
      active
      noPadding
      bodyClass="bg-white py-6 px-6"
      toggler={toggleModal}
      backdropClassName="!z-[99999]"
    >
      <ModalHeader>
        <p className="text-blue text-2xl font-bold">
          Confirm your booking details
        </p>
      </ModalHeader>
      <ModalBody>
        <form
          className="flex flex-col sm:flex-row justify-around gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 w-full py-3 pr-3"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-y-3 text-black w-full">
            <Input
              label="First Name"
              value={form?.first_name}
              onChangeFunc={(val) => handleChange("first_name", val)}
              placeholder="Update Your Profile"
              required
            />

            <Input
              label="Last Name"
              value={form?.last_name}
              onChangeFunc={(val) => handleChange("last_name", val)}
              placeholder="Update Your Profile"
              required
            />

            <Input
              label="Email Address"
              value={form?.email}
              onChangeFunc={(val) => handleChange("email", val)}
              placeholder="Update Your Profile"
              type="email"
              required
            />

            <PhoneNumber
              label="Contact Number"
              value={form.phone_number}
              onPhoneChange={(val) => handleChange("phone_number", val)}
              placeholder="Update Your Profile"
              labelClass="!text-black regular-font"
              required
            />
          </div>
          <div className="flex flex-col gap-y-3 text-black w-full">
            <p className="flex gap-3 mxs:gap-1 text-xl pr-4 text-grey-label regular-font">
              {shortletdetails?.name}
              <span className="text-[#7A8996] font-thin flex text-[13px] leading-[13px] items-center">
                <GreenStar /> 4.21
              </span>
            </p>
            <div className="flex justify-between">
              <p className="font-light">
                {formatter.format(shortletdetails?.base_price)} &#215;{" "}
                {formData?.diffDays}{" "}
                {formData?.diffDays === 1 ? "Night" : "Nights"}
              </p>
              <p className="text-[20px]">
                {formatter.format(formData?.totalPrice || 0)}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="font-light">Other Fees</p>
              <p className="text-[20px]">
                {formatter.format(
                  shortletdetails?.addon_caution_fee_price || 0
                )}
              </p>
            </div>

            <div className="flex justify-between regular-font pb-2 sm:pb-4">
              <p>TOTAL</p>
              <p className="text-[24px]">
                {formatter.format(formData?.grandTotal || 0)}
              </p>
            </div>

            {formData.paymentMethod === "bankCard" ? (
              <PaystackConsumer {...componentProps}>
                {({ initializePayment }) => (
                  <Button
                    text="Pay Now"
                    isDisabled={formDisabled() || loading || uploading}
                    isLoading={loading || uploading}
                    onClick={() => {
                      updateProfile();
                      initializePayment(handleSuccess, handleClose);
                    }}
                  />
                )}
              </PaystackConsumer>
            ) : (
              <Button
                text="Pay Now"
                isDisabled={formDisabled() || loading || uploading}
                isLoading={loading || uploading}
                onClick={() => {
                  updateProfile();
                  handleBaniPop();
                }}
              />
            )}
            <Button
              isOutline
              text="Cancel"
              textColor="text-red-alt"
              borderColor="border-red-alt"
              className="sm:hidden"
              onClick={toggleModal}
            />
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

PaymentModal.propTypes = {
  handleSubmit: PropTypes.func,
  toggleModal: PropTypes.func,
  formData: PropTypes.object,
  shortletdetails: PropTypes.object,
  bookingForm: PropTypes.object,
};

export default observer(PaymentModal);
