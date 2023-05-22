/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import PropTypes from "prop-types";

import AuthStore from "store/auth";
import Loader from "assets/icons/loader/loader.svg";
import Button from "components/general/button/button";
import { FormErrorMessage } from "components/general/errorMessage";
import useLoginSetup from "hooks/loginSetup";
import OtpField from "components/general/input/otpInput";

YupPassword(Yup);

const defaultValues = {
  otp: "",
};

const schema = Yup.object({
  otp: Yup.string().required("Required"),
});

const VerifyOtp = observer(
  ({ modalClass, saveFormToStorage, handleLoginSuccess }) => {
    const { loading, verifyOtp, loadingVerify, sendOtp, setAuthState } =
      AuthStore;
    const { logUserIn } = useLoginSetup();

    const {
      handleSubmit,
      formState: { errors },
      register,
      setValue,
      trigger,
      watch,
    } = useForm({
      defaultValues,
      mode: "onTouched",
      resolver: yupResolver(schema),
    });

    useEffect(() => {
      register("otp");
    }, []);

    const sharedOnChange = async (name, value) => {
      setValue(name, value);
      await trigger(name);
    };

    const onSubmit = async (data) => {
      const { otp } = data;
      const savedPhoneNumber = localStorage.getItem("otp_phone_number");
      const phone_number = "0" + savedPhoneNumber?.substring(4);
      try {
        await verifyOtp(
          {
            phone_number,
            otp,
            action: "REGISTRATION",
          },
          logUserIn,
          modalClass,
          handleLoginSuccess
        );
        saveFormToStorage && saveFormToStorage();
      } catch (error) {}
    };

    const resendOtp = async (data) => {
      const savedPhoneNumber = localStorage.getItem("otp_phone_number");
      const phone_number = "0" + savedPhoneNumber?.substring(4);
      await sendOtp({
        phone_number,
        action: "REGISTRATION",
      });
    };
    // FOr the sake of form reset
    const otp = watch("otp");
    return (
      <div
        className={`flex mx-auto md:m-auto transition-transform duration-500 ease-in-out ${
          modalClass ? "h-fit py-3 w-full" : "h-[60vh]"
        } ${modalClass}`}
      >
        <section className="w-[90%] h-fit md:w-[380px] mx-auto md:m-auto flex flex-col">
          {!modalClass && (
            <>
              <h2 className="text-black text-[24px] mb-4 medium-font">
                {" "}
                Verify Phone Number
              </h2>
              <h2 className="text-lg text-grey-textalt mb-3">
                {" "}
                A message with a verification code has been sent to your phone
                number!
              </h2>
            </>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full "
          >
            <div className="w-full mb-10">
              <OtpField
                label="Enter 4 digit otp"
                value={otp}
                onChangeFunc={(e) => sharedOnChange("otp", e)}
                name="otp"
                required
              />
              {errors.otp && <FormErrorMessage type={errors.otp} />}
            </div>
            <div className="flex justify-between items-start space-x-3 mb-3 regular-font">
              <label className="text-black text-[14px]">
                Wrong phone number?
              </label>
              <Link
                className="text-blue-9 underline"
                href={modalClass ? "#" : "/otp/send"}
                onClick={() => modalClass && setAuthState("send")}
              >
                Change
              </Link>{" "}
            </div>
            <div className="flex justify-between items-start space-x-3 mb-14 regular-font">
              <label className="text-black text-[14px]">
                Didn’t recieve a code?
              </label>
              <button
                className="text-blue-9 underline"
                onClick={resendOtp}
                type="button"
                disabled={loadingVerify || loading}
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Request Again"
                )}
              </button>{" "}
            </div>
            <div className="w-full ">
              <Button
                type="submit"
                text="Verify"
                isLoading={loadingVerify}
                isDisabled={!otp || otp?.length < 4 || loading}
                fullWidth
              />
            </div>
          </form>
        </section>
      </div>
    );
  }
);
VerifyOtp.propTypes = {
  modalClass: PropTypes.string,
  saveFormToStorage: PropTypes.func,
  handleLoginSuccess: PropTypes.func,
};
export default VerifyOtp;
