import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

import {
  ZuscoShortlet,
  Popular,
  NewShortlet,
  FeaturedShortlet,
} from "assets/icons";
import Button from "components/general/button/button";
import Card1 from "components/layout/cards/Card1";
import FilterIcon from "assets/icons/features/filterIcon.svg";
import ListingStore from "store/listing";
import Select from "components/general/input/select";
import CircleLoader from "components/general/circleLoader/circleLoader";
import FilterListings from "utils/filter";
import { useAuth } from "hooks/auth";
import { isEmpty } from "lodash";

const headerClassValue =
  "fixed top-[65px] left-0 right-0 bg-white sm:bg-transparent z-[9] border-y-1/2 border-[#E0E3E8] ";
const ContentHeader = observer(
  ({ setActiveTab, activeTab, filter, headerClass, tabClass, isHome }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const {
      allListings,
      zuscoListings,
      newListings,
      featuredListings,
      searchListings,
      getFavouriteListings,
      favouriteListings,
      filteredListing,
      clearFilter,
      setShowFilteredListings,
      showFilteredListings,
      filterLoading,
      filterData,
      amenities,
      allowances,
      rules,
    } = ListingStore;
    const containerRef = useRef(null);

    const [showFilter, setShowFilter] = useState(false);
    const tabs = [
      {
        title: "All",
        icon: <Popular className="stroke-current" />,
        content: allListings,
        value: "all",
      },
      {
        title: "Zusco Shorlets",
        icon: <ZuscoShortlet className="fill-current" />,
        content: zuscoListings,
        value: "zusco",
      },
      {
        title: "New",
        icon: <NewShortlet className="stroke-current" />,
        content: newListings,
        value: "new",
      },

      {
        title: "Featured",
        icon: <FeaturedShortlet className="stroke-current" />,
        content: featuredListings,
        value: "featured",
      },
    ];

    const [sliderPosition, setSliderPosition] = useState(0);
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
      getFavouriteListings(isAuthenticated);
    }, []);

    useEffect(() => {
      handleSlide();
    }, []);

    useEffect(() => {
      handleSlide();
    }, [activeTab]);

    useEffect(() => {
      goToListing();
    }, [searchQuery]);

    const goToListing = () => {
      if (searchQuery?.value) {
        router.push(`/listing/${searchQuery?.value}`);
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

    const handleSlide = () => {
      const width = containerRef?.current?.getBoundingClientRect()?.width;
      const slideContainerWidth = width / tabs.length;
      const slidePosition = slideContainerWidth * activeTab?.index;
      setSliderPosition(slidePosition);
    };
    const filteredListingsCount = filteredListing?.length;
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    });
    const formatMoney = (amount) => {
      const apprx = Math.floor(amount / 1000) * 1000;
      return formatter.format(apprx);
    };

    console.log("activeTab: ", activeTab);
    console.log("filteredListing: ", filteredListing);

    const filteredAmenities = amenities.filter((obj) =>
      filterData?.amenities.includes(obj.id)
    );
    const filteredAllowances = allowances.filter((obj) =>
      filterData?.allowances.includes(obj.id)
    );
    const filteredRules = rules.filter((obj) =>
      filterData?.rules.includes(obj.id)
    );

    return (
      <div className="flex flex-col gap-6 ">
        <div className="px-2 py-[1.5rem]  flex justify-between gap-y-5 flex-wrap border-b-1/2 border-grey-border text-black">
          <div
            className={`flex flex-col justify-start items-start  w-full
            transition-all duration-500 ease-in-out
           
        ${headerClass} ${isHome && showFilter ? headerClassValue : ""}
        `}
          >
            <div
              className={`flex flex-col-reverse md:flex-row md:justify-between items-start md:items-center gap-x-8 gap-y-5 w-full z-[9]
              bg-white ${filter ? "px-6" : ""} py-4 md:py-3
           
            `}
            >
              <div className="flex justify-start items-center gap-x-4 md:gap-x-8 w-full md:w-fit">
                <div
                  className={`w-full ${
                    filter
                      ? "md:w-[15rem] lg:w-[25rem] xl:w-[30rem] "
                      : "md:w-[30rem]"
                  } ${
                    searchValue?.length > 1
                      ? "search-bar-open"
                      : "search-bar-closed"
                  }`}
                >
                  <Select
                    async
                    value={searchQuery}
                    placeholder="Where would you like to stay?"
                    loadOptions={getListings}
                    onChange={(val) => {
                      setSearchQuery(val);
                    }}
                    classNamePrefix="search_bar"
                    showMenu={searchValue}
                    searchBar
                    searchType="search"
                  />
                </div>

                {filter && (
                  <div className="flex justify-end items-center w-[100px] h-[63px]">
                    {!showFilter ? (
                      <div className="h-[52px] flex items-center">
                        <Button
                          whiteBg
                          text="Filter"
                          icon={<FilterIcon />}
                          btnClass="border border-black hover:bg-black/[.1] text-black bg-white h-[50px]"
                          className="shadow-btn bg-white"
                          onClick={() => setShowFilter(true)}
                          xsmall
                        />
                      </div>
                    ) : showFilter ? (
                      <button
                        onClick={() => setShowFilter(false)}
                        className="medium-font text-right text-[14px] text-[#211D31] cursor-pointer hover:text-red-500"
                      >
                        Close
                      </button>
                    ) : null}
                  </div>
                )}
              </div>

              <div
                className="hidden sm:flex flex-col justify-center items-end w-full sm:w-fit overflow-x-scroll"
                ref={containerRef}
              >
                <div className="flex justify-end items-end space-x-2 overflow-x-scroll w-full max-w-[calc(100vw-10px)] sm:max-w-fit ">
                  {tabs?.map(({ title, icon, value }, index) => (
                    <button
                      key={title}
                      onClick={() => setActiveTab({ title, index, value })}
                      className={`cursor-pointer text-sm space-y-2 w-[115px] px-1
              flex flex-col justify-between items-center transition-all duration-500 ease-in-out
              ${activeTab?.title === title ? "text-blue-alt" : "text-grey"}`}
                    >
                      <span>{icon}</span>
                      <span className="whitespace-nowrap"> {title}</span>
                    </button>
                  ))}
                </div>
                <div
                  className={`w-full h-fit  sm:pl-[2.3rem] mt-1
                ${
                  activeTab.index === 1
                    ? "pl-[2.1rem]"
                    : activeTab.index === 2
                    ? "pl-[1.3rem]"
                    : activeTab.index === 3
                    ? "pl-[0.9rem]"
                    : "pl-[1.7rem]"
                }
                `}
                >
                  <div
                    className={`
                    w-[60px]  md:w-[50px] h-[3px] bg-blue-alt rounded-lg transition-all duration-300 ease-in-out
                    
                    `}
                    style={{
                      transform: `translateX(${sliderPosition}px)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {showFilter && (
              <div className="flex justify-between items-center gap-5 px-2 md:px-8 py-2 bg-white fade-in w-full border-t-1/2 border-grey-border z-[9]">
                <div className="flex items-center gap-1">
                  <p
                    className="underline cursor-pointer text-blue-9"
                    onClick={() => {
                      clearFilter();
                      setShowFilter(false);
                    }}
                  >
                    Clear all{" "}
                  </p>
                  <span className="text-[25px] text-blue-alt items-center font-thin">
                    &#215;
                  </span>
                </div>
                <div className="h-[3.5rem] mmd:h-[2.5rem] flex items-center">
                  <Button
                    whiteBg
                    text={`Show ${
                      filteredListingsCount > 0 ? filteredListingsCount : "all"
                    } ${filteredListingsCount === 1 ? "result" : "results"}`}
                    btnClass="border-none sm:!border-[0.8px] sm:!border-black sm:border-solid text-black"
                    className="shadow-btn"
                    onClick={() => {
                      setActiveTab({
                        title: "All",
                        value: "all",
                        index: 0,
                      });
                      setShowFilter(false);
                      setShowFilteredListings(true);
                    }}
                  />
                </div>
              </div>
            )}

            {showFilter && <FilterListings />}
            {showFilter && (
              <div className="fixed top-0 left-0 h-screen w-full !my-0 backdrop "></div>
            )}
          </div>
        </div>
        {/* content */}

        {/* Filter loader */}

        {filterLoading && (
          <div className="w-full flex justify-center items-center h-[100px] absolute m-auto left-0 right-0 mt-[50px] z-[999]">
            <CircleLoader blue size="xm" />
          </div>
        )}

        {showFilteredListings && (
          <p className="text-[26px] mt-[20px] text-blue regular-font px-6">
            {filteredListingsCount > 0 ? filteredListingsCount : ""}{" "}
            {filteredListingsCount < 1
              ? "No listings were"
              : filteredListingsCount === 1
              ? "Listing"
              : "Listings"}{" "}
            found for your filter:
          </p>
        )}

        {showFilteredListings && (
          <div className="flex flex-wrap items-center justify-start regular-font px-6 gap-4 md:gap-7 text-xl">
            {!isEmpty(filterData?.house_type) && (
              <div className="flex items-center justify-start regular-font gap-1">
                <p className="text-grey-textalt">Property Type: </p>
                <p className="text-blue flex justify-start items-center gap-1 capitalize">
                  {filterData?.house_type}
                </p>
              </div>
            )}
            {!isEmpty(filterData?.number_of_bedrooms) && (
              <div className="flex items-center justify-start regular-font gap-1">
                <p className="text-grey-textalt">Number of Rooms: </p>
                <p className="text-blue flex justify-start items-center gap-1 capitalize">
                  {filterData?.number_of_bedrooms}
                </p>
              </div>
            )}
            {!isEmpty(filteredAmenities) && (
              <div className="flex items-start justify-start regular-font gap-1">
                <p className="text-grey-textalt">Amenities: </p>

                <p className="text-blue flex justify-start flex-wrap items-center gap-1 capitalize">
                  {filteredAmenities?.map(
                    ({ name }, i, arr) =>
                      `${name}${
                        i === arr.length - 2
                          ? " & "
                          : i < arr.length - 1
                          ? ", "
                          : ""
                      }`
                  )}
                </p>
              </div>
            )}
            <div className="flex items-center justify-start regular-font gap-1">
              <p className="text-grey-textalt">Price Range: </p>
              <p className="text-blue flex justify-start items-center gap-1 capitalize">
                {formatMoney(filterData.min_price)} -{" "}
                {formatMoney(filterData?.max_price)}
              </p>
            </div>

            {!isEmpty(filteredAllowances) && (
              <div className="flex items-start justify-start regular-font gap-1">
                <p className="text-grey-textalt">Allowances: </p>

                <p className="text-blue flex justify-start items-center gap-1 capitalize">
                  {filteredAllowances?.map(
                    ({ name }, i, arr) =>
                      `${name}${
                        i === arr.length - 2
                          ? " & "
                          : i < arr.length - 1
                          ? ", "
                          : ""
                      }`
                  )}
                </p>
              </div>
            )}
            {!isEmpty(filteredRules) && (
              <div className="flex items-start justify-start regular-font gap-1">
                <p className="text-grey-textalt">Rules: </p>

                <p className="text-blue flex justify-start items-center gap-1 capitalize">
                  {filteredRules?.map(
                    ({ name }, i, arr) =>
                      `${name}${
                        i === arr.length - 2
                          ? " & "
                          : i < arr.length - 1
                          ? ", "
                          : ""
                      }`
                  )}
                </p>
              </div>
            )}
          </div>
        )}
        {showFilteredListings && filteredListing?.length > 0 && (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-end items-start w-full
  ${tabClass}
  `}
          >
            {filteredListing
              ?.filter(({ type }) =>
                activeTab?.value === "new" || activeTab?.value === "all"
                  ? type
                  : type === activeTab?.value
              )
              ?.map((data) => {
                return (
                  <Card1
                    allFavourites={favouriteListings}
                    key={data.id}
                    listing={data}
                  />
                );
              })}
          </div>
        )}

        {showFilteredListings && (
          <p className="text-[18px] text-grey-textalt regular-font px-6">
            Your might like these other listings!
          </p>
        )}
        {tabs
          .filter(({ title }) => title === activeTab?.title)
          .map(({ content }, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-end items-start w-full
            ${tabClass}
            `}
            >
              {content
                ?.filter(
                  (obj1) => !filteredListing.some((obj2) => obj2.id === obj1.id)
                )
                ?.map((data) => {
                  return (
                    <Card1
                      allFavourites={favouriteListings}
                      key={data.id}
                      listing={data}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    );
  }
);

export default ContentHeader;
