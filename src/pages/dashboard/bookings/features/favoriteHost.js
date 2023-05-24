import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "../../../../components/general/button/button";
import CircleLoader from "components/general/circleLoader/circleLoader";
import ContentHeader from "./contentHeader";
import BookingsStore from "../store";
import ListingStore from "store/listing";
import Pagination from "components/general/pagination";
import { pageCount } from "utils/constants";
const FavoriteHost = ({}) => {
  const { loading, bookings, getBookings, bookingsCount } = BookingsStore;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getBookings(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-6  mmd:gap-2 py-5">
      <ContentHeader
        favoriteHosts
        headerClass="fixed top-[65px] left-0 right-0 bg-white sm:bg-transparent z-[999] border-y-1/2 border-[#E0E3E8] "
      />
      <div className="flex flex-col gap-6 pt-10 sm:pt-4 md:pt-1">
        <div className="w-full px-[3rem] mmd:px[2rem] msm:px-[1rem]">
          {loading && (
            <div className="w-full flex justify-center items-center h-[100px]">
              <CircleLoader blue />
            </div>
          )}
        </div>

        <Pagination
          pageCount={Number(bookingsCount) / pageCount}
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default observer(FavoriteHost);
