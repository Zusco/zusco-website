import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import ListingStore from "store/listing";
import Pagination from "components/general/pagination";
import { pageCount } from "utils/constants";
import { useAuth } from "hooks/auth";
import ContentHeader from "./contentHeader";

const FavoriteShortlets = ({}) => {
  const isAuthenticated = useAuth();
  const { favouriteListings } = ListingStore;

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col gap-6  mmd:gap-2 py-5">
      <ContentHeader
        favoriteShortlets
        headerClass="fixed top-[65px] left-0 right-0 z-[999] border-y-1/2 border-[#E0E3E8] "
      />
      <div className="flex flex-col gap-6 pt-10 sm:pt-4 md:pt-1">
        <Pagination
          pageCount={Number(favouriteListings.length) / pageCount}
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default observer(FavoriteShortlets);
