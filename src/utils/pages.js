const pages = [
  {
    url: "/",
    title: "Zusco | Your online marketplace for short-let homes.",
    description:
      "Forget multiyear leases, tacky decor and constant moving. Zusco offers an easy, flexible option with no long term commitment!",
    thumbnail: "",
  },
  {
    url: "/rent",
    title: "Zusco | Your online marketplace for short-let homes.",
    description:
      "Forget multiyear leases, tacky decor and constant moving. Zusco offers an easy, flexible option with no long term commitment!",
    thumbnail: "",
  },
  {
    url: "/dashboard/explore",
    title: "Zusco | Tools designed to grow sales for e-commerce businesses",
    description:
      "Zusco improves the checkout experience and helps merchants collect payments from their customers.",
    thumbnail: "",
  },
  {
    url: "/dashboard/bookings",
    title: "Zusco | Fastest way for digital creators to get paid",
    description:
      "As creators, we know how difficult it can sometimes be to get paid from multiple regions. With Zusco, getting paid just got easier.",
    thumbnail: "",
  },
  {
    url: "/dashboard/messages",
    title: "Zusco | Engineers are welcome!",
    description:
      "Get started integrating Zusco's collections and payout services on your platform. Install the free plugins or start building something yourself with our API resource.",
    thumbnail: "",
  },
  {
    url: "/dashboard/profile",
    title: "Zusco | Affordable pricing",
    description:
      "With the lowest transaction rates on the market, Zusco puts the focus back on conversion, not charges.",
    thumbnail: "",
  },
  {
    url: "/dashboard/settings",
    title: "Zusco | Our Company",
    description:
      "Easily and seamlessly collect cardless payments from customers. Whether that is mobile money payments across Sub-Saharan Africa or crypto payments globally we got you covered.",
    thumbnail: "",
  },
];
export const getPageByPath = (path) =>
  pages.find(({ url }) => url === path) || pages[0];
