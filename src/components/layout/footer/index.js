import React from "react";
import Link from "next/link";

import  Call from "assets/icons/landing/phoneIcon.svg";
import  Facebook from "assets/icons/landing/fbIcon.svg";
import  Twitter from "assets/icons/landing/twIcon.svg";
import  Linkedin from "assets/icons/landing/liIcon.svg";

const CommonFooter = () => {
  return (
    <footer className="hidden sm:flex justify-between items-center w-full py-2 relative md:fixed left-0 right-0 bottom-0 border-t-1/2 border-grey-border z-[99] h-fit md:h-[50px] bg-white">
      <div className="relative flex flex-col md:flex-row gap-3 justify-between items-center mx-auto w-full px-6 md:px-20 mb-6 md:mb-0">
        <p className="text-base text-black text-left">
          © 2022 Zusco, All Rights Reserved
        </p>

        <div className="flex justify-start items-center  w-fit space-x-3">
          <a
            className="flex justify-start items-center text-base text-black text-left w-full whitespace-nowrap"
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Call className="mr-2" />
            Contact Us
          </a>
          <div className="flex justify-start items-center  w-fit space-x-4">
            <a href="https://facebook.com/" target="_blank" rel="noreferrer">
              <Facebook className="h-[14px] w-[14px]" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <Twitter className="h-[14px] w-[14px]" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <Linkedin className="h-[14px] w-[14px]" />
            </a>
          </div>
        </div>

        <div className="flex justify-start items-center  w-fit space-x-8">
          <Link
            className="text-base text-black text-left"
            href="/platform/privacy-policy"
          >
            Privacy Policy
          </Link>

          <Link className="text-base text-black text-left" href="/platform/terms">
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;
