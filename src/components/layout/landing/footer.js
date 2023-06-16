import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { VscChevronRight } from "react-icons/vsc";
import { useRouter } from "next/router";
import Link from "next/link";

import { images } from "utils/images";
import Button from "../../../components/general/button/button";

const Footer = () => {
  const {
    HomeIcon,
    Twitter,
    Facebook,
    LinkedIn,
    HostIcon,
    Phone,
    ZuscoIconBlue,
    FooterImg,
  } = images;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router?.pathname?.includes("/rent")) {
      setIsLoading(false);
    }
  }, [isLoading, router?.pathname]);
  return (
    <footer>
      <div className="w-full bg-black text-white text-center sm:text-left px-6 sm:px-10 md:px-[4rem] lg:px-[6rem] pt-[3rem] pb-[2rem] flex flex-col sm:flex-row gap-10 justify-between">
        <div className="flex flex-col gap-[2rem] msm:gap-[1rem] items-center sm:items-start">
          <div className="flex gap-[1.5rem] text-[2rem] mmd:text-[1.2rem] font-normal">
            <HomeIcon /> <p className="">Book Your Stay.</p>
          </div>
          <p className="text-[1.25rem] msm:text-base font-light text-gray-400">
            Choose from a wide range of short let properties to rent, in a
            variety of locations across the country. Your comfort matters.
          </p>
          <Link href="/rent#home_banner">
            <Button
              onClick={() => setIsLoading(true)}
              whiteBg
              text="Book your stay"
              iconAfter={<BsArrowRight />}
              btnClass="text-black px-10 hover:bg-gray-200"
              textColor="black"
              isLoading={isLoading}
            />
          </Link>
        </div>

        <div className="flex flex-col gap-[2rem] msm:gap-[1rem] items-center sm:items-start">
          <div className="flex gap-[1.5rem] text-[2rem] mmd:text-[1.2rem] font-normal">
            <HostIcon /> <p className="">Become A Host.</p>
          </div>
          <p className="text-[1.25rem] msm:text-base font-light text-gray-400">
            Zusco helps you, as a homeowner, to rent or lease out your spare
            rooms, so that you can earn more with little to no hassle!
          </p>
          <a href="https://host.zusco.ng/" target="_blank" rel="noreferrer">
            <Button
              whiteBg
              text="Become a Host"
              iconAfter={<BsArrowRight />}
              btnClass="text-black px-10 hover:bg-gray-200"
              textColor="black"
            />
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,_1fr] grid-cols-[1fr] gap-4 md:pl-[6rem] ">
        <div className="flex flex-col pt-[1.5rem] px-6 md:px-0 mxs:px-[1rem] mb-2 space-y-5 sm:space-y-3">
          <div className="md:text-[2rem] text-[1.5rem] text-blue-sky flex flex-col-reverse sm:flex-row items-center sm:items-start text-center sm:text-left sm:justify-between regular-font">
            <h2>Get your rental from home anytime.</h2>
            <ZuscoIconBlue className="mb-2 sm:mb-0" />
          </div>
          <div className="flex flex-col justify-between h-full text-black space-y-3 sm:space-y-0 ">
            <Link
              href={"/#home_banner"}
              scroll={false}
              className="flex text-base font-light hover:text-blue-alt cursor-pointer justify-between sm:justify-start"
            >
              Zusco
              <span>
                <VscChevronRight className="items-center h-full" size={20} />
              </span>
            </Link>
            <Link
              href="/rent"
              className="flex text-base font-light hover:text-blue-alt cursor-pointer justify-between sm:justify-start"
            >
              Rent for a Stay
              <span>
                <VscChevronRight className="items-center h-full" size={20} />
              </span>
            </Link>
            <Link
              href="/rent"
              className="flex text-base font-light hover:text-blue-alt cursor-pointer justify-between sm:justify-start"
            >
              Rent a Home
              <span>
                <VscChevronRight className="items-center h-full" size={20} />
              </span>
            </Link>
            <Link
              href="/#faqs"
              scroll={false}
              className="flex sm:hidden text-base font-light hover:text-blue-alt cursor-pointer justify-between sm:justify-start"
            >
              F.A.Q
              <span>
                <VscChevronRight className="items-center h-full" size={20} />
              </span>
            </Link>

            <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
              <a
                href="https://host.zusco.ng/"
                target="_blank"
                rel="noreferrer"
                className="flex text-base font-light hover:text-blue-alt cursor-pointer justify-between sm:justify-start"
              >
                Become a Host
                <span>
                  <VscChevronRight className="items-center h-full" size={20} />
                </span>
              </a>
              <Link
                href="tel:09099887767"
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 hover:text-blue-alt cursor-pointer"
              >
                <Phone />
                <p className="font-normal underline">Contact Us</p>
              </Link>
            </div>

            <div className="flex justify-between">
              <a
                href="/#faqs"
                scroll={false}
                className="hidden sm:flex text-base font-light hover:text-blue-alt cursor-pointer"
              >
                F.A.Q
                <span>
                  <VscChevronRight className="items-center h-full" size={20} />
                </span>
              </a>
              <div className="flex justify-between w-[5rem] pt-2 sm:pt-0">
                <a
                  href="https://facebook.com/zusco"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook className="h-[14px] w-[14px]" />
                </a>
                <a
                  href="https://twitter.com/zusco"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter className="h-[14px] w-[14px]" />
                </a>
                <a
                  href="https://linkedin.com/zusco"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedIn className="h-[14px] w-[14px]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full">
          <FooterImg className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="font-light border-t text-black border-grey-light mx-6 sm:mx-10 lg:mx-14 flex flex-col-reverse md:flex-row justify-between py-6">
        <p className="text-[14px] poppins mt-2 md:mt-0">
          © {new Date().getFullYear()} Zusco, All Rights Reserved
        </p>
        <div className="flex gap-[80px]  mmd:gap-[40px]  msm:gap-[20px]">
          <Link href="/platform/privacy-policy" className="text-[14px]">
            Privacy Policy
          </Link>
          <Link href="/platform/terms" className="text-[14px]">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
