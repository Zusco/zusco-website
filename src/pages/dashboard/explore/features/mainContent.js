import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "../../../../components/general/button/button";
import CircleLoader from "components/general/circleLoader/circleLoader";
import ListingStore from "store/listing";
import ContentHeader from "components/layout/landing/contentHeader";
import ExploreStore from "../store";
import { useAuth } from "hooks/auth";

const Content = observer(() => {
  const { isAuthenticated } = useAuth();
  const {
    loading,
    allListings,
    getAllListing,
    listingsCount,
    getFavouriteListings,
  } = ListingStore;
  const [activeTab, setActiveTab] = useState({
    title: "Zusco Shorlets",
    index: 0,
  });
  useEffect(() => {
    getAllListing();
  }, []);
  useEffect(() => {
    getFavouriteListings(isAuthenticated);
  }, []);

  return (
    <section className="flex flex-col gap-6  mmd:gap-2 py-5">
      <ContentHeader
        filter
        store={ExploreStore}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        headerClass="fixed top-[65px] left-0 right-0 z-[999] border-y-1/2 border-[#E0E3E8] "
        tabClass="pt-6 px-6 "
      />
      <div className="flex flex-col gap-6 pt-10 sm:pt-4 md:pt-1">
        <div className="w-full px-[3rem] mmd:px[2rem] msm:px-[1rem]">
          {loading && (
            <div className="w-full flex justify-center items-center h-[100px]">
              <CircleLoader blue />
            </div>
          )}
        </div>

        {listingsCount > allListings?.length && (
          <div className="mx-auto">
            <Button
              isOutline
              text="Load More"
              onClick={() => getAllListing()}
              isLoading={loading}
              isDisabled={loading}
              borderColor="blue-alt"
            />
          </div>
        )}
      </div>
    </section>
  );
});

export default Content;
