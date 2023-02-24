import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  ZuscoShortlet,
  Popular,
  NewShortlet,
  FeaturedShortlet,
} from "assets/icons";
import Button from "components/general/button/button";
import Card1 from "components/layout/cards/Card1";
import { images } from "utils/images";
import FilterIcon from "assets/icons/features/filterIcon.svg"
import ListingStore from "store/listing";
import Select from "components/general/input/select";
import FilterListings from "utils/filter";
import { useAuth } from "hooks/auth";

const ContentHeader = observer(
  ({ setActiveTab, activeTab, filter, store, headerClass, tabClass }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const {
      allListings,
      popularListings,
      newListings,
      featuredListings,
      searchListings,
      getFavouriteListings,
      favouriteListings,
      filterLoading,
      filterListings,
      filteredListing,
      clearFilter,
      reloadFilters,
    } = ListingStore;
    const containerRef = useRef(null);

    const tabs = [
      {
        title: "Zusco Shorlets",
        icon: <ZuscoShortlet className="fill-current" />,
        content: allListings,
      },
      {
        title: "New",
        icon: <NewShortlet className="stroke-current" />,
        content: newListings,
      },
      {
        title: "Popular",
        icon: <Popular className="stroke-current" />,
        content: popularListings,
      },
      {
        title: "Featured",
        icon: <FeaturedShortlet className="stroke-current" />,
        content: featuredListings,
      },
    ];

    const [sliderPosition, setSliderPosition] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
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

    return (
      <div className="flex flex-col gap-6">
        <div className="px-2 py-[1.5rem]  flex justify-between gap-y-5 flex-wrap border-b-1/2 border-grey-border text-black">
          <div
            className={`flex flex-col justify-start items-start  w-full
            transition-all duration-500 ease-in-out
           
        ${headerClass}
        `}
          >
            <div
              className={`flex flex-col-reverse md:flex-row md:justify-between items-start md:items-center gap-x-8 gap-y-5 w-full
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
                    {!store.filter ? (
                      <div className="h-[52px] flex items-center">
                        <Button
                          whiteBg
                          text="Filter"
                          icon={<FilterIcon />}
                          btnClass="border border-black hover:bg-black/[.1] text-black bg-white h-[50px]"
                          className="shadow-btn bg-white"
                          onClick={() => store.toggleFilter()}
                          xsmall
                        />
                      </div>
                    ) : store.filter ? (
                      <button
                        onClick={() => store.toggleFilter()}
                        className="medium-font text-right text-[14px] text-[#211D31] cursor-pointer hover:text-red-500"
                      >
                        Close
                      </button>
                    ) : null}
                  </div>
                )}
              </div>

              <div
                className="flex flex-col justify-center items-end w-full sm:w-fit overflow-x-scroll"
                ref={containerRef}
              >
                <div className="flex justify-end items-end space-x-2 overflow-x-scroll w-full max-w-[calc(100vw-10px)] sm:max-w-fit ">
                  {tabs?.map(({ title, icon }, index) => (
                    <button
                      key={title}
                      onClick={() => setActiveTab({ title, index })}
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

            {filter && store.filter && (
              <div className="items-center flex gap-5 px-2 md:px-8 py-2  bg-white fade-in w-full border-t-1/2 border-grey-border">
                <div className="flex items-center gap-1">
                  <p
                    className="underline cursor-pointer text-blue-9"
                    onClick={() => {
                      clearFilter();
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
                    text={`Show ${filteredListing.length} results`}
                    btnClass="border border-black text-black"
                    className="shadow-btn"
                    onClick={() => store.toggleFilter()}
                  />
                </div>
              </div>
            )}

            {filter && store.filter && reloadFilters && <FilterListings />}
            {filter && store.filter && !reloadFilters && <FilterListings />}
          </div>
        </div>
        {/* content */}

        {tabs
          .filter(({ title }) => title === activeTab?.title)
          .map(({ content }, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-end items-start w-full
            ${tabClass}
            `}
            >
              {content?.map((data) => {
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
