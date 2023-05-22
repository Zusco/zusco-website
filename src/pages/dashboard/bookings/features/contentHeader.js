import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";

import Select from "components/general/input/select";
import ListingStore from "store/listing";
import List from "components/general/list";
import CircleLoader from "components/general/circleLoader/circleLoader";
import BlueLike from "assets/icons/dashboard/blueLike.svg";
import Card1 from "components/layout/cards/Card1";
import HostCard from "components/layout/cards/hostCard";
import { useAuth } from "hooks/auth";
import BookingsStore from "../store";

const ContentHeader = ({
  filter,
  headerClass,
  bookingsPage,
  favoriteShortlets,
  favoriteHosts,
  ...rest
}) => {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const {
    searchListings,
    getFavouriteListings,
    favouriteListings,
    getAllListing,
    allListings,
    favouritesLoading,
  } = ListingStore;
  const { bookings, bookingsCount } = BookingsStore;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    goToListing();
  }, [searchQuery]);

  useEffect(() => {
    getAllListing();
  }, []);

  useEffect(() => {
    getFavouriteListings(isAuthenticated);
  }, []);

  const goToListing = () => {
    if (searchQuery?.value) {
      router.push(`listing/${searchQuery?.value}`);
    }
  };

  const getListings = async (value) => {
    setSearchValue(value || "");
    try {
      let listings = await searchListings({ search_query: value }, "1");
      listings = listings?.map(({ id, name, address, ...item }) => {
        return { value: id, label: `${name}, ${address}`, ...item };
      });
      return new Promise((resolve) => {
        return resolve(listings);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col justify-start items-start  w-full px-6 py-4
            transition-all duration-500 ease-in-out bg-white
           
        ${headerClass}
        `}
      >
        <div
          className={`w-full md:w-[30rem]  ${
            searchValue?.length > 1 ? "search-bar-open" : "search-bar-closed"
          }`}
        >
          <Select
            async
            value={searchQuery}
            loadOptions={getListings}
            onChange={(val) => {
              setSearchQuery(val);
            }}
            classNamePrefix="search_bar"
            showMenu={searchValue}
            searchBar
            searchType="search"
            placeholder="Search Bookings"
            {...rest}
          />
        </div>
      </div>

      <div className="py-6 mt-[50px] px-4">
        {bookingsPage && (
          <div className="flex justify-between">
            <p className="text-[#211D31] text-[20px]">
              Bookings - {bookingsCount}
            </p>

            <p
              onClick={() => {
                router.push("/dashboard/bookings/favorite/shortlets");
              }}
              className="text-blue-alt text-[20px] flex items-center gap-1 underline cursor-pointer"
            >
              Show all Favourites{" "}
              <span>
                <BlueLike />
              </span>
            </p>
          </div>
        )}

        {router.pathname.includes("favorite") && (
          <div className="flex flex-col space-y-6">
            <p
              onClick={() => {
                router.push("/dashboard/bookings");
              }}
              className="flex items-center gap-1 cursor-pointer text-black"
            >
              <FiArrowLeft size={20} />{" "}
              <span className="underline">Back to Bookings</span>
            </p>
            <p className="text-[#211D31] text-[20px]">Favorites</p>
            <div className="flex border-b-[0.5px] border-[#8B8E93]">
              <p
                onClick={() =>
                  router.push("/dashboard/bookings/favorite/shortlets")
                }
                className={`${
                  router.pathname.includes("shortlets")
                    ? "text-black font-medium border-black border-b-[1.5px]"
                    : "text-[#8B8E93] font-light"
                } ml-4 mr-4`}
              >
                Shortlets
              </p>
              <p
                onClick={() =>
                  router.push("/dashboard/bookings/favorite/hosts")
                }
                className={`${
                  router.pathname.includes("hosts")
                    ? "text-black font-medium border-black border-b-[1.5px]"
                    : "text-[#8B8E93] font-light"
                } ml-4`}
              >
                Hosts
              </p>
            </div>
          </div>
        )}
      </div>

      {/* content */}

      {bookingsPage && (
        <div
          className={`flex flex-col gap-8 justify-start items-start w-full pt-2 px-6 
            
            `}
        >
          {bookings?.map((data) => {
            return <List key={data?.id} listing={data} />;
          })}
        </div>
      )}

      {favouriteListings.length > 0 && favoriteShortlets && (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-end items-start w-full px-6 
            `}
        >
          {favouriteListings?.map((data) => {
            return <Card1 key={data.id} listing={data.shortlet} />;
          })}
        </div>
      )}

      {favouriteListings.length > 0 && favoriteHosts && (
        <div
          className={`flex flex-col gap-8 justify-start items-start w-full pt-6 px-6 
            `}
        >
          {favouriteListings?.map((data) => {
            return (
              <HostCard
                key={data.id}
                allListings={allListings}
                listingId={data.shortlet_id}
              />
            );
          })}
        </div>
      )}
      {favouritesLoading && favoriteHosts && favoriteShortlets && (
        <div className="w-full px-[3rem] mmd:px[2rem] msm:px-[1rem]">
          <div className="w-full flex justify-center items-center h-[100px]">
            <CircleLoader blue />
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ContentHeader);
