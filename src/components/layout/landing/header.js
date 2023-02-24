import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { images } from "utils/images";

import Toast from "components/general/toast/toast";
import Button from "components/general/button/button";
import Modal from "components/general/modal/modal/modal";
import Hamburger from "../hamburger";

const Header = ({}) => {
  const { ZuscoLogo ,SignUp} = images;
  const router = useRouter();
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const headerLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Rent",
      link: "/rent",
    },
    {
      title: "Become a Host",
      url: "https://host.getzusco.com/",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];
  return (
    <header className="flex flex-row justify-between items-center w-full h-[65px] px-6 md:px-12 py-2 z-[99] bg-white border-b-1/2 fixed top-0 left-0 right-0">
      <div className="relative flex flex-row justify-between items-center mx-auto w-full">
        <Toast />
        <Link href="/">
          <ZuscoLogo className="w-[100px]  h-[28px]" />
        </Link>
        <div className="hidden md:flex justify-end items-center pl-6 w-fit space-x-12 transition-all duration-150 ease-in-out">
          {headerLinks.map(({ title, link, url }) =>
            link ? (
              <Link href={link} key={title}>
                <div
                  className={`link-content flex justify-center items-center hover:text-blue text-black ${
                    router?.pathname === link && "regular-font underline"
                  }`}
                >
                  <span className="text-current whitespace-nowrap">
                    {title}
                  </span>
                </div>
              </Link>
            ) : (
              <a href={url} key={title} target="_blank" rel="noreferrer">
                <div
                  className={`link-content flex justify-center items-center hover:text-blue text-black `}
                >
                  <span className="text-current whitespace-nowrap">
                    {title}
                  </span>
                </div>
              </a>
            )
          )}
        </div>

        {sidenavOpen && (
          <Modal
            noPadding
            bodyClass=""
            size="md"
            active={true}
            onClick={() => setSidenavOpen(false)}
          />
        )}

        <div
          className={`flex flex-col justify-start items-center fixed top-0 left-0 right-0 w-full h-[60%] min-h-[460px] bg-white z-[9999999] gap-8 transition-transform duration-500 ease-in-out p-6
         ${
           sidenavOpen ? "translate-y-0" : "-translate-y-[40rem]"
         } md:-translate-y-[50rem]
         `}
        >
          <Link href="/">
            <ZuscoLogo className="w-[100px]  h-[28px]" />
          </Link>
          {headerLinks.map(({ title, link, url }) =>
            link ? (
              <Link href={link} key={title}>
                <div
                  className={`link-content flex justify-center items-center hover:text-blue text-black ${
                    router?.pathname === link && "regular-font underline"
                  }`}
                >
                  <span className="text-current whitespace-nowrap">
                    {title}
                  </span>
                </div>
              </Link>
            ) : (
              <a href={url} key={title} target="_blank" rel="noreferrer">
                <div
                  className={`link-content flex justify-center items-center hover:text-blue text-black ${
                    router?.pathname === link && "regular-font underline"
                  }`}
                >
                  <span className="text-current whitespace-nowrap">
                    {title}
                  </span>
                </div>
              </a>
            )
          )}
          {!router?.pathname?.includes("otp") && (
            <>
              <Link href="/otp/send">
                <button>
                  <h4 className="text-blue-alt underline px-[20px] py-3 text-[16px] regular-font">
                    Login
                  </h4>
                </button>
              </Link>
              <Link href="/otp/send">
                <Button
                  text="Sign Up"
                  onClick={() => {}}
                  btnClass="text-white h-[48px]"
                  blueBg
                  shadow
                  xsmall
                  icon={<SignUp className="h-[16px]" />}
                />
              </Link>
            </>
          )}
        </div>

        {!router?.pathname?.includes("otp") && (
          <div className="hidden md:flex flex-row justify-start items-center space-x-2">
            <Link href="/otp/send">
              <Button
                text="Sign in"
                onClick={() => {}}
                btnClass="text-white h-[48px]"
                blueBg
                shadow
                xsmall
                icon={<SignUp className="h-[16px]" />}
              />
            </Link>
          </div>
        )}

        <Hamburger
          click={() => {
            setSidenavOpen(!sidenavOpen);
          }}
          className={`md:hidden ${sidenavOpen ? "ham_crossed" : ""}`}
        />
      </div>
    </header>
  );
};

export default Header;
