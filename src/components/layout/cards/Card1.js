import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { getUserInfoFromStorage } from "utils/storage";
import { observer } from "mobx-react-lite";

import ListingStore from "store/listing";
import AuthStore from "store/auth";
import { renderIndicator } from "utils/carouselFunctions";
import Favorite from "assets/icons/dashboard/favourite.svg";
import RedFavorite from "assets/icons/dashboard/redFavourite.svg";
import Bedroom from "assets/icons/features/bed.svg";
import Bathroom from "assets/icons/features/bath.svg";

const Card1 = ({ listing }) => {
  // const { isAuthenticated } = useAuth();

  const { addToFavourite } = ListingStore;
  const { setShowAuthModal, isAuthenticated } = AuthStore;
  const userInfo = getUserInfoFromStorage();

  const [liked, setLiked] = useState(false);
  const [addingFavourite, setAddingFavourite] = useState(false);
  const [newFaveNumbers, setNewFaveNumbers] = useState(
    listing?.favourites?.length
  );

  useEffect(() => {
    checkUserId();
  }, []);

  const updateLike = async () => {
    if (isAuthenticated) {
      setAddingFavourite(true);
      try {
        const likeApartment = await addToFavourite(listing.id, isAuthenticated);
        if (likeApartment) {
          setLiked((prevState) => !prevState);
        }
        if (likeApartment && liked) {
          setNewFaveNumbers((prevState) => prevState - 1);
        } else if (likeApartment && !liked) {
          setNewFaveNumbers((prevState) => prevState + 1);
        }
      } finally {
        setAddingFavourite(false);
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const checkUserId = () => {
    const findFavourite = listing?.favourites?.find(({ user }) => {
      return user?.id === userInfo?.id;
    });
    if (findFavourite?.id) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  const amenityIcon = listing?.amenities && listing?.amenities[0]?.data?.icon;
  const allowanceIcon =
    listing?.allowances && listing?.allowances[0]?.data?.icon;
  const rulesIcon = listing?.rules && listing?.rules[0]?.data?.icon;

  return (
    <div className="flex flex-col w-full h-[370px] bg-white cursor-pointer">
      <div className="w-full relative h-[68%]">
        <div className="w-full h-full  transition-transform duration-500 ease-in-out hover:scale-[1.02]">
          <Carousel
            showThumbs={false}
            showArrows={false}
            renderIndicator={renderIndicator}
          >
            {listing?.images?.map((item) => (
              <Link
                href={`/listing/${listing?.id}`}
                key={item}
                className="flex h-[250px] min-h-[250px] z-[1] max-h-[250px]"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                <Image
                  className="w-full object-cover object-top h-[250px] min-h-[250px]  max-h-[250px]"
                  src={item}
                  alt="image"
                  fill
                />
              </Link>
            ))}
          </Carousel>
        </div>
        {listing?.occupied && (
          <p className="bg-[#F6F7F8] text-[#686B6F] px-2 rounded absolute top-5 left-4 shadow-occupied">
            Occupied
          </p>
        )}

        <button
          onClick={updateLike}
          className={`absolute bg-white text-black -bottom-2 -right-2 min-w-[60px]  max-w-[60px] h-[45px] items-center flex justify-center gap-1 rounded-tl px-1`}
        >
          {" "}
          {liked ? (
            <RedFavorite
              className={`scale-in ${addingFavourite ? "blur-sm" : ""}`}
            />
          ) : (
            <Favorite
              className={`scale-in ${addingFavourite ? "blur-sm" : ""}`}
            />
          )}
          <p>{newFaveNumbers || "0"}</p>
        </button>
      </div>

      <div className="w-full px-3 pt-4 pb-3 space-y-2 mmd:space-y-1 mmd:pt-2">
        <div className="grid grid-cols-[1fr,_80px]">
          <Link
            href={`/listing/${listing?.id}`}
            className="flex gap-3 mxs:gap-1 text-[20px] mmd:text-[17px] pr-2 text-grey-label regular-font"
            // target="_blank"
            // rel="noopener noreferrer"
          >
            {listing?.name}, {listing?.state}
            <span className="text-[#7A8996] font-thin flex text-[13px] mmd:text-[12px] leading-[13px] items-center">
              <GreenStar /> {listing?.rating || "5.0"}
            </span>
          </Link>

          <div className="flex gap-3">
            <div className="flex text-[#686B6F] text-[13px] items-center gap-1">
              {listing?.number_of_bedrooms}{" "}
              <span>
                <Bedroom />
              </span>
            </div>
            <div className="flex text-[#686B6F] text-[13px] items-center gap-1">
              {listing?.number_of_bathrooms}{" "}
              <span>
                <Bathroom />
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 pr-10 overflow-hidden">
            {amenityIcon && (
              <Image
                className="w-[40px] h-[40px] border-[.5px] border-[#686B6F]/[.5] rounded-full p-[13px] mxs:p-[10px] transform-y-1/2 "
                src={amenityIcon}
                alt="amenityIcon"
                width={40}
                height={40}
              />
            )}
            {allowanceIcon && (
              <Image
                className="w-[40px] h-[40px] border-[.5px] border-[#686B6F]/[.5] rounded-full p-[13px] mxs:p-[10px] transform-y-1/2 "
                src={allowanceIcon}
                alt="allowanceIcon"
                width={40}
                height={40}
              />
            )}
            {rulesIcon && (
              <Image
                className="w-[40px] h-[40px] border-[.5px] border-[#686B6F]/[.5] rounded-full p-[13px] mxs:p-[10px] transform-y-1/2 "
                src={rulesIcon}
                alt="rulesIcon"
                width={40}
                height={40}
              />
            )}
          </div>

          <p className="text-[20px] medium-font text-[#2A2B2C] items-center pl-3">
            {formatter.format(listing?.base_price)} / Night
          </p>
        </div>
      </div>
    </div>
  );
};

export default observer(Card1);
