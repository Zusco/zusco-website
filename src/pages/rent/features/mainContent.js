import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "components/general/button/button";
import { CircleSpinner } from "components/general/circleLoader/circleLoader";
import ListingStore from "store/listing";
import ContentHeader from "components/layout/landing/contentHeader";
import ExploreStore from "pages/rent/store/index";

const Content = observer(() => {
  const {
    loading,
    allListings,
    getAllListing,
    incrementPageCount,
    listingsCount,
  } = ListingStore;

  const [activeTab, setActiveTab] = useState({
    title: "All",
    value: "all",
    index: 0,
  });

  useEffect(() => {
    getAllListing(1);
  }, []);

  return (
    <section className="flex flex-col gap-6  mmd:gap-2 py-5 mt-[30px] md:mt-0">
      <ContentHeader
        filter
        store={ExploreStore}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        headerClass="fixed top-[65px] left-0 right-0 bg-white sm:bg-transparent z-[9] border-y-1/2 border-[#E0E3E8] "
        tabClass="pt-6 px-6 "
      />
      <div className="flex flex-col gap-6 pt-10 sm:pt-4 md:pt-1">
        <div className="w-full px-[3rem] mmd:px[2rem] msm:px-[1rem]">
          {loading && (
            <div className="w-full flex justify-center items-center h-[100px]">
              <CircleSpinner />
            </div>
          )}
        </div>

        {listingsCount > allListings?.length && (
          <div className="mx-auto">
            <Button
              isOutline
              text="Load More"
              onClick={() => {
                incrementPageCount();
                getAllListing();
              }}
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
