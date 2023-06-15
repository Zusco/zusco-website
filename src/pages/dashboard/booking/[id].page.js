import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import moment from "moment";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";

import { findPath } from "utils/findPath";
import ImageCarousel from "components/layout/dashboard/imagecarousel";
import Button from "components/general/button/button";
import Loader from "components/general/loader";
import { getUserInfoFromStorage } from "utils/storage";
import Share from "assets/icons/dashboard/share.svg";
import GreenStar from "assets/icons/features/greenStar.svg";
import Location from "assets/icons/landing/location.svg";
import Gold from "assets/icons/dashboard/goldHost.svg";
import Bath from "assets/icons/bath.svg";
import Bed from "assets/icons/bed.svg";
import Tips from "assets/icons/tips.svg";
import Favorite from "assets/icons/dashboard/favourite.svg";
import RedFavorite from "assets/icons/dashboard/redFavourite.svg";
import AuthStore from "store/auth";
import ListingStore from "store/listing";
import ImageSlideShow from "components/layout/dashboard/imageSlideShow";
import CommonLayout from "components/layout";
import BookingsStore from "pages/dashboard/bookings/store";
import { useAuth } from "hooks/auth";
import AgentProfileModal from "pages/listing/agentProfileModal";
import SideBar from "pages/listing/aside";
import { isNumber } from "lodash";

export async function getServerSideProps({ query }) {
  const shortlet_id = query.id;
  let metadata = {};
  try {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}internal/shortlet/one/${shortlet_id}`,
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      )
      .then((res) => {
        metadata = res?.data?.shortlet || {};
      });
  } catch (error) {}

  return {
    props: { metadata }, // will be passed to the page component as props
  };
}

const ApartmentDetailsHome = ({ metadata }) => {
  const router = useRouter();
  const { id } = router.query;
  const {
    handleFindListing,
    currentListing,
    currentFeatures,
    addToFavourite,
    setShowShareModal,
    getReviews,
    reviewsLoading,
    currentReviewsValue,
  } = ListingStore;
  const { handleFindBooking, currentBooking, searchLoading } = BookingsStore;
  const userInfo = getUserInfoFromStorage();
  const { isAuthenticated } = useAuth();
  const { setShowAuthModal } = AuthStore;
  const path =
    findPath(router, "/listing") || findPath(router, "/dashboard/booking");
  const pathname = router?.pathname;

  const SafetyTips = [
    "Book only when confident with your selection",
    "Contact Host for further enquiries",
    "If you choose to meet with Agents, only meet in public and open locations.",
  ];

  const [shortletdetails, setShortletDetails] = useState(false);
  const [bookingdetails, setBookingDetails] = useState(false);
  const [slides, setSlides] = useState(false);
  const [aboutView, setAboutView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [addingFavourite, setAddingFavourite] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  useEffect(() => {
    checkUserId();
  }, [currentListing]);

  useEffect(() => {
    setShortletDetails(currentBooking?.shortlet);
    setBookingDetails(currentBooking);
  }, [router, currentListing, currentBooking]);

  useEffect(() => {
    getReviews(shortletdetails?.id);
  }, [shortletdetails]);
  const showAbout = () => {
    setAboutView((prevState) => !prevState);
  };

  const loadData = async () => {
    setLoading(true);
    if (pathname?.includes("listing") && id) {
      await handleFindListing({ router, route: -1, url: id });
    } else if (pathname?.includes("booking") && id) {
      await handleFindBooking({ router, route: -1, url: id });
    }
    setLoading(false);
  };
  const goBack = () => {
    router.back();
  };

  function showSlides() {
    setSlides((prevState) => !prevState);
  }

  const checkUserId = () => {
    const findFavourite = currentListing?.favourites?.find(({ user }) => {
      return user?.id === userInfo?.id;
    });
    if (findFavourite?.id) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  const updateLike = async () => {
    if (isAuthenticated) {
      setAddingFavourite(true);
      try {
        const likeApartment = await addToFavourite(
          currentListing.id,
          isAuthenticated
        );
        if (likeApartment) {
          setLiked((prevState) => !prevState);
        }
      } finally {
        setAddingFavourite(false);
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const metaTitle = metadata?.name
    ? `Zusco | ${metadata?.name}, ${metadata?.city}`
    : "Zusco | Your online marketplace for short-let homes.";
  const metaDescription = metadata?.description
    ? `${metadata?.description}`
    : "Forget multiyear leases, tacky decor and constant moving. Zusco offers an easy, flexible option with no long term commitment!";

  const metaImage = metadata?.images?.[0] || "";

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: metaTitle,
          text: metaDescription,
          url: window.location.href,
        })

        .catch(console.error);
    } else {
      setShowShareModal(true);
    }
  };
  return (
    <>
      <CommonLayout>
        <Head>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={metaImage} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@zusco" />
          <meta name="twitter:creator" content="@zusco" />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={metaImage} />
          <meta name="twitter:image:width" content="1024" />
          <meta name="twitter:image:height" content="512" />
          <meta name="twitter:image:alt" content="An image of this shortlet" />

          <meta name="twitter" content="summary_large_image" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <div className="px-6 md:px-20  py-4 flex flex-col gap-6">
            {loading && <Loader />}
            <div className="flex flex-col gap-5">
              <div className="flex justify-between text-black">
                <p
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={goBack}
                >
                  <FiArrowLeft size={20} />{" "}
                  <span className="underline">Back</span>
                </p>

                <div className="flex gap-4">
                  <div
                    onClick={() => updateLike()}
                    className={`cursor-pointer flex gap-1 items-center scale-in ${
                      addingFavourite && "blur-sm"
                    }`}
                  >
                    {liked ? (
                      <RedFavorite
                        className={`scale-in ${
                          addingFavourite ? "blur-sm" : ""
                        }`}
                      />
                    ) : (
                      <Favorite
                        className={`scale-in ${
                          addingFavourite ? "blur-sm" : ""
                        }`}
                      />
                    )}
                    <span
                      className={`${liked ? "text-red-600" : "text-black"}`}
                    >
                      {liked ? "Liked" : "Like"}
                    </span>
                  </div>
                  <a
                    href="#share-listing"
                    onClick={handleShare}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <Share /> <span className="underline">Share</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-y-5 mmd:pr-2">
                <ImageCarousel
                  listing={shortletdetails}
                  slideClick={showSlides}
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center float-right justify-end gap-4 ">
                  {/* <Button
                btnClass="text-black"
                whiteBg
                text="Watch Video"
                icon={<Play />}
              /> */}
                  <p
                    onClick={showSlides}
                    className="text-blue-alt underline flex items-center cursor-pointer"
                  >
                    View all photos{" "}
                    <span>
                      <AiOutlinePlus color="#00509D" />
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {slides && (
              <ImageSlideShow
                listing={shortletdetails}
                closeSlideShow={showSlides}
              />
            )}

            {showModal && (
              <AgentProfileModal
                data={{
                  name:
                    (bookingdetails?.agent?.first_name || "N/A") +
                    " " +
                    (bookingdetails?.agent?.last_name || ""),
                  image: bookingdetails?.agent?.profile_image_url,
                  phone_number: bookingdetails?.agent?.phone_number,
                  created_at: bookingdetails?.agent?.created_at,
                  id: bookingdetails?.agent?.id,
                }}
                handleOk={() => setShowModal(false)}
              />
            )}

            <div className="flex flex-col mmd:gap-y-5 gap-y-8">
              <div className="flex flex-col sm:flex-row justify-between gap-y-6">
                <div>
                  <h1 className="flex gap-3 mxs:gap-1 text-[24px] pr-4 text-grey-label regular-font">
                    {shortletdetails?.name}
                    {isNumber(currentReviewsValue) &&
                    !isNaN(currentReviewsValue) &&
                    !reviewsLoading ? (
                      <span className="text-[#7A8996] font-thin flex text-[13px] leading-[13px] items-center">
                        <GreenStar className="" />{" "}
                        {parseFloat(currentReviewsValue).toFixed(1)}
                      </span>
                    ) : null}
                  </h1>
                  <div className="flex items-start sm:items-center text-[#8B8E93] gap-x-2">
                    <Location />
                    <p>{shortletdetails?.address}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:px-5 px-0">
                  <p className="text-[#8B8E93] text-sm">HOSTED BY</p>
                  <div className="flex gap-x-4">
                    <div className="flex flex-col gap-y-1">
                      {shortletdetails?.agent?.profile_image_url && (
                        <div className="p-[3px] border border-blue-8 rounded-full relative w-fit h-fit">
                          <Image
                            className="rounded-full object-cover !h-[64px]"
                            style={{ objectFit: "cover" }}
                            src={shortletdetails?.agent?.profile_image_url}
                            alt="host avatar"
                            width={64}
                            height={64}
                          />
                          <div className="absolute bottom-1 right-0">
                            <Gold />
                          </div>
                        </div>
                      )}
                      <p
                        onClick={() => setShowModal(true)}
                        className="text-blue-alt underline flex items-center cursor-pointer"
                      >
                        Contact Host
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-grey-label medium-font text-[20px]">
                        {(bookingdetails?.agent?.first_name || "") +
                          " " +
                          (bookingdetails?.agent?.last_name || "")}
                      </p>
                      <p className="text-[13px] text-[#ADB1B8] pl-2">
                        &#x2022; Added on{" "}
                        {moment(shortletdetails?.created_at).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                      <p className="text-[13px] text-[#ADB1B8] pl-2">
                        &#x2022; Last Update on{" "}
                        {moment(shortletdetails?.updated_at).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse md:flex-row justify-between items-start">
                <div className="pr-8 mlg:pr-4 mmd:pr-0 flex flex-col gap-y-6">
                  {currentFeatures?.length > 1 && (
                    <div className="flex flex-col gap-y-4">
                      <h3 className="text-[#8B8E93] medium-font text-[20px]">
                        Key Features
                      </h3>
                      <div className="fill-[#686B6F] stroke-[#686B6F] flex flex-wrap gap-2 w-[80%]">
                        {currentFeatures?.map(({ id, data }) => {
                          return (
                            <Button
                              key={id}
                              whiteBg
                              small
                              text={`${data?.name}`}
                              textColor="black"
                              btnClass={`!border-[0.5px] !border-[#686B6F] !rounded-full opacity-40 light-font`}
                              className="bg-white rounded-full"
                              icon={
                                <Image
                                  src={data?.icon?.replace("https", "http")}
                                  alt="icon"
                                  width={16}
                                  height={16}
                                />
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-y-4">
                    <h3 className="text-[#8B8E93] medium-font text-[20px]">
                      About
                    </h3>
                    <p
                      className={`font-light text-grey-label  ${
                        aboutView ? "" : "overflow-hidden h-[4.5em]"
                      }  whitespace-pre-wrap text-ellipsis`}
                    >
                      {shortletdetails?.description}
                    </p>
                    {shortletdetails?.description?.length > 400 && (
                      <p
                        onClick={() => showAbout()}
                        className="text-blue-alt flex justify-end underline cursor-pointer"
                      >
                        {aboutView ? "Show less" : "Full Description"}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-y-4">
                    <h3 className="text-[#8B8E93] medium-font text-[20px]">
                      Baths & Bedroom
                    </h3>
                    <h4 className="flex gap-x-3">
                      <div className="flex text-[#2A2B2C] fill-[#2A2B2C] items-center gap-x-1 font-light">
                        {shortletdetails?.number_of_bedrooms}{" "}
                        {shortletdetails?.number_of_bedrooms === 1
                          ? "bedroom "
                          : "bedrooms "}{" "}
                        <Bed />
                      </div>
                      <div className="flex text-[#2A2B2C] fill-[#2A2B2C] items-center gap-x-1 font-light">
                        {shortletdetails?.number_of_bathrooms}{" "}
                        {shortletdetails?.number_of_bathrooms === 1
                          ? "bedroom "
                          : "bedrooms "}{" "}
                        <Bath />
                      </div>
                    </h4>
                  </div>

                  <div className="flex flex-col gap-y-4">
                    <h3 className="text-[#8B8E93] medium-font text-[20px]">
                      Safety Tips
                    </h3>

                    <div className="flex flex-col gap-y-3">
                      {SafetyTips.map((tip, index) => {
                        return (
                          <div
                            key={index + tip}
                            className="flex items-center gap-2 font-light text-grey-label"
                          >
                            <span>
                              <Tips />
                            </span>{" "}
                            {tip}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-4">
                    <h3 className="text-[#8B8E93] medium-font text-[20px]">
                      Disclaimer
                    </h3>
                    <p></p>
                  </div>
                </div>

                <div className="flex flex-col text-justify ">
                  {!bookingdetails?.paid && pathname?.includes("booking") && (
                    <div className="flex flex-col gap-y-4 w-full">
                      <div className="text-base text-black">
                        This booking has been reserved.
                        <br /> Kindly{" "}
                        <button
                          onClick={() => setShowModal(true)}
                          type="button"
                          className="text-blue underline"
                        >
                          contact the host
                        </button>{" "}
                        of the shortlet
                        <br /> to complete booking.
                      </div>
                    </div>
                  )}

                  <div className="bg-white mt-[2rem] w-full sm:w-fit">
                    <SideBar
                      shortletdetails={shortletdetails}
                      bookingdetails={bookingdetails}
                      pathname={pathname}
                      path={path}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </>
  );
};

export default observer(ApartmentDetailsHome);
