import React, { useState, useEffect, useMemo } from "react";
import { DateRange } from "react-date-range";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Button from "components/general/button/button";
import ListingStore from "store/listing";
import Counter from "components/general/counter";
import CheckBoxRound from "components/general/input/checkBoxRound";
import { useAuth } from "hooks/auth";
import PaymentModal from "components/layout/modals/paymentModal";
import { formatter } from "utils/functions";
import AuthModal from "pages/otp/features/authModal";
import AuthStore from "store/auth";
import { PENDING_BOOKING_DATA } from "utils/storage";
import ShareListingModal from "./shareListingModal";

const SideBar = ({ shortletdetails, bookingdetails, pathname, path }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { bookListing, bookListingLoading, showShareModal, setShowShareModal } =
    ListingStore;
  const { showPaymentModal, setShowPaymentModal } = AuthStore;
  let pendingBookingData;

  useEffect(() => {
    pendingBookingData = localStorage.getItem(PENDING_BOOKING_DATA);
  }, []);
  pendingBookingData = pendingBookingData && JSON.parse(pendingBookingData);
  const pendingBookingForm = pendingBookingData?.pendingBookingForm;
  const pendingExtraData = pendingBookingData?.extraData;

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [formData, setFormData] = useState({
    paymentMethod: "",
    diffDays: 0,
    totalPrice: "",
    grandTotal: "",
  });

  const [form, setForm] = useState({
    number_of_guests: 1,
    check_in_date: "",
    check_out_date: "",
  });

  useEffect(() => {
    handlePaymentCheck();
    if (pathname?.includes("booking")) {
      setForm({ ...bookingdetails });

      bookingdetails?.check_in_date &&
        dateChange([
          {
            startDate: new Date(bookingdetails?.check_in_date),
            endDate: new Date(bookingdetails?.check_out_date),
            key: "selection",
          },
        ]);
      handleChange(
        "paymentMethod",
        pendingExtraData?.paymentMethod,
        "formData"
      );
    } else if (pendingBookingForm) {
      setForm({ ...pendingBookingForm });

      dateChange([
        {
          startDate: new Date(pendingBookingForm?.check_in_date),
          endDate: new Date(pendingBookingForm?.check_out_date),
          key: "selection",
        },
      ]);
      handleChange(
        "paymentMethod",
        pendingExtraData?.paymentMethod,
        "formData"
      );
    } else {
      dateChange([
        {
          startDate: new Date(),
          endDate: new Date(moment().add(1, "days")),
          key: "selection",
        },
      ]);
    }
  }, [shortletdetails]);

  const dateChange = (item) => {
    setState(item);
    setForm((prev) => {
      return {
        ...prev,
        check_in_date: item[0].startDate,
        check_out_date: item[0].endDate,
      };
    });
    calcDateDiff(item[0].startDate, item[0].endDate);
  };

  const handleChange = (prop, val, type) => {
    if (type === "formData") {
      setFormData((prev) => {
        return { ...prev, [prop]: val };
      });
    } else {
      setForm((prev) => {
        return type === "+"
          ? { ...prev, [prop]: val + 1 }
          : type === "-"
          ? {
              ...prev,
              [prop]: val >= 2 ? val - 1 : val,
            }
          : { ...prev, [prop]: val };
      });
    }
  };
  const calcDateDiff = (startDate, endDate) => {
    const date1 = new Date(moment(startDate).format("l"));
    const date2 = new Date(moment(endDate).format("l"));

    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = shortletdetails?.base_price * diffDays;
    const grandTotal =
      totalPrice + (shortletdetails?.addon_caution_fee_price || 0);
    setFormData((prev) => {
      return {
        ...prev,
        diffDays,
        totalPrice,
        grandTotal,
      };
    });
  };
  const handlePaymentCheck = () => {
    const card = shortletdetails?.card;
    const bank_transfer = shortletdetails?.bank_transfer;

    if (card === false) {
      handleChange("paymentMethod", "transfer", "formData");
    } else if (bank_transfer === false) {
      handleChange("paymentMethod", "bankCard", "formData");
    }
  };
  const sortFormData = () => {
    const { check_in_date, check_out_date, number_of_guests } = form;
    const payload = {
      number_of_guests,
      check_in_date: moment(check_in_date).format("YYYY-MM-DD"),
      check_out_date: moment(check_out_date).format("YYYY-MM-DD"),
    };
    const extraData = { paymentMethod: formData?.paymentMethod };

    return { payload, extraData };
  };
  const handleSubmit = () => {
    bookListing(
      sortFormData().payload,
      isAuthenticated,
      router,
      sortFormData().extraData,
      formData.paymentMethod === "transfer"
    );
  };
  const saveFormToStorage = () => {
    const pendingBookingData = {
      pendingBookingForm: sortFormData().payload,
      id: path?.path,
      extraData: sortFormData().extraData,
    };
    localStorage.setItem(
      PENDING_BOOKING_DATA,
      JSON.stringify(pendingBookingData)
    );
  };
  return (
    <div className="w-full py-4 px-3 flex flex-col gap-y-8">
      <div>
        <div className="flex justify-between text-[#8B8E93] text-xs px-6 uppercase">
          <p>Check In</p> <p>Check Out</p>
        </div>
        <DateRange
          onChange={(item) => dateChange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          startDatePlaceholder="CHECK IN"
          endDatePlaceholder="CHECK OUT"
          color="#000000"
          minDate={new Date()}
          maxDate={bookingdetails?.paid && new Date()}
          className="text-blue-9 w-full"
        />
      </div>

      <div className="px-4 flex flex-col gap-4">
        <p className="text-[#8B8E93] text-xs uppercase">Number of Guest</p>
        <Counter
          decrementClick={() =>
            handleChange("number_of_guests", form.number_of_guests, "-")
          }
          incrementClick={() =>
            handleChange("number_of_guests", form.number_of_guests, "+")
          }
          incrementClickDisabled={
            shortletdetails?.number_of_guests === form.number_of_guests
          }
          decrementClickDisabled={form.number_of_guests < 2}
          itemCount={form.number_of_guests}
          disabled={bookingdetails?.paid}
        />
      </div>

      <div className="px-4 flex flex-col gap-4">
        <p className="text-[#8B8E93] text-xs uppercase">Price Details</p>
        <div className="flex flex-col gap-y-3 text-black">
          <div className="flex justify-between gap-4">
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
              {formatter.format(shortletdetails?.addon_caution_fee_price || 0)}
            </p>
          </div>

          <div className="flex justify-between regular-font">
            <p>TOTAL</p>
            <p className="text-[24px]">
              {formatter.format(formData?.grandTotal || 0)}
            </p>
          </div>
        </div>{" "}
      </div>

      {!bookingdetails?.paid && (
        <div className="px-4 flex flex-col gap-4">
          <p className="text-[#8B8E93] text-xs uppercase">Payment Method</p>
          <div className="flex items-center gap-x-8">
            <fieldset>
              {shortletdetails?.card && (
                <button
                  className="flex gap-3 text-blue-9 cursor-pointer"
                  onClick={() =>
                    handleChange("paymentMethod", "bankCard", "formData")
                  }
                >
                  <CheckBoxRound
                    checked={formData.paymentMethod === "bankCard"}
                  />
                  {"  "}
                  <label className="cursor-pointer">Pay With Bank Card</label>
                </button>
              )}

              <br />
              {shortletdetails?.bank_transfer && (
                <button
                  className="flex gap-3 text-blue-9 cursor-pointer"
                  onClick={() =>
                    handleChange("paymentMethod", "transfer", "formData")
                  }
                >
                  <CheckBoxRound
                    checked={formData.paymentMethod === "transfer"}
                  />
                  {"   "}
                  <label className="cursor-pointer">Pay With Transfer</label>
                </button>
              )}
            </fieldset>
          </div>
        </div>
      )}
      {!bookingdetails?.paid && (
        <Button
          text="Book a stay"
          blueBg
          className="shadow-btn drop-shadow-btn w-full mmd:w-[350px] mxs:w-[270px] mx-auto"
          type="submit"
          btnClass=""
          isDisabled={!formData?.paymentMethod || !formData?.diffDays}
          isLoading={bookListingLoading}
          onClick={() =>
            isAuthenticated ? setShowPaymentModal(true) : setShowAuthModal(true)
          }
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          formData={formData}
          shortletdetails={shortletdetails}
          toggleModal={() => setShowPaymentModal(false)}
          handleSubmit={handleSubmit}
          bookingForm={form}
        />
      )}

      <AuthModal
        active={showAuthModal}
        toggleModal={() => setShowAuthModal(false)}
        saveFormToStorage={saveFormToStorage}
        handleLoginSuccess={() => {
          setShowAuthModal(false);
          setShowPaymentModal(true);
        }}
      />
      <ShareListingModal
        handleOk={() => setShowShareModal(false)}
        data={shortletdetails}
        active={showShareModal}
      />

      <div></div>
    </div>
  );
};

export default observer(SideBar);
