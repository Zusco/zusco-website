import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ListingStore from "store/listing";
import CircleLoader from "components/general/circleLoader/circleLoader";
import ContentHeader from "components/layout/landing/contentHeader";
import Button from "components/general/button/button";
import { useAuth } from "hooks/auth";

const Content = ({ store }) => {
  const {
    loading,
    allListings,
    getAllListing,
    listingsCount,
    getFavouriteListings,
  } = ListingStore;
  const { isAuthenticated } = useAuth();
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
    <section className="flex flex-col px-6 sm:px-10">
      <div className="Title justify-center flex flex-col gap-4  mmd:gap-1 mb-10 text-center">
        <p className="text-grey medium-font text-base tracking-[0.24em]">
          Explore
        </p>
        <h2 className="text-black zusco-heading mb-2 regular-font">
          Browse our top shortlet properties
        </h2>
        <p className="text-grey-textalt zusco-title regular-font w-full lg:w-[40%]  md:w-[65%] mx-auto">
          Browse our locations. Leave it to Zusco to help support your
          short-stay needs.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <ContentHeader
          store={store}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />

        {loading && (
          <div className="w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        )}

        {listingsCount > allListings?.length && (
          <div className="mx-auto pt-6 md:pt-0">
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
};

export default observer(Content);
