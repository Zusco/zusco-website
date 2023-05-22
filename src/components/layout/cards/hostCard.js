import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import moment from "moment";
import Image from "next/image";
import ListingStore from "store/listing";

import Button from "components/general/button/button";
import RedFavourite from "assets/icons/dashboard/redFavourite.svg";

const HostCard = observer(({ listingId }) => {
  const { allListings } = ListingStore;

  const [host, setHost] = useState();

  useEffect(() => {
    getHostInfo();
  }, []);

  const getHostInfo = async () => {
    const findListing = await allListings?.find((item) => {
      return item?.id === listingId;
    });

    setHost(toJS(findListing?.agent));
  };
  return (
    <div className="flex flex-wrap flex-row bg-white justify-between w-full space-y-2 px-2 xs:px-4 py-4">
      <div className="flex space-x-4">
        <div className="sm:p-[6px] p-1 border border-blue-8 rounded-full ">
          {host?.profile_image_url && (
            <Image
              className="rounded-full !sm:w-[4rem] !sm:h-[4rem] w-[3rem] h-[3rem] object-cover"
              src={host?.profile_image_url}
              alt="host avatar"
              width={48}
              height={48}
            />
          )}
        </div>
        <div className="flex flex-col content-center pt-2 gap-y-1">
          <p className="sm:text-[20px] text-[17px] font-light text-black">
            {host?.first_name + " " + host?.last_name}
          </p>
          <p className="font-light sm:text-base text-[14px] text-[#ADB1B8]">
            Agent since {moment(host?.created_at).format("MMMM, YYYY")}
          </p>
        </div>
      </div>
      <div className="flex sm:space-x-3 space-x-2 ml-auto xs:ml-[1px] items-center">
        <div className="border border-black rounded flex justify-center items-center h-10 w-10 ">
          <RedFavourite className="w-[12px]" />
        </div>
        <Button blueBg text="View Profile" />
      </div>
    </div>
  );
});

export default HostCard;
