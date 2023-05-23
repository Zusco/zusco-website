import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import Image from "next/image";

import { DEFAULT_AVATAR } from "utils/constants";
import { useAuth } from "hooks/auth";
import { Explore, Settings, Listings, Messages, BookAStay } from "assets/icons";
import Logout from "assets/icons/dashboard/logoutLogo.svg";
import Logo from "assets/icons/landing/Logo.svg";
import Notification from "assets/icons/dashboard/notification.svg";
import CommonStore from "store/common";

import Toast from "../../general/toast/toast";
import Hamburger from "../hamburger";
import NotificationPane from "../notification";
import CommonFooter from "../footer";

const DashboardLayout = ({ children, hasHeader }) => {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [notificationPaneOpen, setNotificationPaneOpen] = useState(false);
  const { getMe, me, notificationItems } = CommonStore;

  const redirectUser = () => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
  };

  useEffect(() => {
    redirectUser();
  }, [router?.pathname]);

  useEffect(() => {
    !me && getMe();
  }, []);

  const dashboardLinks = [
    {
      title: "Explore",
      link: "/dashboard/explore",
      icon: <Explore className="fill-current" />,
    },
    {
      title: "Bookings",
      link: "/dashboard/bookings",
      icon: <Listings className="fill-current" />,
    },
    {
      title: "Messages",
      link: "/dashboard/messages",
      icon: <Messages className="fill-current" />,
    },
  ];

  const listingLinks = [
    {
      title: me?.first_name
        ? me.first_name + " " + me.last_name
        : "Edit Profile",
      link: "/dashboard/profile",
      icon: (
        <Image
          className={` w-[25px] h-[25px] border rounded-full `}
          src={me?.profile_image_url || DEFAULT_AVATAR}
          alt="avatar"
          width={25}
          height={25}
        />
      ),
    },
    {
      title: "Become a Host",
      url: "https://host.zusco.ng/",
      icon: <BookAStay className="fill-current" />,
    },
    {
      title: "Settings",
      link: "/dashboard/settings",
      icon: <Settings className="fill-current" />,
    },
    {
      title: "Logout",
      link: "#",
      click: () => {
        console.log("LOgging out");
        logout();
        router.push("/otp/send");
      },
      icon: <Logout className="fill-current" />,
    },
  ];

  return (
    <div className="w-screen min-h-screen h-screen flex flex-grow flex-col relative">
      <header className="flex flex-row justify-between items-center w-full py-4 fixed left-0 right-0 top-0 border-b-1/2 border-grey-border z-[9999] h-[70px] bg-white">
        <div className="relative flex flex-row justify-between items-center mx-auto w-full px-10 ">
          <Link className="h-8 w-[110px] !my-0" href="/dashboard/explore">
            <Logo className="w-full h-full z-90" />
          </Link>
          <Toast />

          <div className="flex flex-row justify-start items-center space-x-[20px]">
            <button
              onClick={() => setNotificationPaneOpen(true)}
              className="relative"
            >
              {notificationItems?.length > 0 && (
                <div className="absolute right-[15px] top-[17px] bg-red-alt rounded-full w-[5px] h-[5px]" />
              )}
              <Notification className="hover:fill-grey-lighter transition-all duration-300 ease-in-out cursor-pointer" />
            </button>

            <Hamburger
              click={() => {
                setSidenavOpen(!sidenavOpen);
              }}
              className={sidenavOpen ? "ham_crossed" : ""}
            />
          </div>
        </div>

        <div className="relative">
          {notificationPaneOpen && (
            <NotificationPane onClose={() => setNotificationPaneOpen(false)} />
          )}
        </div>
      </header>
      <section className="w-full h-full flex flex-row flex-grow max-w-9xl mx-auto relative mt-[70px] overflow-hidden">
        <aside
          className={`dashboard-sidenav w-52 pt-[20px] pb-28 h-full flex flex-col flex-grow absolute left-0 bottom-0 z-50 bg-white
         overflow-y-scroll border-r-1/2 border-grey-border
         transition-transform duration-150 ease-in-out 
         ${hasHeader ? "top-[50px]" : "top-0"}
          ${
            sidenavOpen ? "translate-x-[0]" : "-translate-x-60"
          } lg:translate-x-0
         `}
        >
          <div className="flex flex-col justify-between items-start w-full h-full pl-7 pr-5">
            <div className="flex flex-col justify-start items-start pb-10 w-full space-y-8 cursor-pointer transition-all duration-150 ease-in-out">
              <span className="text-grey uppercase text-sm pt-6">
                DASHBOARD
              </span>
              {dashboardLinks.map(({ title, icon, link }) => (
                <Link href={link} key={title}>
                  <div
                    className={`flex justify-center items-center hover:text-blue text-grey text-sm space-x-2 ${
                      router.pathname.includes(link) && "!text-blue-alt"
                    }`}
                  >
                    {icon}
                    <span className="text-current">{title}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className=" flex flex-col justify-start items-start pb-10 w-full space-y-8 cursor-pointer transition-all duration-150 ease-in-out">
              <span className="text-grey uppercase text-sm  pt-6">Actions</span>
              {listingLinks.map(({ title, icon, link, click, url }) =>
                link ? (
                  <Link
                    href={link}
                    key={title}
                    onClick={() => click && click()}
                  >
                    <div
                      className={`flex justify-center items-center hover:text-blue text-grey text-sm space-x-2 ${
                        router.pathname.includes(link) &&
                        "!text-blue-alt !border-blue-alt"
                      }`}
                    >
                      <p
                        className={`${
                          link === "/dashboard/profile"
                            ? router.pathname.includes(link) &&
                              "border rounded-full border-blue-alt"
                            : ""
                        }`}
                      >
                        {icon}
                      </p>
                      <span className="text-current">{title}</span>
                    </div>
                  </Link>
                ) : (
                  <a href={url} key={title} target="_blank" rel="noreferrer">
                    <div
                      className={`flex justify-center items-center hover:text-blue text-grey text-sm space-x-2 ${
                        router.pathname.includes(link) &&
                        "!text-blue-alt !border-blue-alt"
                      }`}
                    >
                      <p
                        className={`${
                          link === "/dashboard/profile"
                            ? router.pathname.includes(link) &&
                              "border rounded-full border-blue-alt"
                            : ""
                        }`}
                      >
                        {icon}
                      </p>
                      <span className="text-current">{title}</span>
                    </div>
                  </a>
                )
              )}
            </div>

            {hasHeader && <div className="min-h-[100px] w-full" />}
          </div>
        </aside>

        <main className="dashboard-content bg-grey-whitesmoke w-full lg:ml-52 pb-14 flex flex-col flex-grow overflow-y-auto">
          {children}
        </main>
      </section>

      <CommonFooter />
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.any,
  hasHeader: PropTypes.bool,
};

export default observer(DashboardLayout);
