import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BsCheck2 } from "react-icons/bs";
import { isArray } from "lodash";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "components/general/button/button";
import Slider from "components/general/slider/priceSlider";
import RoundedBtn from "components/general/button/roundedBtn";
import CheckBox from "components/general/input/checkBox1";
import ListingStore from "store/listing";
import CircleLoader from "components/general/circleLoader/circleLoader";
import useListToggle from "hooks/useListToggle";
import { numberFormatter } from "./formatter";
import { HOUSE_TYPES, maxPriceValue, minPriceValue } from "./constants";

const FilterListings = observer(() => {
  const {
    getARR,
    amenitiesLoading,
    amenities,
    allowances,
    rules,
    debouncedFilter,
    filterData,
    setFilterData,
    clearFilter,
  } = ListingStore;

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      clearFilter(true);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    getARR();
  }, []);
  useEffect(() => {
    debouncedFilter({
      ...filterData,
      min_price: String(filterData.min_price),
      max_price: String(filterData.max_price),
    });
  }, [filterData]);
  const Amenities = amenities.map((item, index) => ({
    key: item.id,
    name: item.name,
    logo: item.icon,
  }));

  const Allowances = allowances.map((item) => ({
    key: item.id,
    name: item.name,
    logo: item.icon,
  }));

  const Rules = rules.map((item) => ({
    key: item.id,
    name: item.name,
    logo: item.icon,
  }));

  const {
    renderListToggler: renderPropertyTypesToggler,
    displayedList: displayedPropertyTypes,
  } = useListToggle({
    list: HOUSE_TYPES,
    maxCount: 4,
  });

  const {
    renderListToggler: renderAmenitiesToggler,
    displayedList: displayedAmenities,
  } = useListToggle({
    list: Amenities,
    maxCount: 3,
  });

  const {
    renderListToggler: renderAllowancesToggler,
    displayedList: displayedAllowances,
  } = useListToggle({
    list: Allowances,
    maxCount: 3,
  });

  const {
    renderListToggler: renderRulesToggler,
    displayedList: displayedRules,
  } = useListToggle({
    list: Rules,
    maxCount: 3,
  });

  const isSelectedItem = (item, field) => {
    let selectedFilterItem = filterData[field];
    if (isArray(selectedFilterItem)) {
      return selectedFilterItem?.find((itm) => itm === item);
    } else {
      return selectedFilterItem === item;
    }
  };

  const selectFilterItem = (item, field) => {
    let selectedFilterItem = filterData[field];

    if (!item) return;
    if (isArray(selectedFilterItem)) {
      if (isSelectedItem(item, field)) {
        selectedFilterItem = selectedFilterItem?.filter((itm) => itm !== item);
      } else {
        selectedFilterItem = [...selectedFilterItem, item];
      }
      setFilterData({ ...filterData, [field]: [...selectedFilterItem] });
    } else {
      setFilterData({ ...filterData, [field]: item });
    }
  };

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });

  const formatMoney = (amount) => {
    const apprx = Math.floor(amount / 1000) * 1000;
    return formatter.format(apprx);
  };

  return (
    <div
      className={`overflow-y-scroll w-full max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-220px)]
       bg-white z-[9] fade-in px-2 md:px-8 flex flex-col gap-10`}
    >
      <form action="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between items-start mb-6 w-full">
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <h1 className="text-[#211D31] text-[20px]">Property Type</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 justify-end items-start w-full">
              {displayedPropertyTypes?.map(({ label, value }, index) => {
                const itemSelected = isSelectedItem(value, "house_type");
                return (
                  <Button
                    key={value + index}
                    whiteBg
                    text={label}
                    btnClass={`!border-black !text-black rounded-l-full rounded-r-full !text-sm ${
                      itemSelected &&
                      "bg-blue-sky/[.1] !border-blue-9 !text-blue-9 !text-[13px]"
                    }`}
                    iconAfter={
                      itemSelected && <BsCheck2 size={20} color="#00509D" />
                    }
                    value={`${value}`}
                    onClick={() => selectFilterItem(value, "house_type")}
                  />
                );
              })}
            </div>

            {renderPropertyTypesToggler()}
          </div>
          <div className="w-full flex justify-start md:justify-end lg:justify-center lg:ml-10 ">
            <div className="w-[250px] md:w-[180px] lg:w-[250px] flex flex-col justify-start items-start gap-4">
              <h1 className="text-[#211D31] text-[20px]">Number of Rooms</h1>
              <div className="flex items-center justify-between gap-5 w-full">
                <RoundedBtn
                  className="text-[24px] border-blue-sky"
                  icon={<AiOutlineMinus color="#5599DD" />}
                  onClick={() =>
                    filterData.number_of_bedrooms > 1 &&
                    selectFilterItem(
                      filterData.number_of_bedrooms - 1,
                      "number_of_bedrooms"
                    )
                  }
                />
                <p className="text-base">{filterData.number_of_bedrooms}</p>
                <RoundedBtn
                  className="text-[24px] border-blue-sky"
                  icon={<AiOutlinePlus color="#5599DD" />}
                  onClick={() =>
                    selectFilterItem(
                      filterData.number_of_bedrooms + 1,
                      "number_of_bedrooms"
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start lg:justify-end">
            <div className=" w-[250px] md:w-[180px] lg:w-[250px] flex flex-col justify-start items-start gap-4 relative ">
              <h1 className="text-[#211D31] text-[20px]">Amenities</h1>
              {amenitiesLoading && (
                <div className="w-full flex justify-center items-center h-[100px] absolute m-auto left-0 right-0 mt-[30px]">
                  <CircleLoader blue size="xm" />
                </div>
              )}
              <div
                className={`text-black/[.3] fill-[#D8DCE3] stroke-[#D8DCE3] flex flex-col gap-2 w-full`}
              >
                {displayedAmenities.map((item) => {
                  return (
                    <CheckBox
                      key={item.key}
                      onChange={() => selectFilterItem(item.key, "amenities")}
                      checked={isSelectedItem(item.key, "amenities")}
                      label={item.name}
                      icon={
                        <Image
                          className="w-[20px]"
                          src={item.logo}
                          alt={item.name}
                          width={20}
                          height={20}
                        />
                      }
                    />
                  );
                })}
              </div>
              {renderAmenitiesToggler()}
            </div>
          </div>
        </div>

        <hr className="w-full h-[1px] border-t py-5" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between items-start mb-6 w-full">
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <h1 className="text-[#211D31] text-[20px] px-4">Price Range</h1>

            <div className="w-full flex flex-col px-4 gap-4">
              <div className="flex gap-4 justify-start lg:justify-end">
                <p className="w-fit xs:px-3 px-1 border border-[#D0D5DD] bg-[#F3F8FF] text-blue-sky">
                  min: {formatMoney(filterData.min_price)}
                </p>
                <p className="w-fit ms:px-3 px-1 border border-[#D0D5DD] bg-[#F3F8FF] text-blue-sky">
                  max: {formatMoney(filterData?.max_price)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#8B8E93] underline">
                  ₦ {numberFormatter(parseInt(minPriceValue), 2)}
                </p>
                <p className="text-[#8B8E93] underline">
                  ₦ {numberFormatter(parseInt(maxPriceValue), 2)}
                </p>
              </div>
              <Slider
                range
                allowCross={false}
                min={parseInt(minPriceValue)}
                max={parseInt(maxPriceValue)}
                defaultValue={[
                  parseInt(filterData.min_price),
                  parseInt(filterData?.max_price),
                ]}
                onChange={(e) => {
                  setFilterData({
                    ...filterData,
                    min_price: e[0],
                    max_price: e[1],
                  });
                }}
              />
            </div>
          </div>

          <div className="w-full flex justify-start md:justify-end lg:justify-center lg:ml-10">
            <div className=" w-[250px] md:w-[180px] lg:w-[250px] flex flex-col justify-start items-start gap-4 relative ">
              <h1 className="text-[#211D31] text-[20px]">Allowances</h1>
              {amenitiesLoading && (
                <div className="w-full flex justify-center items-center h-[100px] absolute m-auto left-0 right-0 mt-[30px]">
                  <CircleLoader blue size="xm" />
                </div>
              )}
              <div
                className={`text-black/[.3] fill-[#D8DCE3] stroke-[#D8DCE3] flex flex-col gap-2 w-full`}
              >
                {displayedAllowances.map((item) => {
                  return (
                    <CheckBox
                      key={item.key}
                      onChange={() => selectFilterItem(item.key, "allowances")}
                      checked={isSelectedItem(item.key, "allowances")}
                      label={item.name}
                      icon={
                        <Image
                          className="w-[20px]"
                          src={item.logo}
                          alt={item.name}
                          width={20}
                          height={20}
                        />
                      }
                    />
                  );
                })}
              </div>

              {renderAllowancesToggler()}
            </div>
          </div>
          <div className="w-full flex justify-start lg:justify-end">
            <div className=" w-[250px] md:w-[180px] lg:w-[250px] flex flex-col justify-start items-start gap-4 relative">
              <h1 className="text-[#211D31] text-[20px]">Rules</h1>

              {amenitiesLoading && (
                <div className="w-full flex justify-center items-center h-[100px] absolute m-auto left-0 right-0 mt-[30px]">
                  <CircleLoader blue size="xm" />
                </div>
              )}

              <div
                className={`text-black/[.3] fill-[#D8DCE3] stroke-[#D8DCE3] flex flex-col gap-2 w-full`}
              >
                {displayedRules.map((item) => {
                  return (
                    <CheckBox
                      key={item.key}
                      onChange={() => selectFilterItem(item.key, "rules")}
                      checked={isSelectedItem(item.key, "rules")}
                      label={item.name}
                      icon={
                        <Image
                          className="w-[20px]"
                          src={item.logo}
                          alt={item.name}
                          width={20}
                          height={20}
                        />
                      }
                    />
                  );
                })}
              </div>
              {renderRulesToggler()}
            </div>
          </div>
        </div>
        <div className="w-full h-20" />
      </form>
    </div>
  );
});

export default FilterListings;
