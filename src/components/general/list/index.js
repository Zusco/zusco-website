import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Location from "assets/icons/location.svg";
import Clock from "assets/icons/time.svg";
import { Button } from "../button";
import Link from "next/link";

const List = ({ listing }) => {
  return (
    <Link
      href={`/dashboard/booking/${listing?.id}`}
      className={`bg-white flex flex-col sm:flex-row space-y-3 sm:space-y-0  justify-between items-center w-full h-fit rounded-lg py-6 px-6 border-1/2 border-grey-border`}
    >
      <div className="flex justify-start items-center w-fit space-x-6">
        <div className="flex flex-col justify-center items-start space-y-1">
          <div
            alt="img"
            className={`w-[86px] h-[86px] rounded-lg`}
            style={{
              backgroundImage: `url(${listing?.shortlet?.images[0]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
            }}
          />

          <span className="text-[10px] text-grey-text">
            {listing?.agent?.first_name
              ? listing?.agent?.first_name + " " + listing?.agent?.last_name
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-col justify-center items-start space-y-3">
          <span className="text-xl text-black">{listing?.shortlet?.name} </span>

          <span className="text-base text-black flex justify-between items-center">
            <Location className=" mr-2 w-[15px] h-[15px]" />{" "}
            {listing?.shortlet?.address}
          </span>

          <span className="flex justify-between items-center text-sm text-grey-text regular-font">
            <Clock className="mr-2 w-[15px] h-[15px]" />
            {`${moment(listing?.check_in_date).format("MMMM Do")} - ${moment(
              listing?.check_out_date
            ).format("MMMM Do")}, ${moment(listing?.check_out_date).format(
              "YYYY"
            )}`}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-end space-y-4 h-full">
        <Button isOutline text="View details" borderColor="blue-alt" small />
      </div>
    </Link>
  );
};
List.propTypes = {
  listing: PropTypes.any,
};
export default List;
