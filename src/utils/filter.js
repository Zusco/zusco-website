import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BsCheck2 } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineRight } from "react-icons/ai";
import Button from "components/general/button/button";
import Slider from "components/general/slider/priceSlider";
import RoundedBtn from "components/general/button/roundedBtn";
import CheckBox from "components/general/input/checkBox1";
import FilterStore from "store/filter";
import ListingStore from "store/listing";
import CircleLoader from "components/general/circleLoader/circleLoader";
import Image from "next/image";

const FilterListings = observer(() => {
  const store = FilterStore;
  const {
    getARR,
    amenitiesLoading,
    amenities,
    allowances,
    rules,
    filterLoading,
    filterListings,
    filteredListing,
    allStates,
    loadingStates,
    debouncedFilter,
  } = ListingStore;

  const Locations = allStates;

  const [toggleAmenities, setToggleAmenities] = useState(false);
  const [toggleAllowances, setToggleAllowances] = useState(false);
  const [toggleRules, setToggleRules] = useState(false);

  const [filterData, setFilterData] = useState({
    states: [],
    min_price: `0`,
    max_price: `${store?.maxVal}`,
    number_of_bedrooms: 0,
    amenities: [],
    allowances: [],
    rules: [],
  });

  useEffect(() => {
    getARR();
  }, []);
  useEffect(() => {
    debouncedFilter(filterData);
    console.log("the list", filterData);
  }, [filterData]);

  const handleSliderChange = () => {
    setFilterData({
      ...filterData,
      min_price: `${store?.minVal}`,
      max_price: `${store?.maxVal}`,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, value, type, checked, id } = event.target;
    let newArray = [...filterData[name], id];
    if (filterData[name].includes(id)) {
      newArray = newArray.filter((item) => item !== id);
    }
    setFilterData({
      ...filterData,
      [name]: newArray,
    });
  };

  const roomIncrement = () => {
    setFilterData({
      ...filterData,
      number_of_bedrooms: filterData.number_of_bedrooms + 1,
    });
  };
  const roomDecrement = () => {
    if (filterData.number_of_bedrooms > 0) {
      setFilterData({
        ...filterData,
        number_of_bedrooms: filterData.number_of_bedrooms - 1,
      });
    }
  };

  const handleChange = (prop, val, type) => {
    setFilterData((prev) => {
      return { ...prev, [prop]: val };
    });
  };

  const selectLocation = (location) => {
    let newArray = [...filterData.states, location];
    if (filterData.states.includes(location)) {
      newArray = newArray.filter((item) => {
        item !== location;
      });
    }
    setFilterData({ ...filterData, states: newArray });
  };

  const Amenities = amenities.map((item, index) => ({
    key: item.id,
    name: item.name,
    logo: item.icon,
  }));

  const Allowances = allowances.map((item, index) => ({
    key: item.id,
    name: item.name,
    logo: item.icon,
  }));

  const Rules = rules.map((item, index) => ({
    key: item.id,
    name: item.name,
    logo: item.icon,
  }));

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
       bg-white  fade-in px-2 md:px-8 flex flex-col gap-10`}
    >
      <form action="">
        <div className="grid md:grid-cols-[20rem,_10rem,_12rem] xs:grid-cols-2 grid-cols-1 px-4 space-y-4 gap-6 justify-between">
          <div className="md:max-w-[25rem] xs:col-span-2 col-span-1">
            <h1 className="text-[#211D31] text-[20px]">Location</h1>
            <div className="flex flex-wrap gap-3 w-full">
              {loadingStates && (
                <div className="w-full flex justify-center items-center h-[100px]">
                  <CircleLoader blue />
                </div>
              )}

              {!loadingStates &&
                Locations?.map((place, index) => {
                  return (
                    <>
                      <div className=""></div>
                      <Button
                        name={filterData.states}
                        key={place + index}
                        whiteBg
                        text={`${place}`}
                        btnClass={`border border-black text-black rounded-l-full rounded-r-full ${
                          filterData.states.includes(place) &&
                          "bg-blue-sky/[.1] border-blue-9 text-blue-9"
                        }`}
                        iconAfter={
                          filterData.states.includes(place) ? (
                            <BsCheck2 size={20} color="#00509D" />
                          ) : (
                            false
                          )
                        }
                        className=""
                        value={`${place}`}
                        onClick={() => selectLocation(place)}
                      />
                    </>
                  );
                })}
            </div>
          </div>

          <div className="w-fit ">
            <h1 className="text-[#211D31] text-[20px]">Number of Rooms</h1>
            <div className="flex items-center justify-between">
              {" "}
              <RoundedBtn
                className="text-[24px] border-blue-sky"
                icon={<AiOutlineMinus color="#5599DD" />}
                onClick={() => roomDecrement()}
              />{" "}
              <p className="text-base">{filterData.number_of_bedrooms}</p>{" "}
              <RoundedBtn
                className="text-[24px] border-blue-sky"
                icon={<AiOutlinePlus color="#5599DD" />}
                onClick={() => roomIncrement()}
              />{" "}
            </div>
          </div>

          <div className="min-w-[180px] max-w-[250px] flex flex-col gap-3 ">
            <h1 className="text-[#211D31] text-[20px]">Amenities</h1>
            {amenitiesLoading && (
              <div className="w-full flex justify-center items-center h-[100px]">
                <CircleLoader blue />
              </div>
            )}

            <div
              className={`${
                !toggleAmenities ? "overflow-hidden h-[5rem]" : ""
              } text-black/[.3] fill-[#D8DCE3] stroke-[#D8DCE3] flex flex-col gap-1`}
            >
              {Amenities.map((Amenity, index) => {
                return (
                  <CheckBox
                    key={Amenity.key}
                    name={`amenities`}
                    id={Amenity.key}
                    onChange={handleCheckboxChange}
                    label={Amenity.name}
                    icon={
                      <Image
                        className="w-[20px]"
                        src={Amenity.logo}
                        alt={Amenity.name}
                        width={20}
                        height={20}
                      />
                    }
                  />
                );
              })}
            </div>
            {!toggleAmenities && (
              <div
                onClick={() => {
                  setToggleAmenities((prevState) => !prevState);
                }}
                className="flex justify-between text-black cursor-pointer"
              >
                <AiOutlineRight size={12} />{" "}
                <p className="text-[12px] text-black underline">View all</p>
              </div>
            )}
            {toggleAmenities && (
              <div
                onClick={() => {
                  setToggleAmenities((prevState) => !prevState);
                }}
                className="w-full text-black cursor-pointer underline text-right text-[12px]"
              >
                Show less
              </div>
            )}
          </div>
        </div>

        <p className="w-full h-[1px] border-t"></p>

        <div className="flex flex-wrap md:flex-nowrap md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#211D31] text-[20px] px-4">Price Range</h1>

            <div className="xs:w-[400px] w-full flex flex-col px-4 gap-4">
              <div className="flex gap-4 justify-end">
                <p className="w-fit xs:px-3 px-1 border border-[#D0D5DD] bg-[#F3F8FF] text-blue-sky">
                  min: {formatMoney(store?.minVal)}
                </p>
                <p className="w-fit ms:px-3 px-1 border border-[#D0D5DD] bg-[#F3F8FF] text-blue-sky">
                  max: {formatMoney(store?.maxVal)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#8B8E93] underline">₦ 1k</p>
                <p className="text-[#8B8E93] underline">₦ 400k</p>
              </div>
              <Slider handleSliderChange={handleSliderChange} store={store} />
            </div>
          </div>

          <div className="min-w-[180px] max-w-[250px] flex flex-col gap-3 px-4">
            <h1 className="text-[#211D31] text-[20px]">Allowances</h1>
            <div
              className={`${
                !toggleAllowances ? "overflow-hidden h-[5rem]" : ""
              } text-black/[.3] fill-[#D8DCE3] stroke-[#D8DCE3] flex flex-col gap-1`}
            >
              {Allowances.map((Allowance, index) => {
                return (
                  <CheckBox
                    name={`allowances`}
                    id={Allowance.key}
                    onChange={handleCheckboxChange}
                    key={Allowance.key}
                    label={Allowance.name}
                    icon={
                      <Image
                        className="w-[20px] "
                        src={Allowance.logo}
                        alt={Allowance.name}
                        width={20}
                        height={20}
                      />
                    }
                  />
                );
              })}
            </div>
            {!toggleAllowances && (
              <div
                onClick={() => {
                  setToggleAllowances((prevState) => !prevState);
                }}
                className="flex justify-between text-black cursor-pointer"
              >
                <AiOutlineRight size={12} />{" "}
                <p className="text-[12px] text-black underline">View all</p>
              </div>
            )}
            {toggleAllowances && (
              <div
                onClick={() => {
                  setToggleAllowances((prevState) => !prevState);
                }}
                className="w-full text-black cursor-pointer underline text-right text-[12px]"
              >
                Show less
              </div>
            )}
          </div>

          <div className="min-w-[180px] max-w-[250px] flex flex-col gap-3 px-4">
            <h1 className="text-[#211D31] text-[20px]">Rules</h1>
            <div
              className={`${
                !toggleRules ? "overflow-hidden h-[5rem]" : ""
              } text-black/[.3] fill-[#D8DCE3] stroke-[#D8DCE3] flex flex-col gap-1`}
            >
              {Rules.map((Rule, index) => {
                return (
                  <CheckBox
                    name={`rules`}
                    id={Rule.key}
                    onChange={handleCheckboxChange}
                    key={Rule.key}
                    label={Rule.name}
                    icon={
                      <Image
                        className="w-[20px] "
                        src={Rule.logo}
                        alt={Rule.name}
                        width={20}
                        height={20}
                      />
                    }
                  />
                );
              })}
            </div>
            {!toggleRules && (
              <div
                onClick={() => {
                  setToggleRules((prevState) => !prevState);
                }}
                className="flex justify-between text-black cursor-pointer"
              >
                <AiOutlineRight size={12} />{" "}
                <p className="text-[12px] text-black underline">View all</p>
              </div>
            )}
            {toggleRules && (
              <div
                onClick={() => {
                  setToggleRules((prevState) => !prevState);
                }}
                className="w-full text-black cursor-pointer underline text-right text-[12px]"
              >
                Show less
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-20" />
      </form>
    </div>
  );
});

export default FilterListings;
